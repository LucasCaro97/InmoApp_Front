const getToken = (): string | null => {
  const token = localStorage.getItem("jwt");
  return token;
};

const setToken = (token: string): void => {
  localStorage.setItem("jwt", token);
};

const deleteToken = () => {
    localStorage.removeItem("jwt");
}
export { getToken, setToken, deleteToken };
