// ProductController.js

import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}`; // Đặt URL của backend API ở đây

export default {
  // lấy list product
  getProducts() {
    try {
      return axios.get(`${API_URL}/products`);
    } catch (error) {
      console.error("Lỗi lấy list product", error);
      throw error;
    }
  },

  // lấy product theo id
  getProduct(id) {
    try {
      return axios.get(`${API_URL}/products/${id}`);
    } catch (error) {
      console.error("Lỗi lấy list product bằng id", error);
      throw error;
    }
  },

  // lấy list product theo cat
  getProductByCat(catId) {
    try {
      return axios.get(`${API_URL}/products?catId=${catId}`);
    } catch (error) {
      console.error("Lỗi lấy list product bằng catId", error);
      throw error;
    }
  },
  // thêm 1 product 
  createProduct(data,catid) {
    try {
      return axios.post(`${API_URL}/product?catid=${catid}`, data);
    } catch (error) {
      console.error("Thêm product thất bại", error);
      throw error;
    }
  },

  // update 1 product
  updateProduct(id, data) {
    try {
      return axios.patch(`${API_URL}/product?id=${id}&&catid=${catid}`, data);
    } catch (error) {
      console.error("Cập nhập product thất bại", error);
      throw error;
    }
  },

  // xóa 1 product
  deleteProduct(id) {
    try {
      return axios.delete(`${API_URL}/product/${id}`);
    } catch (error) {
      console.error("Xóa product thất bại", error);
      throw error;
    }
  },
};
