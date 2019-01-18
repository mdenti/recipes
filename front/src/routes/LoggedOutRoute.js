import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { userContextConsumer } from '../contexts/UserContext';

function LoggedOutRoute({ userCtx, location: { state }, ...props }) {
  const { from } = state || { from: { pathname: '/recipes' } };
  if (userCtx.user) {
    return <Redirect to={from} />;
  }

  return <Route {...props} />;
}

export default userContextConsumer(LoggedOutRoute);
