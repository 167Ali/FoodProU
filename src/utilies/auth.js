// src/utils/auth.js
export const getToken = () => {
    return localStorage.getItem('token'); // Adjust as necessary
};

export const getCustomerId = () => {
    return localStorage.getItem('customerId'); // Adjust as necessary
};
