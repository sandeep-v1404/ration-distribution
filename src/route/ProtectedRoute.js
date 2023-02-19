import React, { Fragment } from "react";
import { Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { token } = JSON.parse(localStorage.getItem("profile"));
  return (
    <Fragment>
      <Route
        {...rest}
        render={(props) => {
          if (!token) {
            return <Navigate to="/login" />;
          }
          if (token) {
            return <Navigate to="/profile" />;
          }
          return <Component {...props} />;
        }}
      />
    </Fragment>
  );
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  isAdmin: PropTypes.any,
  component: PropTypes.any,
};
