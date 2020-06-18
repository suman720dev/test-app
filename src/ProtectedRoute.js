import React from 'react';

import {
  Route,
  Redirect,
} from "react-router-dom";

const PrivateRoute = ({ component: Component, render, ...rest }) => {
  const renderContent = (props) => {
    if (!localStorage.getItem("user")) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      );
    }
    return typeof render === "function" ? (
      render(props)
    ) : (
      <Component {...props} />
    );
  };

  return <Route {...rest} render={renderContent} />;
};

export default PrivateRoute; 