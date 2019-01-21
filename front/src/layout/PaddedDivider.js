import React from 'react';
import { Divider, withStyles } from '@material-ui/core';

const styles = () => ({
  divider: {
    marginBottom: '10px',
  },
});

function PaddedDivider(props) {
  const { classes, ...otherProps } = props;
  return (
    <Divider className={classes.divider} {...otherProps} />
  );
}

export default withStyles(styles)(PaddedDivider);
