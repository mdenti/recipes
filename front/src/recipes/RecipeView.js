import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import RequestStatus from '../RequestStatus';
import { recipeContextConsumer } from '../contexts/RecipeContext';

import PageHeader from '../layout/PageHeader';
import PageContainer from '../layout/PageContainer';
import GridContainer from '../layout/GridContainer';
import GridItemImage from '../layout/GridItemImage';

class RecipeView extends Component {
  async componentDidMount() {
    const { match, recipeCtx } = this.props;
    await recipeCtx.getRecipe(match.params.id);
  }

  render() {
    const { recipeCtx: { recipe, requestStatus } } = this.props;

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
              {recipe.description}
            </Grid>
          </Grid>
        </GridContainer>
      </PageContainer>
    );
  }
}

export default recipeContextConsumer(RecipeView);
