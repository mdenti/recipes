import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, CardActionArea, withStyles } from '@material-ui/core';

function GridItem(props) {
    const { children, linkTo, ...otherProps } = props;
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} {...otherProps} >
            {linkTo
                ? <CardActionArea component={Link} to={linkTo}>
                    {children}
                  </CardActionArea>
                : children}
        </Grid>
    )
}

export default GridItem;
