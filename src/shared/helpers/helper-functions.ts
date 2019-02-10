export function getFlickrPhotoUrl({ farm, server, id, secret }): string {
  return `https://farm${ farm }.staticflickr.com/${ server }/${ id }_${ secret }.jpg`;
}
