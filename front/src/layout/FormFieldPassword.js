import React, { Component } from 'react';
import {
  FormControl, InputLabel, Input, InputAdornment, IconButton,
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
    const {
      fullWidth, margin, label, required, ...otherProps
    } = this.props;
    const { showPassword } = this.state;
    return (
      <FormControl fullWidth={fullWidth} margin={margin} required>
        <InputLabel>{label}</InputLabel>
        <Input
          type={showPassword ? 'text' : 'password'}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={() => this.setState({ showPassword: !showPassword })}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )}
          {...otherProps}
        />
      </FormControl>
    );
  }
}

export default FormFieldPassword;
