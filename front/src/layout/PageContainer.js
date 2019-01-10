import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  container: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 3}px`,
  },
});

function PageContainer(props) {
  const { classes, children, ...otherProps } = props;
  return (
    <div className={classes.container} {...otherProps}>
      {children}
    </div>
  );
}

export default withStyles(styles)(PageContainer);
