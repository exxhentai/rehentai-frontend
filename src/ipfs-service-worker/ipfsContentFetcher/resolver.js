import Cids from 'cids';
import Multihashes from 'multihashes';
import promisify from 'promisify-es6';
import async from 'async';
import filesize from 'filesize';

import { splitPath, getParentDirectoryURL, joinURLParts } from '../utils/pathUtil';

const INDEX_HTML_FILES = ['index.html', 'index.htm', 'index.shtml'];
function getIndexHtml(links) {
  return links.filter(link => link && INDEX_HTML_FILES.indexOf(link.name) !== -1);
}

/** if ipfs hash is a folder, return JSON.stringify content JSON, with children: { name, size }, of if this folder have an index.html, return the list of index file in this directory */
export const resolveDirectory = promisify((ipfs, path, multihash, callback) => {
  ipfs.object.get(multihash, { enc: 'base58' }, (err, dagNode) => {
    if (err) {
      return callback(err);
    }
    // if it is a web site, return index.html
    const indexFiles = getIndexHtml(dagNode.Links);
    if (indexFiles.length > 0) {
      // TODO: add *.css and *.ico to cache, since they are already in "indexFiles"
      return callback(null, indexFiles);
    }
    return callback(null, JSON.stringify(renderFolder(path, dagNode.Links), null, '  '));
  });
});

/** transform dag info to JSON-LD, describe folder content, ls */
export default function renderFolder(path, links) {
  const parts = splitPath(path);
  const parentDirectoryURL = getParentDirectoryURL(parts);
  const children = links.filter(Boolean).map(link => ({
    '@id': joinURLParts(path, link.Name),
    name: link.Name,
    size: filesize(link.Tsize),
  }));
  return {
    '@id': parentDirectoryURL,
    children,
  };
}

export const resolveMultihash = promisify((ipfs, path, timing, callback) => {
  const parts = splitPath(path);
  const firstMultihash = parts.shift();
  let currentCid;

  const ipfsPathCheckingTimer = timing.startTimer("2.Checking path sanity");
  return async.reduce(
    parts,
    firstMultihash,
    // check if next part of hash is inside previous part of hash
    (memo, item, next) => {
      try {
        currentCid = new Cids(Multihashes.fromB58String(memo));
      } catch (err) {
        return next(err);
      }

      ipfs.dag.get(currentCid, (err, result) => {
        if (err) {
          return next(err);
        }

        const dagNode = result.value;
        // find multihash of requested named-file in current dagNode's links
        let multihashOfNextFile;
        const nextFileName = item;

        const { Links: links } = dagNode;

        for (const link of links) {
          if (link && link.Name === nextFileName) {
            // found multihash of requested named-file
            multihashOfNextFile = Multihashes.toB58String(link.Hash.multihash);
            break;
          }
        }

        if (!multihashOfNextFile) {
          return next(new Error(`no link named "${nextFileName}" under ${memo}`));
        }

        next(null, multihashOfNextFile);
      });
    },
    // check if last part of hash is a directory
    (err, result) => {
      ipfsPathCheckingTimer.stop();
      if (err) {
        return callback(err);
      }

      let cid;
      try {
        cid = new Cids(Multihashes.fromB58String(result));
      } catch (error) {
        return callback(error);
      }

      const ipfsFileStatTimer = timing.startTimer(`3.ipfs.files.stat ${path}`);
      ipfs.files.stat(`/ipfs/${path}`, (fileStatErr, stats) => {
        ipfsFileStatTimer.stop();
        if (fileStatErr) {
          return callback(fileStatErr);
        }
        if (stats.type.includes('directory')) {
          const isDirErr = new Error('This dag node is a directory');
          isDirErr.cid = cid;
          isDirErr.fileName = stats.name || stats.hash;
          isDirErr.dagDirType = stats.type;

          return callback(isDirErr);
        }

        callback(err, {
          multihash: result,
        });
      });
    },
  );
});
