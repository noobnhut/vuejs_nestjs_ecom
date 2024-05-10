// CouponController.js

import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}`; // Đặt URL của backend API ở đây

export default {
  // lấy list coupon
  getCoupons() {
    try {
      return axios.get(`${API_URL}/coupons`);
    } catch (error) {
      console.error("Lỗi lấy list coupon", error);
      throw error;
    }
  },

  createCoupon(data) {
    try {
      return axios.post(`${API_URL}/coupons`, data);
    } catch (error) {
      console.error("Thêm coupon thất bại", error);
      throw error;
    }
  },

  updateCoupon(id, data) {
    try {
      return axios.patch(`${API_URL}/coupons/${id}`, data);
    } catch (error) {
      console.error("Cập nhập coupon thất bại", error);
      throw error;
    }
  },

  deleteCoupon(id) {
    try {
      return axios.delete(`${API_URL}/coupons/${id}`);
    } catch (error) {
      console.error("Xóa coupon thất bại", error);
      throw error;
    }
  },
};
