<template>
  <header>
    <div class="mx-auto  px-4 py-8 sm:px-6 sm:py-12 lg:px-8 bg-white">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="text-center sm:text-left">
          <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
            Chào mừng, 404NFP
          </h1>

          <p class="mt-1.5 text-sm text-gray-500">
            Đây là giao diện trang cá nhân
          </p>
        </div>
      </div>
    </div>
  </header>

  <div class="flex flex-col md:flex-row  mx-auto">
    <!-- Sidebar (30% width on desktop) -->

    <div class="md:w-3/12 bg-white">
      <div class="p-4">
        <span
          class="block bg-gray-100 text-xs text-gray-600 rounded-lg px-3 py-2 mb-4"
          >404NFP</span
        >
        <ul class="space-y-4">
          <li>
            <a
              @click="activeInfor"
              :class="['block px-4 cursor-pointer py-2 text-sm font-medium text-gray-700 ', { 'bg-gray-100 rounded-lg hover:bg-gray-200': activeTab === 'infor' }]"
              >Thông tin cá nhân</a
            >
          </li>
          <li>
            <a
              @click="activeOrder"
              :class="['block px-4 cursor-pointer py-2 text-sm font-medium text-gray-700 ', { 'bg-gray-100 rounded-lg hover:bg-gray-200': activeTab === 'order' }]"

              >Đơn hàng</a
            >
          </li>
          <li>
            <a
              @click="activeFavourite"
              :class="['block px-4 cursor-pointer py-2 text-sm font-medium text-gray-700 ', { 'bg-gray-100 rounded-lg hover:bg-gray-200': activeTab === 'favourite' }]"

              >Sản phẩm yêu thích</a
            >
          </li>
        </ul>
      </div>
    </div>

    <!-- Main Content (70% width on desktop, full width on mobile) -->
    <div class="md:w-9/12 p-4">
      <div class="main">

        <!-- Thông tin cá nhân-->
        <div class="flow-root" v-if="isInfor">
          <dl class="-my-3 divide-y divide-gray-100 text-sm">
            <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Họ và tên</dt>
              <dd class="text-gray-700 sm:col-span-2">{{user.fullname}}</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Email</dt>
              <dd class="text-gray-700 sm:col-span-2">{{user.email}}</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Địa chỉ</dt>
              <dd class="text-gray-700 sm:col-span-2">{{ user.address }}</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Số điện thoại</dt>
              <dd class="text-gray-700 sm:col-span-2">{{user.numberphone}}</dd>
            </div>
          </dl>
        </div>
        <!--Thông tin đơn hàng-->

        <div class="overflow-x-auto" v-if="isOrder">
          <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead class="ltr:text-left rtl:text-right">
              <tr>
                <th
                  class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                >
                  STT
                </th>
                <th
                  class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                >
                Tên khách hàng
                </th>

                <th
                  class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                >
                Hình thức thanh toán
                </th>

                <th
                  class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                >
                  Ngày đặt
                </th>
                <th
                  class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                >
                  Tổng thanh toán
                </th>
                <th
                  class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                >
                  Trạng thái đơn hàng
                </th>

                <th class="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              <tr v-for="(order,index) in orders.filter((item)=>item.user.id == user.id)">
              
                <td
                  class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                >
                 {{index +1 }}
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                 {{ order.user.fullname }}
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                 {{ order.payment }}
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                  {{ formatTime(order.created_at)}}
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                  {{ formatPrice(order.total_order) }}
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                  {{ order.status }}
                </td>
                <td class="whitespace-nowrap px-4 py-2">
                  <a
                  @click="
                      getdetail(order.ods);
                      is_detail = true;
                    "
                    class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    Chi tiết
                  </a>
                </td>

                <td class="whitespace-nowrap px-4 py-2" v-if="order.status != 'Đã thanh toán' && order.status != 'Thanh toán thất bại' && order.status != 'Đã hủy'">
                  <a
                  @click="
                      changeDeleteOrder(order.id);
                    "
                    class="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                  >
                    Hủy
                  </a>
                </td>

              </tr>
            </tbody>
          </table>
        </div>

        <!--Sản phẩm yêu thích-->
        <div class="overflow-x-auto" v-if="isFavourite">
     
          <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead class="ltr:text-left rtl:text-right">
              <tr>
                <th
                  class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                >
                  STT
                </th>
                <th
                  class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                >
                Tên sản phẩm
                </th>
                <th class="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              <tr v-for="(favourite,index) in favourites.filter((item) =>item.user.id === user.id)">
                <td
                  class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                >
                  {{ index +1 }}
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                 {{ favourite.product.name_product }}
                </td>
                
                <td class="whitespace-nowrap px-4 py-2">
                  <a @click="gotoProduct(favourite.product)"
                    
                    class="cursor-pointer inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    Chi tiết
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>

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
                <th scope="col" class="px-4 py-4">STT</th>
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
                  {{ od.product.name_product}}
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
  <toast ref="toast"/>
</template>

<script>
  import favouriteController from "../../controllers/favourite.controller";
  import orderController from "../../controllers/order.controller"
  import extensiveController from "../../controllers/extensive.controller";
  import toast from "../../components/toast.component.vue";

export default {
  data() {
    return {
      activeTab: 'infor',
      isInfor: true, isOrder: false, isFavourite:false,
      user:'', favourites:[],orders:[],ods:[],is_detail:false
    };
  },
 async mounted() {
   this.user = JSON.parse(localStorage.getItem("user"))
   this.favourites =  ( await favouriteController.getFavourites()).data
   this.orders = (await orderController.getOrders()).data
  },
  components: {toast},
  methods: {
    activeInfor() {
      this.activeTab = 'infor'
      this.isInfor = true
      this.isOrder = false
      this.isFavourite = false
    },
    activeOrder() {
      this.activeTab = 'order'
      this.isInfor = false
      this.isFavourite = false
      this.isOrder = true 
    },

    activeFavourite() {
      this.activeTab = 'favourite'
      this.isInfor = false
      this.isOrder = false
      this.isFavourite = true
    },

    gotoProduct(product)
    {
      this.$router.push({name:'productdetail',params:{'id':product.id}})
    },

    getdetail(od)
    {
      this.ods = od
    },

    formatPrice(value) {
      return extensiveController.formatCurrency(value);
    },

    formatTime(value) {
      return extensiveController.formatTime(value);
    },

    async changeDeleteOrder(order)
    {
    const check ="HUY_2"
     const result = await  orderController.changeDelete(order,check);
     this.orders = (await orderController.getOrders()).data
     this.$refs.toast.showToast(result.data);

    }
  },
};
</script>
