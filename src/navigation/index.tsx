import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Loader from "../components/loader";
import PrivateRoute from "../components/privateRoutes";
import PageNotFound from "../containers/PageNotFound";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";

const Navigation = () => (
  <Router>
    <Suspense fallback={<Loader />}>
      <Switch>
        {PUBLIC_ROUTES.map((route) => {
          // @ts-ignore
          return <Route key={route.path} {...route} />;
        })}
        {PRIVATE_ROUTES.map((route) => {
          return <PrivateRoute key={route.path} {...route} />;
        })}
        <Route render={PageNotFound} />
      </Switch>
    </Suspense>
  </Router>
);

export default Navigation;
