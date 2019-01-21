import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Button, Divider } from '@material-ui/core';

import RequestStatus from '../RequestStatus';
import { userContextConsumer } from '../contexts/UserContext';
import { recipeContextConsumer } from '../contexts/RecipeContext';

import PageHeader from '../layout/PageHeader';
import PageContainer from '../layout/PageContainer';
import GridContainer from '../layout/GridContainer';
import GridItemImage from '../layout/GridItemImage';

function RecipeActions(props) {
  const { deleteAction } = props;
  return (
    <Fragment>
      <div>
        <Button onClick={deleteAction}>Delete</Button>
      </div>
      <Divider />
    </Fragment>
  );
}

class RecipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToList: false,
    };
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  async componentDidMount() {
    const { match, recipeCtx } = this.props;
    await recipeCtx.getRecipe(match.params.id);
  }

  async deleteRecipe() {
    const { recipeCtx: { recipe, deleteRecipe } } = this.props;
    await deleteRecipe(recipe.id);
    this.setState({ redirectToList: true });
  }

  render() {
    const { recipeCtx: { recipe, requestStatus }, userCtx: { user } } = this.props;
    const { redirectToList } = this.state;

    if (redirectToList) {
      return <Redirect to="/recipes" />;
    }

    if (!recipe && requestStatus === RequestStatus.RUNNING) {
      return <div>Loading..</div>;
    }
    if (!recipe) {
      return <div>Recipe not found</div>;
    }

    return (
      <PageContainer>
        <PageHeader>
          {recipe.name}
        </PageHeader>
        <GridContainer>
          <Grid container spacing={24} justify="center">
            <Grid item xs={12} sm={6} lg={4}>
              <GridItemImage src={recipe.picture} alt={recipe.name} />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              {recipe.userId === user.id ? <RecipeActions deleteAction={this.deleteRecipe} /> : ''}
              {recipe.description}
            </Grid>
          </Grid>
        </GridContainer>
      </PageContainer>
    );
  }
}

export default userContextConsumer(recipeContextConsumer(RecipeView));
