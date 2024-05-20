<template>
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
                  placeholder="Tìm theo theo  tên..."
                  required=""
                />
              </div>
            </div>
          </div>
        </div>
        <!--nội dung-->
        <!--title add-->
        <div class="flex items-center justify-between mt-2 mb-2">
          <h2 class="text-[20px] font-medium">Quản lý đơn hàng</h2>
          <button
            @click="isAdd = true"
            class="inline-flex items-center gap-x-1 rounded-10 bg-white py-2 px-4 text-sm"
          >
            <svg fill="none" viewBox="0 0 24 24" class="h-6 w-6 stroke-current">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M12 5.75v12.5M18.25 12H5.75"
              ></path></svg
            ><span>Thêm mới</span>
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
                <th scope="col" class="px-4 py-3">Tên khách hàng</th>
                <th scope="col" class="px-4 py-3">Thông tin chi tiết</th>
                <th scope="col" class="px-4 py-3">Tổng tiền</th>
                <th scope="col" class="px-4 py-3">Trạng thái</th>
                <th scope="col" class="px-4 py-3">Ngày tạo</th>
                <th scope="col" class="px-4 py-3"></th>

              </tr>
            </thead>

            <tbody v-for="(order, index) in orders" :key="index">
              <tr class="border-b">
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-white-900 whitespace-nowrap dark:text-black"
                >
                  {{ index + 1 }}
                </th>
                <td class="px-4 py-3">
                  {{ order.user.fullname }}
                </td>

                <td class="px-4 py-3 cursor-pointer">
                  <div
                    @click="
                      getdetail(order.ods);
                      is_detail = true;
                    "
                    class="flex items-center justify-center gap-x-2 rounded-10 border py-2 px-1 border-gray-400/10 bg-gray-700/20 text-gray-400"
                  >
                    <span class="text-xs">Xem chi tiết</span>
                  </div>
                </td>

                <td class="px-4 py-3">
                  {{ formatPrice(order.total_order) }}
                </td>

                <td class="px-4 py-3">
                  {{ order.status }}
                </td>

                <td class="px-4 py-3">
                  {{ formatTime(order.created_at) }}
                </td>

                <td
                  class="whitespace-nowrap px-4 py-2"
                  v-if="
                    order.status != 'Thanh toán thất bại' &&
                    order.status != 'Đã hủy' && order.status != 'Đã giao hàng'
                  "
                >
                  <a
                    @click="changeDeleteOrder(order.id)"
                    class="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
                  >
                    Chuyển đơn hàng
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

  <!--view od-->
  <div
    v-if="is_detail"
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
            Chi tiết hóa đơn
          </h3>

          <button
            @click="is_detail = false"
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
        <div class="overflow-x-auto">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-4 py-4">STT </th>
                <th scope="col" class="px-4 py-3">Tên sản phẩm</th>
                <th scope="col" class="px-4 py-3">Giá tiền</th>
                <th scope="col" class="px-4 py-3">Ngày tạo</th>
              </tr>
            </thead>

            <tbody v-for="(od, index) in ods" :key="index">
              <tr class="border-b">
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-white-900 whitespace-nowrap dark:text-black"
                >
                  {{ index + 1 }}
                </th>
                <td class="px-4 py-3">
                  {{ od.product.name_product }}
                </td>

                <td class="px-4 py-3">
                  {{ formatPrice(od.single_price) }}
                </td>

                <td class="px-4 py-3">
                  {{ formatTime(od.created_at) }}
                </td>

                
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <toast ref="toast" />
</template>

<script>
import extensiveController from "../../controllers/extensive.controller";
import orderController from "../../controllers/order.controller";
import toast from "../../components/toast.component.vue";

export default {
  data() {
    return {
      orders: [],
      ods: [],
      get_order: "",
      value_search: "",
      is_detail: false,
    };
  },
  mounted() {
    this.getOrder();
  },
  components: { toast },
  methods: {
    async getOrder() {
      const result = await orderController.getOrders();
      this.orders = result.data;
    },

    getdetail(od) {
      this.ods = od;
    },

    formatPrice(value) {
      return extensiveController.formatCurrency(value);
    },

    formatTime(value) {
      return extensiveController.formatTime(value);
    },

    async changeDeleteOrder(order) {
      const result = await orderController.changeStatus(order);
      this.getOrder()
      this.$refs.toast.showToast(result.data);
    },
  },
};
</script>
