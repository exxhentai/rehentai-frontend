// @flow
/* eslint-disable no-restricted-globals */

import qs from 'query-string';

import { isListenedRoute } from './utils/pathUtil';
import { swarmConnect, swarmList } from './ipfsController';
import { headerNotFound } from './utils/headers';
import getFile from './ipfsContentFetcher';
import config from '../config';

self.addEventListener('install', event => {
  // kick previous sw after install
  console.log('IPFS Gateway Service Worker is installing.');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', event => {
  // handle ipfs control api
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
            JSON.stringify({ url: event.request.url, query, split: url.split(`/${config.ipfsRoute}/`), route }),
            {
              ...headerNotFound,
            },
          ),
        );
    }
  }

  // handle ipfs content fetching
  if (isListenedRoute(event, config.ipfsRoute)) {
    // 1. we will goto /${config.ipfsRoute}/multihash so this will be a multihash
    // 2. if returned file of that multihash is a HTML, it will request for other content
    // so this will be content name. We may had cached this file in 1, so subsequent request will hit the cache.
    const multihashOrContentName = event.request.url.split(`/${config.ipfsRoute}/`)[1];
    console.log(`IPFS Gateway Service Worker getting ${multihashOrContentName}`);
    event.respondWith(getFile(multihashOrContentName));
  }
});
