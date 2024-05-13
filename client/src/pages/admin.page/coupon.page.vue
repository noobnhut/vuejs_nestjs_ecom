<template>
  <!-- Start block -->
  <section class="p-3 sm:p-5 antialiased">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <!-- Start coding here -->
      <div class="relative shadow-md sm:rounded-lg overflow-hidden px-2 py-2">
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
          <h2 class="text-[20px] font-medium">Quản lý coupon</h2>
          <button
            @click="openAdd()"
            type="button"
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
                <th scope="col" class="px-4 py-3">Mã coupon</th>
                <th scope="col" class="px-4 py-3">Phần trăm %</th>
                <th scope="col" class="px-4 py-3">Số lượng</th>
                <th scope="col" class="px-4 py-3"></th>
                <th scope="col" class="px-4 py-3"></th>
              </tr>
            </thead>

            <tbody v-for="(coupon, index) in coupons" :key="index">
              <tr class="border-b">
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
                  <button
                    @click="
                      isUpdate = true;
                      selectCoupon(coupon);
                    "
                    type="button"
                    class="flex items-center justify-center gap-x-2 rounded-10 border py-2 px-1 border-blue-400/10 bg-blue-700/20 text-blue-400"
                  >
                    <span class="h-2 w-2 rounded-full bg-blue-400"></span
                    ><span class="text-xs">Cập nhập</span>
                  </button>
                </td>

                <td class="px-4 py-3">
                  <button
                    @click="
                      isDelete = true;
                      selectCoupon(coupon);
                    "
                    type="button"
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

  <!--create-->
  <div
    v-if="isAdd"
    id="createProductModal"
    class="overflow-y-auto overflow-x-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center z-50"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div
        class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
      >
        <!-- Modal header -->
        <div
          class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Thêm coupon
          </h3>

          <button
            @click="isAdd = false"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-target="createProductModal"
            data-modal-toggle="createProductModal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div>
          <div class="coupon_name">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Mã coupon</label
            >
            <input
              v-model="coupon_name"
              type="text"
              name="name"
              id="name"
              class="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Nhập giá trị"
              required=""
            />
          </div>

          <div class="coupon_percent">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Phần trăm (%)</label
            >
            <input
              v-model="coupon_percent"
              type="text"
              name="name"
              id="name"
              class="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Nhập giá trị"
              required=""
            />
          </div>

          <div class="coupon_quantity">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Số lượng</label
            >
            <input
              v-model="coupon_quantity"
              type="number"
              name="name"
              id="name"
              class="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Nhập giá trị"
              required=""
            />
          </div>
        </div>

        <button
          @click="createCoupon()"
          class="mt-2 inline-flex items-center bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <svg
            class="mr-1 -ml-1 w-6 h-6"
            fill="currentColor"
            viewbox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Thêm coupon
        </button>
      </div>
    </div>
  </div>

   <!--update-->
   <div
    v-if="isUpdate"
    id="createProductModal"
    class="overflow-y-auto overflow-x-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center z-50"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div
        class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
      >
        <!-- Modal header -->
        <div
          class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Cập nhật coupon
          </h3>

          <button
            @click="
              isUpdate = false;
            "
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-target="createProductModal"
            data-modal-toggle="createProductModal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div>
          <div class="coupon_name">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Mã coupon</label
            >
            <input
              v-model="coupon_name"
              type="text"
              name="name"
              id="name"
              class="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Nhập giá trị"
              required=""
            />
          </div>

          <div class="coupon_percent">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Phần trăm (%)</label
            >
            <input
              v-model="coupon_percent"
              type="text"
              name="name"
              id="name"
              class="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Nhập giá trị"
              required=""
            />
          </div>

          <div class="coupon_quantity">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Số lượng</label
            >
            <input
              v-model="coupon_quantity"
              type="number"
              name="name"
              id="name"
              class="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Nhập giá trị"
              required=""
            />
          </div>
        </div>

        <button
          @click="updateCoupon()"
          class="mt-2 inline-flex items-center bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <svg
            class="mr-1 -ml-1 w-6 h-6"
            fill="currentColor"
            viewbox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Cập nhật coupon
        </button>
      </div>
    </div>
  </div>

  <!-- delete -->
  <div
    id="deleteModal"
    v-if="isDelete"
    class="overflow-y-auto overflow-x-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center z-50"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div
        class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
      >
        <button
          @click="
            isDelete = false;
          "
          type="button"
          class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-toggle="deleteModal"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewbox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <svg
          class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
          aria-hidden="true"
          fill="currentColor"
          viewbox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="mb-4 text-gray-500 dark:text-gray-300">
          Bạn có muốn xóa
          <span class="font-bold"> {{ coupon_name }}</span> ?
        </p>
        <div class="flex justify-center items-center space-x-4">
          <button
            data-modal-toggle="deleteModal"
            type="button"
            @click="
              isDelete = false;
            "
            class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Hủy
          </button>
          <button
            type="submit"
            @click="deleteCoupon()"
            class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- End block -->

  <!--component toast thông báo !!!-->
  <toast ref="toast"></toast>
</template>

<script>
import couponController from "../../controllers/coupon.controller";
import toast from "../../components/toast.component.vue";
export default {
  data() {
    return {
      coupons: [],
      coupon: "",
      value_search: "",
      coupon_name: null,
      coupon_percent: null,
      coupon_quantity: null,
      select_coupon: null,
      isAdd: false,
      isUpdate: false,
      isDelete: false,
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
      this.isAdd = true;
      this.coupon_name = "";
      this.coupon_percent = 0;
      this.coupon_quantity = 0;
    },

    selectCoupon(select) {
      this.coupon = select;
      this.coupon_name = select.coupon_name;
      this.coupon_percent = select.coupon_percent;
      this.coupon_quantity = select.coupon_quantity;
    },

    // dùng để loại bỏ 2 dấu [] và "" trong thông báo error
    throwError(errorMessage){ 
      errorMessage = errorMessage.join(', ');
      return this.$refs.toast.showToast(errorMessage);   
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
          coupon_percent: parseInt(this.coupon_percent),
          coupon_quantity: parseInt(this.coupon_quantity),
        };
        console.log(this.coupon_name);
        const result = await couponController.createCoupon(requestData);
        // console.log(result);

        if (result.status == 201) {
          this.$refs.toast.showToast(result.data);
          // setTimeout(() => {
          //    location.reload()
          // }, 1000);
          this.isAdd = false;
          this.getCoupon();
        } else {
          this.$refs.toast.showToast(result.data);
        }
      } catch (error) {
        if (error.response.status === 400) {
          await this.throwError(error.response.data.message);
        } else {
          console.log(error);
        }
      }
    },

    async updateCoupon() {
      try {
        const requestData = {
          coupon_name: this.coupon_name,
          coupon_percent: parseInt(this.coupon_percent),
          coupon_quantity: parseInt(this.coupon_quantity),
        };
        const result = await couponController.updateCoupon(
          this.coupon.id,
          requestData
        );
        if (result.status == 200) {
          // setTimeout(() => {
          //   location.reload();
          // }, 1000);
          this.isUpdate = false;
          this.getCoupon();
          this.$refs.toast.showToast(result.data);
        } else {
          this.$refs.toast.showToast(result.data);
        }
      } catch (error) {
        if (error.response.status === 400) {
          await this.throwError(error.response.data.message);
        } else {
          console.log(error);
        }
      }
    },

    async deleteCoupon() {
      try {
        const result = await couponController.deleteCoupon(this.coupon.id);
        this.isDelete = false;
        this.getCoupon();
        this.$refs.toast.showToast(result.data);
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
