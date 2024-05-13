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

    addPaymentCOD(formData,id)
    {
      try {
      const total_order = formData.get("total_order");
      const total_coupon = formData.get("total_coupon");
      return axios.post(`${API_URL}/orders/${id}`, {
        total_order: total_order,
        total_coupon: total_coupon,    
        carts:JSON.parse(localStorage.getItem("cart"))
      });
    } catch (error) {
      console.log(error);
    }

    },

    addPaymentVN(formData,id)
    {
      try {
      const total_order = formData.get("total_order");
      const total_coupon = formData.get("total_coupon");
      const payment = formData.get("payment");
      const bank = formData.get("bank");

      return axios.post(`${API_URL}/orders/create-vnp/${id}`, {
        total_order: total_order,
        total_coupon: total_coupon,
        payment:payment,
        bank:bank,
        carts:JSON.parse(localStorage.getItem("cart"))
      });
    } catch (error) {
      console.log(error);
    }

    },

     getPayment(query) {
      try {
        const jsonData = JSON.stringify(query);
          return axios.get(`${API_URL}/orders/vnpay_get?query=${jsonData}`,
              )
      } catch (error) {
          console.log(error)
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
    },

   async updatePayment(id,vnp_OrderInfo,vnp_Amount,vnp_PayDate,check_create)
    {
      return await axios.patch(`${API_URL}/orders/update/${id}?check_create=${check_create}`,
      {
          "vnp_orderID": vnp_OrderInfo,
          "total_bank": vnp_Amount/100,
          "date_bank": vnp_PayDate,
      })
    }
}