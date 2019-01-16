import React from 'react';
import { Redirect } from 'react-router-dom';

import { userContextConsumer } from '../contexts/UserContext';

function requireLoggedInUser(PageComponent) {
  function logInWrapper(props) {
    const { userCtx } = props;

    if (!userCtx.user) {
      return <Redirect to="/" />;
    }

    return (
      <PageComponent {...props} />
    );
  }
  return userContextConsumer(logInWrapper);
}

export default requireLoggedInUser;
