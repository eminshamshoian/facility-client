import axios from 'axios';

import { apiEndPoint, configHeader } from '../Config';

const API_ENDPOINT = apiEndPoint();
const config = configHeader();

export const signUpUser = async userData => {
    const response = await axios.post(
        `${API_ENDPOINT}/register`,
        userData,
        config
    );
    return response;
};

export const signInUser = async userData => {
    const response = await axios.post(
        `${API_ENDPOINT}/login`,
        userData,
        config
    );
    return response;
};
