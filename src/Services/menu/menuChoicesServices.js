// choiceService.js
import axios from 'axios';

// Base URL for the API
const tokenLocalStorage = localStorage.getItem('token');
const token = `Bearer ${tokenLocalStorage}`;
const headers = { Authorization: token };
const baseURL = import.meta.env.VITE_API_BASE_URL;

// Service for managing choices
const createProductFormData = (choiceData) => {
    const formData = new FormData();
    // console.log(choiceData, 'pp data')
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
const updateProductFormData = (choiceData) => {
    const formData = new FormData();
    // console.log(choiceData, 'pp data')
    formData.append('id', choiceData.id);
    formData.append('name', choiceData.name);
    formData.append('is_required', choiceData.is_required);
    formData.append('choice_type', choiceData.choice_type);
    formData.append('choices', JSON.stringify(choiceData.choices));
    formData.append('new_choices', JSON.stringify(
        choiceData.new_choices.map(item => ({
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
        return axios.post(`${baseURL}/api/create-choice-group`, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data', // Set the appropriate content type
            }
        });
    },

    // Update an existing choice
    updateChoice(choiceData) {
        const formData = updateProductFormData(choiceData);
        return axios.post(`${baseURL}/api/update-choice-group`, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data', // Set the appropriate content type
            }
        });
    },
    // Delete a choice
    deleteChoice(id) {
        console.log("SER ", id)
        return axios.delete(`${baseURL}/api/delete-choice-group?id=${id}`, { headers });
    },

    // Get choices for a specific menu
    getChoices() {
        return axios.get(`${baseURL}/api/choice-groups`, { headers });
    },
};
