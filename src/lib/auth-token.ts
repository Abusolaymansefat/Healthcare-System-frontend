let accessToken: string | null = null;
let locallySignedOut = false;

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (token) {
    locallySignedOut = false;
  }
}

export function clearAuthSession() {
  accessToken = null;
  locallySignedOut = true;
}

export function isLocallySignedOut() {
  return locallySignedOut;
}
