// UserController.js

import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}`; // Đặt URL của backend API ở đây
axios.defaults.withCredentials = true;
export default {
  // Lấy danh sách các user
  getUsers() {
    try {
      return axios.get(`${API_URL}/users`);
    } catch (error) {
      console.error("Lỗi lấy list user", error);
      throw error;
    }
  },

  // Lấy thông tin của một user theo id
  getUser(userId) {
    try {
      return axios.get(`${API_URL}/users/${userId}`);
    } catch (error) {
      console.error("Lỗi lấy list user theo id", error);
      throw error;
    }
  },

  // hàm đăng ký user
  register(formData) {
    try {
      const fullname = formData.get("fullname");
      const address = formData.get("address");
      const email = formData.get("email");
      const numberphone = formData.get("numberphone");
      const password = formData.get("password");
      return axios.post(`${API_URL}/users`, {
        email: email,
        password: password,
        address: address,
        fullname: fullname,
        numberphone: numberphone,
      });
    } catch (error) {
      console.log(error);
    }
  },

  login(formData) {
    try {
      const email = formData.get("email");
      const password = formData.get("password");
      return axios.post(`${API_URL}/auth/login`, {
        username: email,
        password: password,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getProfile(value) {
    let token = "";
    if (value == "admin") {
      token = localStorage.getItem("token_admin");
    } else if ((value = "user")) {
      token = localStorage.getItem("token");
    }

    if (token) {
      var replace_token = token.replace(/"/g, "");
      const headers = {
        Authorization: `Bearer ${replace_token}`,
        "Content-Type": "application/json",
      };

      return axios.get(`${API_URL}/auth/profile`, { headers });
    } else {
      return Promise.reject(new Error("Không có token"));
    }
  },

  async refreshToken(value) {
    try {
      // Gọi API để refresh token
      let refreshResponse = ''

      // Lưu token mới vào local storage
      let newToken = ''
      if (value == "admin") {
        refreshResponse = await axios.get(`${API_URL}/auth/refresh_admin`);
        localStorage.setItem(
          "token_admin",
          JSON.stringify(refreshResponse.data.access_token)
        );
         newToken = localStorage.getItem("token_admin");
      } else if ((value = "user")) {
        refreshResponse = await axios.get(`${API_URL}/auth/refresh`);
        localStorage.setItem(
          "token",
          JSON.stringify(refreshResponse.data.access_token)
        );
        newToken = localStorage.getItem("token");
      }

      // Lấy token mới từ local storage
     
      var replace_newToken = newToken.replace(/"/g, "");

      // Cấu hình header với token mới
      const newHeaders = {
        Authorization: `Bearer ${replace_newToken}`,
        "Content-Type": "application/json",
      };

      // Gửi lại yêu cầu với token mới
      const profileResponse = await axios.get(`${API_URL}/auth/profile`, {
        headers: newHeaders,
      });

      // Trả về kết quả từ yêu cầu gửi với token mới
      return profileResponse;
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      throw error;
    }
  },

  logout(id,value) {
    try {
      let token = "";
      if (value == "admin") {
        token = localStorage.getItem("token_admin");
      } else if ((value = "user")) {
        token = localStorage.getItem("token");
      }

      if (token) {
        var replace_token = token.replace(/"/g, "");
        
        const headers = {
          Authorization: `Bearer ${replace_token}`,
          "Content-Type": "application/json",
        };
        return axios.get(`${API_URL}/auth/logout/${id}`, { headers });
      } else {
        console.log("không tồn tại user");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
