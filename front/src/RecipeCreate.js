import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { TextField } from '@material-ui/core';

import { withRecipeContextConsumer } from './contexts/RecipeContext';
import PageHeader from './layout/PageHeader';
import PageContainer from './layout/PageContainer';
import Form from './layout/Form';
import FormSubmitButton from './layout/FormSubmitButton';

class RecipeCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      picture: '',
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
    const { redirectToList, name, picture } = this.state;
    if (redirectToList) {
      return <Redirect to="/recipes" />;
    }
    return (
      <PageContainer>
        <PageHeader>Create new recipe</PageHeader>
        <Form onSubmit={this.save}>
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            margin="normal"
            fullWidth
          />
          <TextField
            id="picture"
            label="Picture"
            value={picture}
            onChange={e => this.setState({ picture: e.target.value })}
            margin="normal"
            fullWidth
          />
          <FormSubmitButton onClick={this.save}>Submit</FormSubmitButton>
        </Form>
      </PageContainer>
    );
  }
}

export default withRecipeContextConsumer(RecipeCreate);
