import decode from "jwt-decode";

export const getTokenExpirationDate = (token: string) => {
  const decoded: any = decode(token);
  if (!decoded.exp) {
    return null;
  }
  const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
  date.setUTCSeconds(decoded.exp);
  return date;
};

export const isTokenExpired = (token: string) => {
  const date = getTokenExpirationDate(token);
  if (date === null) {
    return false;
  }
  if (date.valueOf() > new Date().valueOf()) {
    return true;
  } else return false;
};
export const isLoggedIn = (): boolean => {
  const loggedIn =
    sessionStorage.getItem("idToken") === null
      ? false
      : isTokenExpired(sessionStorage.getItem("idToken") || "");
  return loggedIn;
};
