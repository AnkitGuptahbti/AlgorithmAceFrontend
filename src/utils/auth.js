// src/utils/auth.js
export const isAuthenticated = () => {
  const auth = localStorage.getItem("auth");
  return auth ? JSON.parse(auth) : null;
};
