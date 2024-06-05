export const isAuthenticated = () => {
    const token = localStorage.getItem('jwt');
    if(!token){
        return false;
    }


    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Date.now() / 1000

    if(payload.exp < currentTime){
        localStorage.removeItem('jwt');
        return false;
    }

    return true;
}

