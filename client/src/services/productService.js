import api from './api';

export const getProducts = (params) => api.get('/products', { params });
export const getProductBySlug = (slug) => api.get(`/products/${slug}`);
export const getFeaturedProducts = () => api.get('/products/featured');
export const getAllProductsAdmin = () => api.get('/products/admin/all');
export const createProduct = (formData) => api.post('/products/admin', formData);
export const updateProduct = (id, formData) => api.put(`/products/admin/${id}`, formData);
export const deleteProductImage = (id, public_id) => api.delete(`/products/admin/${id}/image`, { data: { public_id } });
export const deleteProduct = (id) => api.delete(`/products/admin/${id}`);
