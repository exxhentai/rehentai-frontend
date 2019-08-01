// @flow
/* eslint-disable no-restricted-globals */

import fileType from 'file-type';
import readableStreamNodeToWeb from 'readable-stream-node-to-web';
import mimeTypes from 'mime-types';
import nodeStream from 'stream';
import qs from 'query-string';

import { joinURLParts, removeTrailingSlash } from './pathUtil';
import { resolveDirectory, resolveMultihash } from './resolver';
import { swarmConnect, swarmList } from './ipfsController';
import { getReadyNode } from './ipfs';
import { headerOK, headerError, headerNotFound, headerBadRequest } from './headers';
import packageJSON from '../../package.json';

const ipfsRoute = `ipfs`;

function handleGatewayResolverError(ipfs, path, err) {
  if (err) {
    console.info(`fileName: ${err.fileName} , handleGatewayResolverError() Handling ${err.toString()}`);

    const errorToString = err.toString();

    switch (true) {
      case errorToString === 'Error: This dag node is a directory':
        return resolveDirectory(ipfs, path, err.fileName)
          .then(content => {
            // now content is rendered DOM string
            if (typeof content === 'string') {
              // no index file found, send rendered directory list DOM string
              return new Response(content, {
                ...headerOK,
                headers: { 'Content-Type': mimeTypes.contentType('.html') },
              });
            }
            // found index file
            // redirect to URL/<found-index-file>
            return Response.redirect(joinURLParts(ipfsRoute, path, content[0].name));
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

async function getFile(path) {
  if (path.endsWith('/')) {
    // remove trailing slash for files
    return Response.redirect(`${ipfsRoute}/${removeTrailingSlash(path)}`);
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

self.addEventListener('install', event => {
  // kick previous sw after install
  console.log('IPFS Gateway Service Worker is installing.');
  event.waitUntil(self.skipWaiting());
});

/** check if is gh-page deployed or localhost development */
function isListenedRoute(event, route) {
  return (
    event.request.url.startsWith(`${packageJSON.homepage}${route}/`) ||
    event.request.url.startsWith(`${self.location.origin}/${route}/`)
  );
}

self.addEventListener('fetch', event => {
  if (isListenedRoute(event, 'ipfsapi')) {
    const { query, url } = qs.parseUrl(event.request.url);
    const route = url.split('/ipfsapi/')[1];

    switch (route) {
      case 'swarmconnect': {
        const peerMultiAddress = query.address;
        return event.respondWith(swarmConnect(peerMultiAddress));
      }
      case 'swarmpeers': {
        return event.respondWith(swarmList());
      }
      default:
        return event.respondWith(
          new Response(
            JSON.stringify({ url: event.request.url, query, split: url.split(`/${ipfsRoute}/`), route }),
            {
              ...headerNotFound,
            },
          ),
        );
    }
  }

  if (isListenedRoute(event, ipfsRoute)) {
    // 1. we will goto /${ipfsRoute}/multihash so this will be a multihash
    // 2. if returned file of that multihash is a HTML, it will request for other content
    // so this will be content name. We may had cached this file in 1, so subsequent request will hit the cache.
    const multihashOrContentName = event.request.url.split(`/${ipfsRoute}/`)[1];
    console.log(`IPFS Gateway Service Worker getting ${multihashOrContentName}`);
    event.respondWith(getFile(multihashOrContentName));
  }
});
