// choiceService.js
import axios from 'axios';

// Base URL for the API
const token = `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTkyLjE2OC4xNS42Nzo4MDAwL2FwaS9sb2dpbiIsImlhdCI6MTcyODk4OTI4NywiZXhwIjoxNzI4OTkyODg3LCJuYmYiOjE3Mjg5ODkyODcsImp0aSI6IjRlVGdaUFpVa0VCU1M2aU8iLCJzdWIiOiIyNyIsInBydiI6ImI5MTI3OTk3OGYxMWFhN2JjNTY3MDQ4N2ZmZjAxZTIyODI1M2ZlNDgiLCJyb2xlIjpudWxsfQ.XiFGJ4ZEZQNlAuyBLHZZZYNFjmkB-z5N7DExenNjQHU'}`;
const headers = { Authorization: token };
const baseURL = import.meta.env.VITE_API_BASE_URL;

// Service for managing choices
const createProductFormData = (choiceData) => {
    const formData = new FormData();
    console.log(choiceData, 'pp data')
    formData.append('name', choiceData.name);
    formData.append('is_required', choiceData.is_required);
    formData.append('choice_type', choiceData.choice_type);
    formData.append('choices', JSON.stringify(
        choiceData.choices.map(item => ({
            name: item.name,
            price: item.price
        }))
    ));
    return formData;
};
export const choiceService = {
    // Create a new choice
    createChoice(choiceData) {
        const formData = createProductFormData(choiceData);
        return axios.post(`${baseURL}/create-choice-group`, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data', // Set the appropriate content type
            }
        });
    },

    // Update an existing choice
    updateChoice(menuId, choiceId, choiceData) {
        return axios.put(`${baseURL}/menu/${menuId}/choices/${choiceId}`, choiceData);
    },

    // Delete a choice
    deleteChoice(id) {
        return axios.delete(`${baseURL}/delete-choice-group`, { headers }, id);
    },

    // Get choices for a specific menu
    getChoices() {
        return axios.get(`${baseURL}/choice-groups`, { headers });
    },
};
