import router from "@/router";

export function authGuard(to) {

    let token = localStorage.getItem('tokenAdmin')
    
    if (token) {
        return true
    } else {
        router.push('/adlogin') // Si aucun token, redirige vers la page de login
    }

}

// function decodeToken(token) {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace('-', '+').replace('_', '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) { https://vente-gq1m.onrender.com/api/products
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// }