import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
    form: {
        maxWidth: 500,
        margin: '0 auto',
    }
});

function Form(props) {
    const { classes, ...otherProps } = props;
    return (
        <form className={classes.form} {...otherProps}>
            {props.children}
        </form>
    )
}

export default withStyles(styles)(Form);
