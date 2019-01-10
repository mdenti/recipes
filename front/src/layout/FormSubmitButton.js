import React from 'react';
import { withStyles, Button } from '@material-ui/core';

const styles = (theme) => ({
    submit: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit,
        float: 'right',
    }
});

function FormSubmitButton(props) {
    const { classes, ...otherProps } = props;
    return (
        <Button className={classes.submit} {...otherProps}>
            {props.children}
        </Button>
    )
}

export default withStyles(styles)(FormSubmitButton);
