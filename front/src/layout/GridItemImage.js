import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = () => ({
    square: {
        paddingBottom: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    },
});

function GridItemImage(props) {
    const { classes, src, style, ...otherProps } = props;
    const customStyles = Object.assign({
        backgroundImage: `url('${src}')`,
    }, style);
    return (
        <div className={classes.square} style={customStyles} {...otherProps} />
    )
}

export default withStyles(styles)(GridItemImage);
