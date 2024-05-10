<template>
  <!-- Start block -->
  <section class="p-3 sm:p-5 antialiased">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <!-- Start coding here -->
      <div
        class="relative shadow-md sm:rounded-lg overflow-hidden  px-2 py-2"
      >
        <div
          class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
        >
          <div class="w-full md:w-1/2">
            <div class="flex items-center">
              <label for="simple-search" class="sr-only">Tìm kiếm</label>
              <div class="relative w-full">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  v-on:keyup.enter="search()"
                  v-model="value_search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Tìm theo theo tên..."
                  required=""
                />
              </div>
            </div>
          </div>
        </div>
        <!--nội dung-->
        <!--title add-->
        <div class="flex items-center justify-between mt-2 mb-2">
          <h2 class="text-[20px] font-medium ">Quản lý coupon</h2>
          <button @click="openAdd()" type="button"
            class="inline-flex items-center gap-x-1 rounded-10 bg-white py-2 px-4 text-sm"
          >
            <svg fill="none" viewBox="0 0 24 24" class="h-6 w-6 stroke-current">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M12 5.75v12.5M18.25 12H5.75"
              ></path></svg><span>Thêm mới</span>
          </button>
        </div>

        <!--table-->
        <div class="overflow-x-auto">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-4 py-4">STT</th>
                <th scope="col" class="px-4 py-3">Tên danh mục</th>
                <th scope="col" class="px-4 py-3">Phần trăm %</th>
                <th scope="col" class="px-4 py-3">Số lượng</th>
                <th scope="col" class="px-4 py-3"></th>
                <th scope="col" class="px-4 py-3"></th>
              </tr>
            </thead>

            <tbody v-for="(coupon, index) in coupons" :key="index">
              <tr class="border-b border-gray-700">
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-white-900 whitespace-nowrap dark:text-black"
                >
                  {{ index + 1 }}
                </th>
                <td class="px-4 py-3">
                  {{ coupon.coupon_name }}
                </td>
                <td class="px-4 py-3">
                  {{ coupon.coupon_percent }}
                </td>
                <td class="px-4 py-3">
                  {{ coupon.coupon_quantity }}
                </td>

                <td class="px-4 py-3">
                  <button @click="openUpdate(); selectCoupon(coupon)" type="button"
                    class="flex items-center justify-center gap-x-2 rounded-10 border py-2 px-1 border-blue-400/10 bg-blue-700/20 text-blue-400"
                  >
                    <span class="h-2 w-2 rounded-full bg-blue-400"></span
                    ><span class="text-xs">Cập nhập</span>
                  </button>
                </td>

                <td class="px-4 py-3">
                  <button @click="openDelete(); selectCoupon(coupon)" type="button"
                    class="flex items-center justify-center gap-x-2 rounded-10 border py-2 px-1 border-red-400/10 bg-red-700/20 text-red-400"
                  >
                    <span class="h-2 w-2 rounded-full bg-red-400"></span
                    ><span class="text-xs">Xóa</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

  <!-- Create modal -->
  <div v-if="isAdd"
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-blue-100 rounded-lg shadow-lg">
    <div class="p-8">
      <div class="mb-2">
          <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Mã coupon
          </label>
          <input v-model="coupon_name" type="text" 
          id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>

      <div class="mb-2">
          <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Phần trăm %
          </label>
          <input v-model="coupon_percent" type="number" 
          id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>

      <div class="mb-2">
          <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Số lượng
          </label>
          <input v-model="coupon_quantity" type="number" 
          id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>

      <div class="flex justify-between items-center">
        <button @click="createCoupon()" type="button" 
        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Thêm
        </button>
        <button @click="openAdd()" type="button" 
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            Hủy
        </button>
      </div>
    </div>
</div>
  <!-- Create end -->

  <!-- Update modal -->
  <div v-if="isUpdate"
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-blue-100 rounded-lg shadow-lg">
    <div class="p-8">
      <div class="mb-2">
          <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Mã coupon
          </label>
          <input v-model="coupon_name" type="text" 
          id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>

      <div class="mb-2">
          <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Phần trăm %
          </label>
          <input v-model="coupon_percent" type="number" 
          id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>

      <div class="mb-2">
          <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Số lượng
          </label>
          <input v-model="coupon_quantity" type="number" 
          id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>

      <div class="flex justify-between items-center">
        <button @click="updateCoupon()" type="button" 
        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Cập nhật
        </button>
        <button @click="openUpdate()" type="button" 
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            Hủy
        </button>
      </div>
    </div>
</div>
  <!-- Update end -->

  <!-- Delete modal -->
  <div v-if="isDelete" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-blue-100 rounded-lg shadow-lg">
    <div class="p-8">
      <div class="mb-2">
        <p class="text-center text-gray-700 mb-4">Bạn có muốn xóa không?</p>

        <div class="flex justify-between items-center">
            <button @click="deleteCoupon()" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Xóa
            </button>
            <button @click="openDelete()" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Hủy
            </button>
        </div>
      </div>
    </div>
</div>
  <!-- Delete end -->

  <!-- End block -->

  <!--component toast thông báo !!!-->
  <toast ref="toast"></toast>
</template>

<script>
import couponController from '../../controllers/coupon.controller';
import toast from "../../components/toast.component.vue";
export default {
  data() {
    return {
      coupons: [], coupon: "",
      value_search: "",
      coupon_name:null, coupon_percent: null, coupon_quantity: null, select_coupon:null,
      isAdd:false,isUpdate:false,isDelete:false
    };
  },
  mounted() {
    this.getCoupon();
  },
  components: {
    toast,
  },
  methods: {
    openAdd() {
        this.isAdd = !this.isAdd
        this.coupon_name = "";
        this.coupon_percent = 0;
        this.coupon_quantity = 0;
    },

    openDelete() {
      this.isDelete = !this.isDelete
    },

    openUpdate() {
      this.isUpdate = !this.isUpdate
    },

    selectCoupon(select) {
      this.coupon = select;
      this.coupon_name = select.coupon_name;
      this.coupon_percent = select.coupon_percent;
      this.coupon_quantity = select.coupon_quantity
    },

    async getCoupon() {
      try {
        const result = await couponController.getCoupons();
        this.coupons = result.data;
      } catch (error) {
        console.log(error);
      }
    },

    async createCoupon() {
      try {
        const requestData = {
          coupon_name: this.coupon_name,
          coupon_percent: this.coupon_percent,
          coupon_quantity: this.coupon_quantity
        };
        console.log(this.coupon_name);
        const result = await couponController.createCoupon(requestData);
        console.log(result);

        if(result.status == 201){
          this.$refs.toast.showToast(result.data.message);
          // setTimeout(() => {
          //    location.reload()
          // }, 1000);
          this.openAdd();
          this.getCoupon();
        }else{
          this.$refs.toast.showToast(result.data.message);
        }
        
      } catch (error) {
        console.log(error);
      }
    },

    async updateCoupon() {
      try {
        const requestData = {
          coupon_name: this.coupon_name,
          coupon_percent: this.coupon_percent,
          coupon_quantity: this.coupon_quantity
        };
        const result = await couponController.updateCoupon(this.coupon.id, requestData);
        if(result.status == 201){
          setTimeout(() => {
             location.reload()
          }, 1000);
          this.openUpdate();
          this.getCoupon();
          this.$refs.toast.showToast(result.data.message);
        }else{
          this.$refs.toast.showToast(result.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteCoupon() {
      try {
        const result = await couponController.deleteCoupon(this.coupon.id);
        this.openDelete();
        this.getCoupon();
      } catch (error) {
        console.log(error);
      }
    },

    async search() {
      try {
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
