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
        <div
          class="flex flex-col rounded-lg bg-white sm:flex-row"
          v-for="product in carts"
        >
          <img
            class="m-2 h-24 w-28 rounded-md border object-cover object-center"
            :src="product.img"
            alt=""
          />
          <div class="flex w-full flex-col px-4 py-4">
            <span class="font-semibold">{{ product.name_product }}</span>
            <div class="flex items-center justify-between">
              <p class="text-lg font-bold">
                {{ formatPrice(product.single_price) }}
              </p>
              <p class="text-base font-bold">x {{ product.quantity }}</p>
            </div>
          </div>
        </div>
      </div>

      <!--view thanh toán-->
      <p class="mt-8 text-lg font-medium">Hình thức thanh toán</p>
      <div class="mt-5 grid gap-6">
        <!--COD-->
        <div class="relative">
          <input
            v-model="selectedPayment"
            value="COD"
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
              <span class="mt-2 font-semibold"
                >COD - Thanh toán khi nhận hàng</span
              >
              <p class="text-slate-500 text-sm leading-6">Giao siêu tốc</p>
            </div>
          </label>
        </div>

        <!--VN PAYMENT-->
        <div class="relative">
          <input
            v-model="selectedPayment"
            value="VNPAY"
            class="peer hidden"
            id="radio_2"
            type="radio"
            name="radio"
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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQULr3Ust3Yw-IS1KvGuHQFys81W1ava9Ohd8gduuRPXA&s"
              alt=""
            />
            <div class="ml-5">
              <span class="mt-2 font-semibold">VNPAY</span>
              <p class="text-slate-500 text-sm leading-6">Giao siêu tốc</p>
            </div>
          </label>
        </div>
      </div>
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
          disabled
            type="text"
            id="email"
            name="email"
            v-model="email"
            class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="infor@gmail.com"
          />
        </div>

        <!--fullname-->
        <div class="fullname">
          <label for="fullname" class="mt-4 mb-2 block text-sm font-medium"
            >Họ và tên</label
          >
          <input
          disabled
            type="text"
            id="fullname"
            v-model="fullname"
            name="fullname"
            class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Họ và tên"
          />
        </div>

        <!--address-->
        <div class="address">
          <label for="address" class="mt-4 mb-2 block text-sm font-medium"
            >Địa chỉ nhận hàng</label
          >
          <input
          disabled
            type="text"
            id="address"
            v-model="address"
            name="address"
            class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Địa chỉ nhận hàng"
          />
        </div>

        <!--numberphone-->
        <div class="numberphone">
          <label for="numberphone" class="mt-4 mb-2 block text-sm font-medium"
            >Số điện thoại</label
          >
          <input
          disabled
            type="text"
            id="numberphone"
            v-model="numberphone"
            name="numberphone"
            class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Số điện thoại"
          />
        </div>

        <!-- Total -->
        <div class="mt-6 border-t border-b py-2">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Tổng tiền</p>
            <p class="font-semibold text-gray-900">
              {{ formatPrice(total.finalPrice) }}
            </p>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-between">
          <p class="text-sm font-medium text-gray-900">Thanh toán</p>
          <p class="text-2xl font-semibold text-gray-900">
            {{ formatPrice(total.finalPrice) }}
          </p>
        </div>
      </div>
      <button
        @click="payment()"
        class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
      >
        Thanh toán
      </button>
    </div>
  </div>

  <!--choice bank option-->
  <div
    v-if="is_bank"
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
            Hình thức thanh toán VNPAY
          </h3>

          <button
            @click="is_bank = false"
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
          <div class="mt-5 grid gap-6">
            <!--COD-->
            <div class="relative">
              <input
                v-model="bank"
                value="VNBANK"
                class="peer hidden"
                id="radio_3"
                type="radio"
                name="radio"
                checked
              />
              <span
                class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"
              ></span>
              <label
                class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_3"
              >
                <img
                  class="w-14 object-contain"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQULr3Ust3Yw-IS1KvGuHQFys81W1ava9Ohd8gduuRPXA&s"
                  alt=""
                />
                <div class="ml-5">
                  <span class="mt-2 font-semibold"
                    >Thanh toán qua ATM-Tài khoản ngân hàng nội địa</span
                  >
                </div>
              </label>
            </div>

            <!--VN PAYMENT-->
            <div class="relative">
              <input
                v-model="bank"
                value="INTCARD"
                class="peer hidden"
                id="radio_4"
                type="radio"
                name="radio"
              />
              <span
                class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"
              ></span>
              <label
                class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_4"
              >
                <img
                  class="w-14 object-contain"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQULr3Ust3Yw-IS1KvGuHQFys81W1ava9Ohd8gduuRPXA&s"
                  alt=""
                />
                <div class="ml-5">
                  <span class="mt-2 font-semibold"
                    >Thanh toán qua thẻ quốc tế</span
                  >
                </div>
              </label>
            </div>
          </div>
        </div>

        <button
          @click="paymentVN()"
          class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
        >
          Thanh toán
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import cartController from "../../controllers/cart.controller";
import extensiveController from "../../controllers/extensive.controller";
import orderController from "../../controllers/order.controller";
export default {
  data() {
    return {
      carts: [],
      total: 0,
      user: null,
      email: "",
      fullname: "",
      address: "",
      numberphone: "",
      selectedPayment: "COD",
      bank: "VNBANK",
      is_bank: false,
    };
  },
  mounted() {
    this.getCart();
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.email = this.user.email;
      this.fullname = this.user.fullname;
      this.address = this.user.address;
      this.numberphone = this.user.numberphone;
    }
  },
  components: {},
  methods: {
    getCart() {
      this.carts = cartController.loadCartFromlocal();
      if (this.carts.length == 0) {
        this.$router.push({ name: "carts" });
      }
      this.total = JSON.parse(localStorage.getItem("total"));
    },
    formatPrice(value) {
      return extensiveController.formatCurrency(value);
    },

    async payment() {
      const formData = new FormData();

      formData.append("total_order", this.total.total_order);
      formData.append("total_coupon", this.total.total_coupoun);
      formData.append("total_bank", this.total.finalPrice);

      if (this.selectedPayment == "COD") {
        const result = await orderController.addPaymentCOD(
          formData,
          this.user.id
        );
        localStorage.removeItem("total");
        localStorage.removeItem("cart");
        window.location.href = `${import.meta.env.VITE_API_BASE_FE}payment_cod`;
        sessionStorage.setItem("order", JSON.stringify(result.data.order));
      } else {
        this.is_bank = true;
      }
    },

    async paymentVN() {
      const formData = new FormData();

      formData.append("total_order", this.total.total_order);
      formData.append("total_coupon", this.total.total_coupoun);
      formData.append("payment", this.selectedPayment);
      formData.append("bank", this.bank);

      const result = await orderController.addPaymentVN(formData, this.user.id);
      localStorage.removeItem("total");
      localStorage.removeItem("cart");
      const paymentUrl = result.data.redirectUrl;

      // Chuyển hướng đến trang thanh toán của VNPAY
      sessionStorage.setItem("order", JSON.stringify(result.data.order));
      localStorage.setItem(
        "check_create",
        JSON.stringify(result.data.check_create)
      );
      window.location.href = paymentUrl;
    },
  },
};
</script>
