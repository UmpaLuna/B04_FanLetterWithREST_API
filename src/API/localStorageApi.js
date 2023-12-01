export const setAccessTokenToLocalStorage = (authorizedUser) => {
  const stringfyData = JSON.stringify(authorizedUser);
  localStorage.setItem("authorized", stringfyData);
};

export const getAccessTokenFromLocalStorage = () => {
  const response = localStorage.getItem("authorized");
  const data = JSON.parse(response);
  if (!data) return false;

  return data;
};

export const removeAccessTokenWhereLocalStorage = () => {
  localStorage.removeItem("authorized");
};
