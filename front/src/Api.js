import defaultRecipes from './DefaultRecipes';

async function apiRequest(url) {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500)
    });

    return promise;
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
    window.localStorage.setItem('recipes', JSON.stringify(recipes.concat([recipe])));
    return recipes.concat([recipe]);
}