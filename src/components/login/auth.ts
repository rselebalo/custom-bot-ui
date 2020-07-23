import auth0 from "auth0-js";
import { AUTH0_AUTH_OPTIONS } from "../../constants";
import { isTokenExpired } from "./jwtHelper";

class Auth {
  auth0: auth0.WebAuth;
  constructor() {
    this.auth0 = new auth0.WebAuth(AUTH0_AUTH_OPTIONS);

    this.setProfile = this.setProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  async setProfile(accessToken: any) {
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      sessionStorage.setItem("profile", JSON.stringify(profile));
    });
  }

  getIdToken() {
    if (!this.isAuthenticated()) {
      return false;
    }
    return sessionStorage.getItem("idToken");
  }

  isAuthenticated() {
    // const expiresAt = JSON.parse(sessionStorage.getItem("expires_at"));
    // return new Date().getTime() < expiresAt;
    if (!sessionStorage.getItem("idToken")) {
      return false;
    }
    return isTokenExpired(sessionStorage.getItem("idToken") || "");
  }

  signIn(userName: string, password: string) {
    this.auth0.client.login(
      {
        realm: process.env.REACT_APP_AUTH0_REALM || "",
        username: userName,
        password: password,
      },
      async (error: any, authResult: any) => {
        if (error) {
          console.log(error);
          return;
        }
        if (authResult && authResult.idToken && authResult.accessToken) {
          this.setSession(authResult);
          this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
            sessionStorage.setItem("profile", JSON.stringify(profile));
            window.location.replace("/");
          });
        }
      }
    );
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err: any, authResult: any) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        this.setProfile(authResult.accessToken);
        window.location.replace("/");
        resolve();
      });
    });
  }

  setSession(authResult: any) {
    //save to session storage
    sessionStorage.setItem("idToken", authResult.idToken);
    sessionStorage.setItem("accessToken", authResult.accessToken);
    // set the time that the id token will expire at
    sessionStorage.setItem(
      "expiresAt",
      (authResult.expiresIn * 1000 + new Date().getTime()).toString()
    );
  }
  signOut() {
    sessionStorage.removeItem("idToken");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("expiresAt");
    sessionStorage.removeItem("profile");
    window.location.replace("/login");
  }
  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err: any, authResult: any) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;
