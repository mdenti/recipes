import defaultRecipes from './DefaultRecipes';

async function sleep(ms) {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500)
    });

    return promise;
}

async function apiRequest(url) {
    return sleep(500);
}

export async function getRecipes() {
    await apiRequest();
    
    const recipes = window.localStorage.getItem('recipes');
    if (!recipes) {
        window.localStorage.setItem('recipes', JSON.stringify(defaultRecipes));
        return defaultRecipes;
    }
    return JSON.parse(recipes);
}

export async function addNewRecipe(recipe) {
    await apiRequest();
    const recipes = JSON.parse(window.localStorage.getItem('recipes')) || defaultRecipes;

    const newId = Math.max.apply(Math, recipes.map(function(o) { return o.id; })) + 1;
    const newRecipe = Object.assign({}, recipe, { id: newId })

    window.localStorage.setItem('recipes', JSON.stringify(recipes.concat([newRecipe])));
    return recipes.concat([newRecipe]);
}