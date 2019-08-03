// @flow

import fileType from 'file-type';
import readableStreamNodeToWeb from 'readable-stream-node-to-web';
import mimeTypes from 'mime-types';
import nodeStream from 'stream';

import { joinURLParts, removeTrailingSlash } from '../utils/pathUtil';
import { resolveDirectory, resolveMultihash } from './resolver';
import { getReadyNode } from '../ipfsNode';
import { headerOK, headerError, headerNotFound, headerBadRequest } from '../utils/headers';
import config from '../../config';

/** given a ipfs hash, get that file from ipfs network */
export async function getFile(path) {
  if (path.endsWith('/')) {
    // remove trailing slash for files
    return Response.redirect(`${config.ipfsRoute}/${removeTrailingSlash(path)}`);
  }

  const ipfs = await getReadyNode();
  return resolveMultihash(ipfs, path)
    .then(({ multihash }) => {
      const ipfsStream = ipfs.catReadableStream(multihash);
      const responseStream = new nodeStream.PassThrough({ highWaterMark: 1 });
      ipfsStream.pipe(responseStream);
      return new Promise(resolve => {
        ipfsStream.once('error', error => {
          if (error) {
            console.error(error);
            resolve(new Response(error.toString(), headerError));
          }
        });

        // TODO: maybe useless? I guess it's for earlier version of ipfs, or for pullStream
        if (!ipfsStream._read) {
          ipfsStream._read = () => {};
          ipfsStream._readableState = {};
        }

        // return Response only after first chunk being checked
        let filetypeChecked = false;
        ipfsStream.on('data', chunk => {
          // check mime on first chunk
          if (filetypeChecked) return;
          filetypeChecked = true;
          // return Response with mime type
          const fileSignature = fileType(chunk);
          const mimeType = mimeTypes.lookup(fileSignature ? fileSignature.ext : null);
          if (mimeType) {
            resolve(
              new Response(readableStreamNodeToWeb(responseStream), {
                ...headerOK,
                headers: { 'Content-Type': mimeTypes.contentType(mimeType) },
              }),
            );
          } else {
            resolve(new Response(readableStreamNodeToWeb(responseStream), headerOK));
          }
        });
      });
    })
    .catch(err => handleGatewayResolverError(ipfs, path, err));
}

/** handle error thrown in ipfs resolvers, for example normally we just get a single file, but sometimes ipfs hash is a directory, so we handle such case in this function  */
export function handleGatewayResolverError(ipfs, path, err) {
  if (err) {
    console.info(`fileName: ${err.fileName} , handleGatewayResolverError() Handling ${err.toString()}`);

    const errorToString = err.toString();

    switch (true) {
      case errorToString === 'Error: This dag node is a directory':
        return resolveDirectory(ipfs, path, err.fileName)
          .then(content => {
            if (typeof content === 'string') {
              // no index file found, send directory ls
              // now content is list of contents in the folder, being JSON.stringify
              return new Response(content, {
                ...headerOK,
                headers: { 'Content-Type': mimeTypes.contentType('json') },
              });
            }
            // found index file
            // redirect to URL/<found-index-file>
            return Response.redirect(joinURLParts(config.ipfsRoute, path, content[0].name));
          })
          .catch(error => {
            console.error(error);
            return new Response(error.toString(), headerError);
          });
      case errorToString.startsWith('Error: no link named'):
        return new Response(errorToString, headerNotFound);
      case errorToString.startsWith('Error: multihash length inconsistent'):
      case errorToString.startsWith('Error: Non-base58 character'):
        // not sure if it needs JSON.stringify
        return new Response(errorToString, headerBadRequest);
      default:
        console.error(err);
        return new Response(errorToString, headerError);
    }
  }
}
