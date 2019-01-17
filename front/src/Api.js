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

export async function getRecipe(id) {
  return apiRequest(`/api/recipes/${id}`);
}

export async function addNewRecipe(recipe) {
  return apiRequest('/api/recipes', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  });
}

export async function authenticateUser() {
  return apiRequest('/api/users/authenticate');
}

export async function registerNewUser(user) {
  return apiRequest('/api/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
}

export async function loginUser(user) {
  return apiRequest('/api/users/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
}
