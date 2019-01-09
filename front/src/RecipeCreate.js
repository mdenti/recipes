import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { withRecipeContextConsumer } from './RecipeContext';

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

        const { redirectToList, ...newRecipe } = this.state;
        await this.props.recipeCtx.addNewRecipe(newRecipe);
        this.setState({ redirectToList: true })
    }
    render() {
        if (this.state.redirectToList) {
            return <Redirect to='/recipes' />
        }
        return (
            <div>
                <div>Create new recipe</div>
                <form onSubmit={this.save}>
                    <label>
                        Name:
                        <input type="text" onChange={(e) => this.setState({ name: e.target.value })}/>
                    </label>
                    <label>
                        Picture:
                        <input type="text" onChange={(e) => this.setState({ picture: e.target.value })}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default withRecipeContextConsumer(RecipeCreate);
