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
    console.log(productData, 'pp data')
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('description', productData.description);
    formData.append('variation_id', JSON.stringify({
        choices: productData.variation_id.choices,
        addons: productData.variation_id.addons
    }));

    // Append the image file for submission
    if (productData.image_file) {
        formData.append('image_file', productData.image_file); // Send file, not data URL
    }
    // for (const [key, value] of formData.entries()) {
    //     console.log(`${key}:`, value);
    // }
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
