import React from 'react';
import { Typography } from '@material-ui/core';

function PageHeader({ children, ...otherProps }) {
  return (
    <Typography variant="h2" align="center" color="textPrimary" gutterBottom {...otherProps}>
      {children}
    </Typography>
  );
}

export default PageHeader;
