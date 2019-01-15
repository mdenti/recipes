import React, { Component } from 'react';
import {
  InputAdornment, IconButton, TextField,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

class FormFieldPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  render() {
    const { showPassword } = this.state;
    return (
      <TextField
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={() => this.setState({ showPassword: !showPassword })}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...this.props}
      />
    );
  }
}

export default FormFieldPassword;
