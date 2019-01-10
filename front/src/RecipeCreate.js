import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { TextField } from '@material-ui/core';

import { withRecipeContextConsumer } from './RecipeContext';
import PageHeader from './layout/PageHeader';
import PageContainer from './layout/PageContainer';
import Form from './layout/Form';
import FormSubmitButton from './layout/FormSubmitButton';

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
    async save() {
        const { redirectToList, ...newRecipe } = this.state;
        await this.props.recipeCtx.addNewRecipe(newRecipe);
        this.setState({ redirectToList: true })
    }
    render() {
        if (this.state.redirectToList) {
            return <Redirect to='/recipes' />
        }
        return (
            <PageContainer>
                <PageHeader>Create new recipe</PageHeader>
                <Form onSubmit={e => e.preventDefault()}>
                    <TextField
                        id="name"
                        label="Name"
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        id="picture"
                        label="Picture"
                        value={this.state.picture}
                        onChange={(e) => this.setState({ picture: e.target.value })}
                        margin="normal"
                        fullWidth
                    />
                    <FormSubmitButton onClick={this.save}>Submit</FormSubmitButton>
                </Form>
            </PageContainer>
        )
    }
}

export default withRecipeContextConsumer(RecipeCreate);
