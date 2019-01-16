import React from 'react';
import { Redirect } from 'react-router-dom';

import { userContextConsumer } from '../contexts/UserContext';

function requireLoggedOutUser(PageComponent) {
  function logOutWrapper(props) {
    const { userCtx } = props;

    if (userCtx.user) {
      return <Redirect to="/recipes" />;
    }

    return (
      <PageComponent {...props} />
    );
  }
  return userContextConsumer(logOutWrapper);
}

export default requireLoggedOutUser;
