import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';

import RequestStatus from './RequestStatus';
import { recipeContextConsumer } from './contexts/RecipeContext';
import GridItem from './layout/GridItem';
import GridItemImage from './layout/GridItemImage';
import PageHeader from './layout/PageHeader';
import PageContainer from './layout/PageContainer';

function RecipeListItem(props) {
  const { recipe: { name, picture, id } } = props;
  return (
    <GridItem linkTo={`/recipe/${id}`}>
      <GridItemImage src={picture} alt={name} />
      <Typography variant="h6" align="center">{name}</Typography>
    </GridItem>
  );
}

class RecipeList extends Component {
  async componentDidMount() {
    const { recipeCtx: { getRecipes } } = this.props;
    await getRecipes();
  }

  render() {
    const { recipeCtx: { recipes, requestStatus } } = this.props;
    return (
      <PageContainer>
        <PageHeader>Recipe list</PageHeader>
        <Grid container spacing={16} justify="center">
          {(() => {
            if ((!recipes || !recipes.length) && requestStatus === RequestStatus.RUNNING) {
              return 'Loading..';
            }
            if (!recipes || !recipes.length) {
              return 'No recipes found';
            }
            return recipes.map(recipe => <RecipeListItem recipe={recipe} key={recipe.id} />);
          })()
          }
        </Grid>
      </PageContainer>
    );
  }
}

export default recipeContextConsumer(RecipeList);
