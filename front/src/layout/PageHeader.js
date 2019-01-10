import React from 'react';
import { Typography } from '@material-ui/core';

function PageHeader(props) {
    return (
        <Typography variant="h2" align="center" color="textPrimary" gutterBottom {...props}>
            {props.children}
        </Typography>
    )
}

export default PageHeader;
