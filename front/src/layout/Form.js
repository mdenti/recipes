import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  form: {
    maxWidth: 500,
    margin: '0 auto',
  },
});

function Form(props) {
  const { classes, children, ...otherProps } = props;
  return (
    <form className={classes.form} {...otherProps}>
      {children}
    </form>
  );
}

export default withStyles(styles)(Form);
