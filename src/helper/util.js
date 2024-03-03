import { endPoint } from "../api/restClient"
export const checkImageURL = (url) => {
  if (url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:'))) {
    // Complete URL
    return url;
  } else {
    // Partial path
    return `${endPoint}/${url}`;
  }
}