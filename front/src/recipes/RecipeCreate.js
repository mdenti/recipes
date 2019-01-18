import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { TextField } from '@material-ui/core';

import { recipeContextConsumer } from '../contexts/RecipeContext';
import PageHeader from '../layout/PageHeader';
import PageContainer from '../layout/PageContainer';
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

class RecipeCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      picture: '',
      description: '',
      redirectToList: false,
    };
    this.save = this.save.bind(this);
  }

  async save(e) {
    e.preventDefault();

    const { recipeCtx } = this.props;
    const { redirectToList, ...newRecipe } = this.state;
    await recipeCtx.addNewRecipe(newRecipe);
    this.setState({ redirectToList: true });
  }

  render() {
    const {
      redirectToList, name, picture, description,
    } = this.state;
    if (redirectToList) {
      return <Redirect to="/recipes" />;
    }
    return (
      <PageContainer>
        <PageHeader>Create new recipe</PageHeader>
        <FormElement onSubmit={this.save} fieldValues={{ name, picture }}>
          <TextField
            name="name"
            label="Name *"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            margin="normal"
            fullWidth
          />
          <TextField
            name="picture"
            label="Picture"
            value={picture}
            onChange={e => this.setState({ picture: e.target.value })}
            margin="normal"
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            margin="normal"
            fullWidth
            multiline
            rows={4}
            rowsMax={8}
          />
          <FormSubmitButton type="submit">Submit</FormSubmitButton>
        </FormElement>
      </PageContainer>
    );
  }
}

export default recipeContextConsumer(RecipeCreate);
