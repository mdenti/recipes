import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { userContextConsumer } from '../contexts/UserContext';

function LoggedInRoute({ userCtx, ...props }) {
  if (!userCtx.user) {
    return <Redirect to="/" />;
  }

  return <Route {...props} />;
}

export default userContextConsumer(LoggedInRoute);
