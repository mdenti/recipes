import React, { Component } from 'react';
import { TextField } from '@material-ui/core';

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

class Login extends Component {
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
    await userCtx.loginUser(this.state);
  }

  render() {
    const { email, password } = this.state;

    return (
      <PageContainer>
        <PageHeader>Login</PageHeader>
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

export default userContextConsumer(Login);
