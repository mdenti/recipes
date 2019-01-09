import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import RequestStatus from './RequestStatus';
import { withRecipeContextConsumer } from './RecipeContext';

class RecipeListItem extends Component {
    render() {
        const { recipe: { name, picture, id } } = this.props;
        return (
            <div>
                <Link to={`/recipe/${id}`}>
                    <img src={picture} alt={name}/>
                    <div>{name}</div>
                </Link>
            </div>
        );
    }
}

class RecipeList extends Component {
    render() {
        const { recipes, requestStatus } = this.props.recipeCtx;
        return (
            <Fragment>
                <div>Recipe list</div>
                <Link to="/recipe/create">Create new recipe</Link>
                <div>
                    {(() => {
                        if ((!recipes || !recipes.length) && requestStatus === RequestStatus.RUNNING) {
                            return 'Loading..';
                        } else if (!recipes || !recipes.length) {
                            return 'No recipes found';
                        }
                        return recipes.map((recipe) => <RecipeListItem recipe={recipe} key={recipe.id} />);
                    })()
                    }
                </div>
            </Fragment>
        );
    }
}

export default withRecipeContextConsumer(RecipeList);