export const HTTP_API_ENDPOINT =
  process.env.REACT_APP_HTTP_API_ENDPOINT || "http://localhost:4000/api";
export const AUTH0_AUTH_OPTIONS = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || "",
  audience: process.env.REACT_APP_AUTHO_AUDIENCE || "",
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID || "",
  redirectUri: process.env.REACT_APP_CALLBACK || "",
  responseType: "id_token",
  scope: "openid profile",
  realm: process.env.REACT_APP_AUTH0_REALM,
};
