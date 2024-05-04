// RoleController.js


import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}`; // Đặt URL của backend API ở đây

export default {
    // lấy list user_role
    getUserRole() {
        try {
            return axios.get(`${API_URL}/users/role`);
          } catch (error) {
            console.error('Lỗi lấy list user role', error);
            throw error; 
          }
      },
}