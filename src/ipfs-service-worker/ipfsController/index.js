// @flow
import promisify from 'promisify-es6';
import mimeTypes from 'mime-types';

import { getReadyNode } from '../ipfsNode';
import { headerOK, headerError } from '../utils/headers';

export async function swarmConnect(peerAddress: string) {
  const ipfs = await getReadyNode();
  try {
    await promisify(ipfs.swarm.connect)(peerAddress);
    return new Response(JSON.stringify({ swarmConnectionEstablished: peerAddress }), {
      ...headerOK,
      headers: { 'Content-Type': mimeTypes.contentType('json') },
    });
  } catch (error) {
    return new Response(JSON.stringify({ tryToConnectSwarm: peerAddress, error, message: error.message }), {
      ...headerError,
      headers: { 'Content-Type': mimeTypes.contentType('json') },
    });
  }
}

export async function swarmList() {
  const ipfs = await getReadyNode();
  const peers = await promisify(ipfs.swarm.peers)();
  return new Response(JSON.stringify(peers), {
    ...headerOK,
    headers: { 'Content-Type': mimeTypes.contentType('json') },
  });
}
