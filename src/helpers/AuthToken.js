import axios from 'axios';

const AuthToken = token => {
    if (token) {
        axios.defaults.headers.common[`authorization`] = token;
    } else {
        delete axios.defaults.headers.common[`authorization`];
    }
};

export { AuthToken };
