// ImgController.js

import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}`; // Đặt URL của backend API ở đây

export default {
  // lấy list Img
  getImgs() {
    try {
      return axios.get(`${API_URL}/img-products`);
    } catch (error) {
      console.error("Lỗi lấy list Img", error);
      throw error;
    }
  },

  // lấy Img theo id
  getImg(id) {
    try {
      return axios.get(`${API_URL}/img-products/${id}`);
    } catch (error) {
      console.error("Lỗi lấy list Img bằng id", error);
      throw error;
    }
  },

  // lấy list Img theo product
  getImgByProduct(productId) {
    try {
      return axios.get(`${API_URL}/img-products/product/${productId}`);
    } catch (error) {
      console.error("Lỗi lấy list Img bằng productId", error);
      throw error;
    }
  },
  // thêm 1 Img
  createImg(data, id) {
    try {
      const avatar = data.get("avatar");
      const formData = new FormData();
      formData.append("file", avatar);
      return axios.post(`${API_URL}/img-products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Thêm Img thất bại", error);
      throw error;
    }
  },

  // xóa 1 Img
  deleteImg(id) {
    try {
      return axios.delete(`${API_URL}/img-products/${id}`);
    } catch (error) {
      console.error("Xóa Img thất bại", error);
      throw error;
    }
  },
};
