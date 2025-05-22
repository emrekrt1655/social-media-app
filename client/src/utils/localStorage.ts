export const saveToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const removeToken = () => {
  localStorage.removeItem('accessToken');
};

const USER_KEY = "user";

export const setUserToStorage = (user: any) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserFromStorage = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const removeUserFromStorage = () => {
  localStorage.removeItem(USER_KEY);
};