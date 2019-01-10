import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';

import RequestStatus from './RequestStatus';
import { withRecipeContextConsumer } from './RecipeContext';
import GridItem from './layout/GridItem';
import GridItemImage from './layout/GridItemImage';
import PageHeader from './layout/PageHeader';
import PageContainer from './layout/PageContainer';

class RecipeListItem extends Component {
    render() {
        const { recipe: { name, picture, id } } = this.props;
        return (
            <GridItem linkTo={`/recipe/${id}`}>
                <GridItemImage src={picture} alt={name}/>
                <Typography variant='h6' align='center'>{name}</Typography>
            </GridItem>
        );
    }
}

class RecipeList extends Component {
    render() {
        const { recipes, requestStatus } = this.props.recipeCtx;
        return (
            <PageContainer>
                <PageHeader>Recipe list</PageHeader>
                <Grid container spacing={16} justify="center">
                    {(() => {
                        if ((!recipes || !recipes.length) && requestStatus === RequestStatus.RUNNING) {
                            return 'Loading..';
                        } else if (!recipes || !recipes.length) {
                            return 'No recipes found';
                        }
                        return recipes.map((recipe) => <RecipeListItem recipe={recipe} key={recipe.id} />);
                    })()
                    }
                </Grid>
            </PageContainer>
        );
    }
}

export default withRecipeContextConsumer(RecipeList);
