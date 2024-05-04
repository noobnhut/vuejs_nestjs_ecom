// ImgController.js

import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}`; // Đặt URL của backend API ở đây

export default {
  // lấy list Img
  getImgs() {
    try {
      return axios.get(`${API_URL}/imgs`);
    } catch (error) {
      console.error("Lỗi lấy list Img", error);
      throw error;
    }
  },

  // lấy Img theo id
  getImg(id) {
    try {
      return axios.get(`${API_URL}/imgs/${id}`);
    } catch (error) {
      console.error("Lỗi lấy list Img bằng id", error);
      throw error;
    }
  },

  // lấy list Img theo product
  getImgByProduct(productId) {
    try {
      return axios.get(`${API_URL}/imgs?productId=${productId}`);
    } catch (error) {
      console.error("Lỗi lấy list Img bằng productId", error);
      throw error;
    }
  },
  // thêm 1 Img 
  createImg(data) {
    try {
      return axios.post(`${API_URL}/imgs`, data);
    } catch (error) {
      console.error("Thêm Img thất bại", error);
      throw error;
    }
  },

  // update 1 Img
  updateImg(id, data) {
    try {
      return axios.patch(`${API_URL}/imgs/${id}`, data);
    } catch (error) {
      console.error("Cập nhập Img thất bại", error);
      throw error;
    }
  },

  // xóa 1 Img
  deleteImg(id) {
    try {
      return axios.delete(`${API_URL}/imgs/${id}`);
    } catch (error) {
      console.error("Xóa Img thất bại", error);
      throw error;
    }
  },
};
