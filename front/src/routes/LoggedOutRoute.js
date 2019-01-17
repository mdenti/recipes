import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { userContextConsumer } from '../contexts/UserContext';

function LoggedOutRoute({ userCtx, ...props }) {
  if (userCtx.user) {
    return <Redirect to="/recipes" />;
  }

  return <Route {...props} />;
}

export default userContextConsumer(LoggedOutRoute);
