// UserController.js

import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}`; // Đặt URL của backend API ở đây

export default {
  // Lấy danh sách các user
  getUsers() {
    try {
        return axios.get(`${API_URL}/users`);
      } catch (error) {
        console.error('Lỗi lấy list user', error);
        throw error; 
      }
  },

  // Lấy thông tin của một user theo id
  getUser(userId) {
    try {
        return axios.get(`${API_URL}/users/${userId}`);
      } catch (error) {
        console.error('Lỗi lấy list user theo id', error);
        throw error; 
      }
  },  
};
