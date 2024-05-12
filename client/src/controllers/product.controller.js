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
  getProductByCat(catId,page,limit) {
    try {
      return axios.get(`${API_URL}/products/cat/${catId}?page=${page}&&limit=${limit}`);
    } catch (error) {
      console.error("Lỗi lấy list product bằng catId", error);
      throw error;
    }
  },

  // thêm 1 product 
  createProduct(data) {
    try {
      const name_product = data.get("name_product");
      const des_product = data.get("des_product");
      const price = data.get("price");
      const quantity = data.get("quantity");
      const catID = data.get("catID");

      return axios.post(`${API_URL}/products/${catID}`, {
        name_product:name_product,
        des_product:des_product,
        price:price,
        quantity:quantity

      });;
    } catch (error) {
      console.error("Thêm product thất bại", error);
      throw error;
    }
  },

  // update 1 product
  updateProduct(id, data) {
    try {
      const name_product = data.get("name_product");
      const des_product = data.get("des_product");
      const price = data.get("price");
      const quantity = data.get("quantity");

      return axios.patch(`${API_URL}/products/${id}`, {
        name_product:name_product,
        des_product:des_product,
        price:price,
        quantity:quantity

      });
    } catch (error) {
      console.error("Cập nhập product thất bại", error);
      throw error;
    }
  },

  // xóa 1 product
  deleteProduct(id) {
    try {
      return axios.delete(`${API_URL}/products/${id}`);
    } catch (error) {
      console.error("Xóa product thất bại", error);
      throw error;
    }
  },

  searchProduct(value)
  {
    try {
      return axios.get(`${API_URL}/products/search?name=${value}`);
    } catch (error) {
      console.error("Xóa product thất bại", error);
      throw error;
    }
  },

  
  
};
