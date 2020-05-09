const TOKEN_KEY = 'jwt';

export const loginTk = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const getToken = () => {
    localStorage.getItem(TOKEN_KEY);
}

export const logoutTk = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}