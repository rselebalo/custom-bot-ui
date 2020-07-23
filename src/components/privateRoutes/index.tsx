import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import DefaultLayout from "../../containers/DefaultLayout";
import { isLoggedIn } from "../login/jwtHelper";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const isAuthenticated = isLoggedIn();
  useEffect(() => {
    if (isAuthenticated) {
      return;
    }
    const fn = async () => {
      window.location.replace("/login");
    };
    fn();
  }, [isAuthenticated, path]);

  const render = (props: any) =>
    isAuthenticated === true ? <DefaultLayout {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
