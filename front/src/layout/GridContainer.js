import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  padded: {
    flexGrow: 1,
    padding: '24px',
  },
});


function GridContainer(props) {
  const { classes, children, ...otherProps } = props;
  return (
    <div className={classes.padded} {...otherProps}>
      {children}
    </div>
  );
}

export default withStyles(styles)(GridContainer);
