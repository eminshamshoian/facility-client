export const apiEndPoint = () => {
    return 'http://localhost:5000';
};

export const configHeader = () => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };
    return config;
};
