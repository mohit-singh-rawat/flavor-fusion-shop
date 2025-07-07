// Token utility functions
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export const getTokenFromStorage = () => {
  return localStorage.getItem('token');
};

export const isUserAuthenticated = () => {
  const token = getTokenFromStorage();
  return token && !isTokenExpired(token);
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};