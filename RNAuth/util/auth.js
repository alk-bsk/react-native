import axios from 'axios';

const API_KEY = 'AIzaSyDdUpVD2cF72dH8-rPLdFlMQduOnhpzAQ0';

async function authenticate(mode, email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    const response = await axios.post(url,
        {
            email, password, returnSecureToken: true
        }
    );
    console.log(response.data);
    return response.data.idToken;
}


export function createUser(email, password) {
    return authenticate('signup', email, password);
}

export function login(email, password) {
    return authenticate('signInWithPassword', email, password);
}