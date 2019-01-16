async function apiRequest(url, options = {}) {
  const fullOptions = Object.assign({ credentials: 'include' }, options);
  const response = await fetch(url, fullOptions);
  if (response.status !== 200) {
    throw new Error(`Request error: ${response.status} ${response.statusText}`);
  }
  const content = await response.json();
  return content;
}

export async function getRecipes() {
  return apiRequest('/api/recipes');
}

export async function addNewRecipe(recipe) {
  await apiRequest('/api/recipes', {
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
  await apiRequest('/api/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
}

export async function loginUser(user) {
  await apiRequest('/api/users/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
}
