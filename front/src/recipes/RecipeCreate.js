import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { recipeContextConsumer } from '../contexts/RecipeContext';
import PageHeader from '../layout/PageHeader';
import PageContainer from '../layout/PageContainer';

import RecipeEditForm from './RecipeEditForm';

class RecipeCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      picture: '',
      description: '',
      redirectToList: false,
    };
    this.onFieldUpdate = this.onFieldUpdate.bind(this);
    this.save = this.save.bind(this);
  }

  onFieldUpdate(e) {
    this.setState({ [e.target.name]: e.target.value });
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
        <RecipeEditForm
          name={name}
          picture={picture}
          description={description}
          onUpdate={this.onFieldUpdate}
          onSubmit={this.save}
        />
      </PageContainer>
    );
  }
}

export default recipeContextConsumer(RecipeCreate);
