import axios from 'axios';

// Authorization token and headers
const tokenLocalStorage = localStorage.getItem('token');
const token = `Bearer ${tokenLocalStorage}`;
const headers = { Authorization: token };
const baseURL = import.meta.env.VITE_API_BASE_URL;
const id = localStorage.getItem('id');
/**
 * Create FormData for product data
 * @param {Object} productData - product details including name, price, image, etc.
 * @returns {FormData}
 */
const createProductFormData = (productData) => {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);

    // If you have the image file
    if (productData.image_file) {
        formData.append('image_file', productData.image_file);
    }

    // Check if choices exist and append them
    if (productData.assigned_choices && productData.assigned_choices.length > 0) {
        formData.append('assigned_choices', JSON.stringify(productData.assigned_choices)); // Send the choices array
    }

    console.log("FORM DATA CONTENTS:");
    formData.forEach((value, key) => {
        console.log(key, value);
    });

    return formData;
};

// Service to add a new product
export const addProductService = (productData, menuId) => {
    const formData = createProductFormData(productData);
    return axios.post(`${baseURL}/api/add-item/menu/${menuId}`, formData, {
        headers: {
            ...headers,
            'Content-Type': 'multipart/form-data', // Set the appropriate content type
        }
    });
};

// Service to edit an existing product
export const editProductService = (productData, productId) => {
    const formData = createProductFormData(productData);
    return axios.put(`${baseURL}/api/edit-product/${id}/${productId}`, formData, {
        headers: {
            ...headers,
            'Content-Type': 'multipart/form-data', // Set the appropriate content type
        }
    });
};

// Service to delete a product
export const deleteProductService = (productId) => {
    return axios.delete(`${baseURL}/api/delete-product/${productId}`, { headers });
};

// Service to display all products
export const displayProductsService = (categoryId) => {
    return axios.get(`${baseURL}/api/menu/with-item/${categoryId}`, { headers });
};
