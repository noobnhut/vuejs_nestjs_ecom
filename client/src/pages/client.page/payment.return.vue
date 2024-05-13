<template>
  <div class="container mx-auto mt-[100px]">
    <div id="container" class="grid grid-cols-1 md:grid-cols-3 tracking-wide">
      <div
        id="order-summary-card"
        class="h-full col-start-2 py-5 place-self-center items-center md:py-3 px-3"
      >
        <div id="hero-image" class="">
          <img
            src="https://i.pinimg.com/originals/24/71/dc/2471dc26a5996f7102394061d105bf75.jpg"
            alt=""
            srcset=""
            class="w-full rounded-t-lg"
          />
        </div>
        <div
          id="card-body"
          class="grid grid-cols-1 justify-items-center px-20 py-10 bg-white rounded-b-lg shadow-2xl"
        >
          <div id="order-title">
            <h1 class="text-xl font-bold">Thông báo thanh toán</h1>
          </div>

          <div id="order-description" class="grid grid-cols-1">
            <p
              class="text-center text-sm text-gray-600 pt-2 pb-6 tracking-normal"
            >
              Cảm ơn bạn đã sử dụng dịch vụ,<br />
              đây là kết quả thanh toán của bạn.
            </p>
          </div>

          <div id="order-item" class="rounded-lg mb-10">
            <ol class="list-disc">
              <li>Họ và tên: {{ user.fullname }}</li>
              <li>Email: {{ user.email }}</li>
              <li>Mã giao dịch: {{ this.$route.query.vnp_OrderInfo }}</li>
              <li>
                Số tiền:
                {{ formatPrice(this.$route.query.vnp_Amount / 100) }}
              </li>
              <li>
                Thời gian: {{ formatDate(this.$route.query.vnp_PayDate) }}
              </li>
            </ol>
          </div>

          <div id="confirmation-bt" class="w-full">
            <button
              class="rounded-lg mb-5 p-3 px-6 w-full shadow-2xl"
              @click="goHome()"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import extensiveController from "../../controllers/extensive.controller";
import orderController from "../../controllers/order.controller";

export default {
  data() {
    return {
      user: "",
      order: "",
      check_create: "",
    };
  },
  async mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.order = JSON.parse(localStorage.getItem("order"));
    this.check_create = JSON.parse(localStorage.getItem("check_create"));
    const check_payment = await this.getPayment();
    if (check_payment === `00`) {
      orderController.updatePayment(
        this.order.id,
        this.$route.query.vnp_OrderInfo,
        this.$route.query.vnp_Amount,
        this.$route.query.vnp_PayDate,
        this.check_create
      );

      console.log("xong");
    } else {
      this.$router.push("/");
    }
  },
  components: {},
  methods: {
    formatPrice(value) {
      return extensiveController.formatCurrency(value);
    },

    formatDate(value) {
      return extensiveController.formatTime(value);
    },

    async getPayment() {
      const result = await orderController.getPayment(this.$route.query);
      return result.data.code;
    },
  },
};
</script>
