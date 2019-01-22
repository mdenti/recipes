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
      recipe: null,
      redirectToRecipePage: false,
    };
    this.onFieldUpdate = this.onFieldUpdate.bind(this);
    this.save = this.save.bind(this);
  }

  async componentDidMount() {
    const { match, recipeCtx } = this.props;
    const recipe = await recipeCtx.getRecipe(match.params.id);
    this.setState({ recipe });
  }

  onFieldUpdate(e) {
    const { recipe } = this.state;
    const updatedRecipe = Object.assign({}, recipe, { [e.target.name]: e.target.value });
    this.setState({ recipe: updatedRecipe });
  }

  async save(e) {
    e.preventDefault();

    const { match, recipeCtx } = this.props;
    const { recipe } = this.state;
    await recipeCtx.updateRecipe(match.params.id, recipe);
    this.setState({ redirectToRecipePage: true });
  }

  render() {
    const {
      recipe,
      redirectToRecipePage,
    } = this.state;

    const { match, recipeCtx: { requestStatus } } = this.props;

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
          recipe={recipe}
          onUpdate={this.onFieldUpdate}
          onSubmit={this.save}
        />
      </PageContainer>
    );
  }
}

export default recipeContextConsumer(RecipeEdit);
