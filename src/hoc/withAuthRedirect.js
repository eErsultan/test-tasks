import React from "react";
import { Redirect } from "react-router-dom";

export const withAuthRedirect = (Component) => {
  const RedirectComponent = (props) => {
    if (!props.email) return <Redirect to="/auth" />;
    return <Component {...props} />;
  };
  return RedirectComponent;
};
