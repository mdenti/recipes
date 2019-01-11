async function apiRequest(url, options = {}) {
  const response = await fetch(url, options);
  if (response.status !== 200) {
    throw new Error(`Request error: ${response.status} ${response.statusText}`);
  }
  const content = await response.json();
  return content;
}

export async function getRecipes() {
  return apiRequest('http://localhost:5000/recipes');
}

export async function addNewRecipe(recipe) {
  await apiRequest('http://localhost:5000/recipes', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  });
  return getRecipes();
}
