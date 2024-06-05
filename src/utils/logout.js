export const logout = (navigate) => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };