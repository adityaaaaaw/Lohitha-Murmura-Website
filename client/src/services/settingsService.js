import api from './api';

export const getSettings = () => api.get('/settings');
export const updateSettings = (data) => api.put('/settings', data);
export const uploadLogo = (formData) => api.post('/settings/logo', formData);
export const uploadFavicon = (formData) => api.post('/settings/favicon', formData);
