import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { TextField } from '@material-ui/core';

import RequestStatus from './RequestStatus';
import { userContextConsumer } from './contexts/UserContext';
import Form from './layout/Form';
import FormSubmitButton from './layout/FormSubmitButton';
import FormFieldPassword from './layout/FormFieldPassword';
import PageHeader from './layout/PageHeader';
import PageContainer from './layout/PageContainer';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.save = this.save.bind(this);
  }

  async save(e) {
    e.preventDefault();

    const { userCtx } = this.props;
    const { redirectToList, ...newUser } = this.state;
    await userCtx.registerNewUser(newUser);
    this.setState({ redirectToList: true });
  }

  render() {
    const { userCtx } = this.props;
    const { email, password } = this.state;

    if (userCtx.requestStatus === RequestStatus.RUNNING) {
      return <div>Loading..</div>;
    }
    if (userCtx.requestStatus === RequestStatus.FAILED) {
      return <div>There was an error with the user registration, try again soon</div>;
    }
    if (userCtx.user && userCtx.requestStatus === RequestStatus.INACTIVE) {
      return <Redirect to="/recipes" />;
    }

    return (
      <PageContainer>
        <PageHeader>Register</PageHeader>
        <Form onSubmit={this.save}>
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            margin="normal"
            fullWidth
            required
          />
          <FormFieldPassword
            id="password"
            label="Password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            margin="normal"
            fullWidth
            required
          />
          <FormSubmitButton onClick={this.save}>Submit</FormSubmitButton>
        </Form>
      </PageContainer>
    );
  }
}

export default userContextConsumer(Registration);
