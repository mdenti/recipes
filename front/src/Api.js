const baseApiUrl = `http://${process.env.REACT_APP_BACK_HOST}:${process.env.REACT_APP_BACK_PORT}`;

async function apiRequest(url, options = {}) {
  const response = await fetch(`${baseApiUrl}${url}`, options);
  if (response.status !== 200) {
    throw new Error(`Request error: ${response.status} ${response.statusText}`);
  }
  const content = await response.json();
  return content;
}

export async function getRecipes() {
  return apiRequest('/recipes');
}

export async function addNewRecipe(recipe) {
  await apiRequest('/recipes', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  });
  return getRecipes();
}

export async function authenticateUser() {
  return false;
}

export async function registerNewUser(user) {
  await apiRequest('/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
}
