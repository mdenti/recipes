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
        const { recipes, addNewRecipe, requestStatus } = this.props.recipeCtx;
        return (
            <Fragment>
                <div>Recipe list</div>
                <button onClick={() => addNewRecipe({
                    id: 2,
                    name: 'Test adding new recipe!',
                    picture: 'https://ih1.redbubble.net/image.470402131.0272/ap,550x550,16x12,1,transparent,t.u3.png'
                })}>Add new</button>
                <div>
                    {(() => {
                        if ((!recipes || !recipes.length) && requestStatus === RequestStatus.RUNNING) {
                            return <div>Loading..</div>;
                        } else if (!recipes || !recipes.length) {
                            return <div>No recipes found</div>
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