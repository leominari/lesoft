import Cookie from 'js-cookie'

const TOKEN_KEY = 'jwt';

// export const setToken = (token) => {
//     Cookie.set(TOKEN_KEY, token)
// }

// export const getToken = () => {
//     Cookie.get(TOKEN_KEY)
// }

// export const removeToken = () => {
//     Cookie.remove(TOKEN_KEY)
// }

// export const isAuthenticated = () => {
//     if (Cookie.get(TOKEN_KEY)) {
//         return true;
//     }
//     console.log('ei')
//     return false;
// }



export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const getToken = () => {
    localStorage.getItem(TOKEN_KEY);
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isAuthenticated = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}