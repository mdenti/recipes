import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { recipeContextConsumer } from '../contexts/RecipeContext';
import PageHeader from '../layout/PageHeader';
import PageContainer from '../layout/PageContainer';

import RequestStatus from '../RequestStatus';
import RecipeEditForm from './RecipeEditForm';

class RecipeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      picture: '',
      description: '',
      redirectToRecipePage: false,
    };
    this.onFieldUpdate = this.onFieldUpdate.bind(this);
    this.save = this.save.bind(this);
  }

  async componentDidMount() {
    const { match, recipeCtx } = this.props;
    const { name, picture, description } = await recipeCtx.getRecipe(match.params.id);
    this.setState({ name, picture, description });
  }

  onFieldUpdate(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async save(e) {
    e.preventDefault();

    const { match, recipeCtx } = this.props;
    const { redirectToRecipePage, ...newRecipe } = this.state;
    await recipeCtx.updateRecipe(match.params.id, newRecipe);
    this.setState({ redirectToRecipePage: true });
  }

  render() {
    const {
      name, picture, description,
      redirectToRecipePage,
    } = this.state;

    const { match, recipeCtx: { recipe, requestStatus } } = this.props;

    if (redirectToRecipePage) {
      return <Redirect to={`/recipes/${match.params.id}`} />;
    }

    if (!recipe && requestStatus === RequestStatus.RUNNING) {
      return <div>Loading..</div>;
    }
    if (!recipe) {
      return <div>Recipe not found</div>;
    }

    return (
      <PageContainer>
        <PageHeader>Edit recipe</PageHeader>
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

export default recipeContextConsumer(RecipeEdit);
