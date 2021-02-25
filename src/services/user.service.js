import axios from 'axios';

import { apiEndPoint, configHeader } from '../Config';

const API_ENDPOINT = apiEndPoint();
const config = configHeader();

export const getUserData = async () => {
    const response = await axios.get(`${API_ENDPOINT}/user`, config);
    return response;
};
