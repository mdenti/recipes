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

import validationRules from './validation/rules';
import withFormValidation from './validation/withFormValidation';

const rules = {
  email: [validationRules.required, validationRules.email],
  password: [validationRules.required],
};
const FormElement = withFormValidation(Form, rules);

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
    await userCtx.registerNewUser(this.state);
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
        <FormElement
          onSubmit={this.save}
          fieldValues={this.state}
        >
          <TextField
            name="email"
            label="Email *"
            type="text"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            margin="normal"
            fullWidth
          />
          <FormFieldPassword
            name="password"
            label="Password *"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            margin="normal"
            fullWidth
          />
          <FormSubmitButton type="submit">Submit</FormSubmitButton>
        </FormElement>
      </PageContainer>
    );
  }
}

export default userContextConsumer(Registration);
