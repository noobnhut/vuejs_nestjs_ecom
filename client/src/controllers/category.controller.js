// CatController.js

import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}`; // Đặt URL của backend API ở đây

export default {
  // lấy list cat
  getCats() {
    try {
      return axios.get(`${API_URL}/cats`);
    } catch (error) {
      console.error("Lỗi lấy list cat", error);
      throw error;
    }
  },

  createCat(dataCat) {
    try {
      return axios.post(`${API_URL}/cats`, dataCat);
    } catch (error) {
      console.error("Thêm cat thất bại", error);
      throw error;
    }
  },

  updateCat(id, dataCat) {
    try {
      return axios.patch(`${API_URL}/cats/${id}`, dataCat);
    } catch (error) {
      console.error("Cập nhập cat thất bại", error);
      throw error;
    }
  },

  deleteCat(id) {
    try {
      return axios.delete(`${API_URL}/cats/${id}`);
    } catch (error) {
      console.error("Xóa cat thất bại", error);
      throw error;
    }
  },
};
