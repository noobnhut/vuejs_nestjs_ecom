import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}`; // Đặt URL của backend API ở đây


export default {

    // láy list order
    getOrders()
    {
        try {
            return axios.get(`${API_URL}/orders`);
          } catch (error) {
            console.error("Lỗi lấy list order", error);
            throw error;
          }
    },

    // lấy list detail order
    getDetailOrder(id)
    {
        try {
        return axios.get(`${API_URL}/orders/details/${id}`);
      } catch (error) {
        console.error("Lỗi lấy detail", error);
        throw error;
      }

    },

    // chuyển trạng thái đơn hàng
    UpdateStatusOrder(id)
    {
        try {
            return axios.put(`${API_URL}/orders/status/${id}`);
          } catch (error) {
            console.error("Lỗi cập nhập trạng thái", error);
            throw error;
          }
    }
}