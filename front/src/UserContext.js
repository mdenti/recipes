import React, { Component, createContext } from 'react';

import RequestStatus from './RequestStatus';
import { authenticateUser, registerNewUser } from './Api';

const userCtx = createContext({
  user: {},
  registerNewUser: () => {},
  requestStatus: RequestStatus.INACTIVE,
});

export function userContextProvider(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        user: null,
        registerNewUser: this.registerNewUser.bind(this),
        requestStatus: RequestStatus.INACTIVE,
      };
    }

    async componentDidMount() {
      this.setState({ requestStatus: RequestStatus.RUNNING });
      try {
        const user = await authenticateUser();
        this.setState({ user, requestStatus: RequestStatus.INACTIVE });
      } catch (error) {
        this.setState({ user: {}, requestStatus: RequestStatus.FAILED });
      }
    }

    async registerNewUser(userData) {
      this.setState({ requestStatus: RequestStatus.RUNNING });
      try {
        const user = await registerNewUser(userData);
        this.setState({ user, requestStatus: RequestStatus.INACTIVE });
      } catch (error) {
        this.setState({ requestStatus: RequestStatus.FAILED });
      }
    }

    render() {
      return (
        <userCtx.Provider value={this.state}>
          <WrappedComponent {...this.props} />
        </userCtx.Provider>
      );
    }
  };
}

export function userContextConsumer(WrappedComponent) {
  return function component(props) {
    return (
      <userCtx.Consumer>
        {userContext => <WrappedComponent userCtx={userContext} {...props} />}
      </userCtx.Consumer>
    );
  };
}
