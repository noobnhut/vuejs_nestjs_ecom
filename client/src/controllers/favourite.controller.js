import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}`; // Đặt URL của backend API ở đây
axios.defaults.withCredentials = true;

export default {
    getFavourites() {
        try {
          return axios.get(`${API_URL}/favourites`);
        } catch (error) {
          console.error("Lỗi lấy list", error); 
        }
      },

      addfavoutires(id_user,id_product)
      {
        try {
          return axios.post(`${API_URL}/favourites?user=${id_user}&&product=${id_product}`,
            {
                status:true
            }
          );
            
        } catch (error) {
            console.log(error)
        }
      }
}