import { packageJSON } from '../../config';
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */

export function splitPath(path) {
  if (path[path.length - 1] === '/') {
    path = path.substring(0, path.length - 1);
  }

  return path.split('/');
}

export function removeLeadingSlash(url) {
  if (url[0] === '/') {
    url = url.substring(1);
  }

  return url;
}

export function removeTrailingSlash(url) {
  if (url.endsWith('/')) {
    url = url.substring(0, url.length - 1);
  }

  return url;
}

export function removeSlashFromBothEnds(url) {
  url = removeLeadingSlash(url);
  url = removeTrailingSlash(url);

  return url;
}

export function joinURLParts(...urls) {
  urls = urls.filter(url => url && url.length > 0);
  urls = [].concat(urls.map(url => removeSlashFromBothEnds(url)));

  return urls.join('/');
}

/** check if is gh-page deployed or localhost development */
export function isListenedRoute(event, route) {
  return (
    event.request.url.startsWith(`${packageJSON.homepage}${route}/`) ||
    event.request.url.startsWith(`${self.location.origin}/${route}/`)
  );
}

export function getParentDirectoryURL(originalParts) {
  const parts = originalParts.slice();

  if (parts.length > 1) {
    parts.pop();
  }

  return ['', 'ipfs'].concat(parts).join('/');
}
