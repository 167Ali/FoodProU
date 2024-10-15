import axios from 'axios';

// Authorization token and headers
const token = `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTkyLjE2OC4xNS4yMDU6ODAwMC9hcGkvbG9naW4iLCJpYXQiOjE3Mjg5MDg4NzAsImV4cCI6MTcyODkxMjQ3MCwibmJmIjoxNzI4OTA4ODcwLCJqdGkiOiI5aWFBN29ZSFdKUEF6M0RMIiwic3ViIjoiMjciLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3Iiwicm9sZSI6bnVsbH0.FDvCPiiYh5nQrKPpuSDAEdeTO1JKkA19guHWlagz2T4'}`;
const headers = { Authorization: token };
const baseURL = import.meta.env.VITE_API_BASE_URL;

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
    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
    return formData;
};

// Service to add a new product
export const addProductService = (productData, id) => {
    const formData = createProductFormData(productData);
    return axios.post(`${baseURL}/add-item/menu/${id}`, formData, {
        headers: {
            ...headers,
            'Content-Type': 'multipart/form-data', // Set the appropriate content type
        }
    });
};

// Service to edit an existing product
export const editProductService = (productData, productId, restaurantid = 8) => {
    const formData = createProductFormData(productData);
    return axios.put(`${baseURL}/edit-product/${restaurantid}/${productId}`, formData, {
        headers: {
            ...headers,
            'Content-Type': 'multipart/form-data', // Set the appropriate content type
        }
    });
};

// Service to delete a product
export const deleteProductService = (productId, restaurantid = 8) => {
    return axios.delete(`${baseURL}/delete-product/${restaurantid}/${productId}`, { headers });
};

// Service to display all products
export const displayProductsService = (restaurantid = 8) => {
    return axios.get(`${baseURL}/get-products/${restaurantid}`, { headers });
};
