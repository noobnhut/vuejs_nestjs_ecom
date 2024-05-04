<template>
  <header>
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 bg-white">
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

  <div class="flex flex-col md:flex-row h-[350px] mx-auto">
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

              >Giỏ hàng</a
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
              <dd class="text-gray-700 sm:col-span-2">404NFP TEAM</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Email</dt>
              <dd class="text-gray-700 sm:col-span-2">John Frusciante</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Địa chỉ</dt>
              <dd class="text-gray-700 sm:col-span-2">Guitarist</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Số điện thoại</dt>
              <dd class="text-gray-700 sm:col-span-2">$1,000,000+</dd>
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
              <tr>
                <td
                  class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                >
                  1
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                  404NFP
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                  23/2/2222
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                  20,000
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                  Đã đặt
                </td>
                <td class="whitespace-nowrap px-4 py-2">
                  <a
                    
                    class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    Chi tiết
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
              <tr>
                <td
                  class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                >
                  1
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                  404NFP
                </td>
                
                <td class="whitespace-nowrap px-4 py-2">
                  <a
                    
                    class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
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
</template>

<script>
export default {

  data() {
    return {
      activeTab: 'infor',
      isInfor: true, isOrder: false, isFavourite:false
    };
  },
  mounted() {
   
  },
  components: {},
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
    }
  },
};
</script>
