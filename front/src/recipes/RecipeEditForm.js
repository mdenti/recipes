import React from 'react';
import { TextField } from '@material-ui/core';

import Form from '../layout/Form';
import FormSubmitButton from '../layout/FormSubmitButton';

import validationRules from '../validation/rules';
import withFormValidation from '../validation/withFormValidation';

const rules = {
  name: [validationRules.required],
  picture: [validationRules.url],
  description: [],
};
const FormElement = withFormValidation(Form, rules);

function RecipeEditForm(props) {
  const {
    name, picture, description, onUpdate, onSubmit,
  } = props;
  return (
    <FormElement onSubmit={onSubmit} fieldValues={{ name, picture, description }}>
      <TextField
        name="name"
        label="Name *"
        value={name}
        onChange={onUpdate}
        margin="normal"
        fullWidth
      />
      <TextField
        name="picture"
        label="Picture"
        value={picture}
        onChange={onUpdate}
        margin="normal"
        fullWidth
      />
      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={onUpdate}
        margin="normal"
        fullWidth
        multiline
        rows={4}
        rowsMax={8}
      />
      <FormSubmitButton type="submit">Submit</FormSubmitButton>
    </FormElement>
  );
}

export default RecipeEditForm;
