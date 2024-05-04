<template>
  <div class="grid sm:px-10 lg:grid-cols-2 bg-white opacity-75">

    <!--view chi tiết + hình thức giao hang thanh toán-->
    <div class="px-4 pt-8">
      <p class="text-xl font-medium">Chi tiết hóa đơn</p>
      <p class="text-gray-400">
        Kiểm tra lại tổng hóa đơn của bạn trước khi thanh toán
      </p>
      <!--view product list buy-->
      <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
        <div class="flex flex-col rounded-lg bg-white sm:flex-row">
          <img
            class="m-2 h-24 w-28 rounded-md border object-cover object-center"
            src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
          <div class="flex w-full flex-col px-4 py-4">
            <span class="font-semibold"
              >Nike Air Max Pro 8888 - Super Light</span
            >
            <p class="text-lg font-bold">4 triệu</p>
          </div>
        </div>
      </div>

      <!--view thanh toán-->
      <p class="mt-8 text-lg font-medium">Hình thức thanh toán</p>
      <form class="mt-5 grid gap-6">
        <!--COD-->
        <div class="relative">
          <input
            class="peer hidden"
            id="radio_1"
            type="radio"
            name="radio"
            checked
          />
          <span
            class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"
          ></span>
          <label
            class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            for="radio_1"
          >
            <img
              class="w-14 object-contain"
              src="https://baobihuuco.com/wp-content/uploads/2019/04/icon-giao-hang-toan-quoc.jpg"
              alt=""
            />
            <div class="ml-5">
              <span class="mt-2 font-semibold">COD - Thanh toán khi nhận hàng</span>
              <p class="text-slate-500 text-sm leading-6">Giao siêu tốc</p>
            </div>
          </label>
        </div>

        <!--ZALO PAYMENT-->
        <div class="relative">
          <input
            class="peer hidden"
            id="radio_2"
            type="radio"
            name="radio"
            checked
          />
          <span
            class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"
          ></span>
          <label
            class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            for="radio_2"
          >
            <img
              class="w-14 object-contain"
              src="https://cdn.tgdd.vn/2020/04/GameApp/image-180x180.png"
              alt=""
            />
            <div class="ml-5">
              <span class="mt-2 font-semibold">Zalo Payment</span>
              <p class="text-slate-500 text-sm leading-6">Giao siêu tốc</p>
            </div>
          </label>
        </div>
      </form>
    </div>

    <!--thông tin cá nhân + tiền thanh toán-->
    <div class="mt-10 px-4 pt-8 lg:mt-0">
      <p class="text-xl font-medium">Thông tin khách hàng</p>
      <p class="text-gray-400">
        Kiểm tra thông tin cá nhân và địa chỉ trước khi đặt hàng
      </p>
      <div class="information_user">
        
        <!--email-->
        <div class="email">
          <label for="email" class="mt-4 mb-2 block text-sm font-medium"
          >Email</label
        >
          <input
            type="text"
            id="email"
            name="email"
            class="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="infor@gmail.com"
          />
        </div>

        <!--fullname-->
        <div class="fullname">
          <label for="fullname" class="mt-4 mb-2 block text-sm font-medium"
          >Họ và tên</label
        >
          <input
            type="text"
            id="fullname"
            name="fullname"
            class="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Họ và tên"
          />
        </div>

         <!--address-->
         <div class="address">
          <label for="address" class="mt-4 mb-2 block text-sm font-medium"
          >Địa chỉ nhận hàng</label
        >
          <input
            type="text"
            id="address"
            name="address"
            class="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Địa chỉ nhận hàng"
          />
        </div>

        <!--numberphone-->
        <div class="numberphone">
          <label for="numberphone" class="mt-4 mb-2 block text-sm font-medium"
          >Số điện thoại</label
        >
          <input
            type="text"
            id="numberphone"
            name="numberphone"
            class="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Số điện thoại"
          />
        </div>

        <!-- Total -->
        <div class="mt-6 border-t border-b py-2">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Tổng tiền</p>
            <p class="font-semibold text-gray-900">4 triệu</p>
          </div>
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Phí ship</p>
            <p class="font-semibold text-gray-900">10 triệu</p>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-between">
          <p class="text-sm font-medium text-gray-900">Thanh toán</p>
          <p class="text-2xl font-semibold text-gray-900">14 triệu</p>
        </div>
      </div>
      <button
        class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
      >
        Thanh toán
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  components: {},
  methods: {},
};
</script>
