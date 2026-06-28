import api from './api';

export const createInquiry = (data) => api.post('/inquiries', data);
export const getInquiries = (params) => api.get('/inquiries/admin', { params });
export const updateInquiryStatus = (id, status) => api.put(`/inquiries/admin/${id}/status`, { status });
export const deleteInquiry = (id) => api.delete(`/inquiries/admin/${id}`);
export const getDashboardStats = () => api.get('/inquiries/dashboard/stats');
