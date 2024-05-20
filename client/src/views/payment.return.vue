<template>
  <section class=" py-2  ">
    <div class="max-w-5xl mx-auto py-16 bg-white ">
      <article class="overflow-hidden">
        <div class="bg-[url(https://mixivivu.com/section-background.png)] bg-cover bg-center bg-no-repeat rounded-b-md">
          <div class="p-9">
            <div class="space-y-6 text-slate-700">
              <p
                class="text-xl font-extrabold tracking-tight uppercase font-body"
              >
                404NFP 
              </p>
              <hr class=" h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-10">
              <p
                class="text-xl font-extrabold tracking-tight uppercase font-body text-center"
              >
                {{ message }}
              </p>
            </div>
          </div>

          <div class="pl-6 pr-6">
            <div class="flex w-full">
              <div class="sm:grid grid-cols-4 gap-12 block">
                <div class="text-sm font-light text-slate-500 ">
                  <p class="text-sm font-bold py-2 text-slate-700">
                    Thông tin khách hàng:
                  </p>
                  <p>{{ user.fullname }}</p>
                  <p>{{ user.email }}</p>
                  <p>{{ user.address }}</p>
                </div>

                <div class="text-sm font-light text-slate-500">
                  <p class="text-sm font-bold py-2 text-slate-700">
                    Mã thanh toán
                  </p>
                  <p>{{ this.$route.query.vnp_OrderInfo }}</p>
                </div>

                <div class="text-sm font-light text-slate-500">
                  <p class="text-sm font-bold py-2 text-slate-700">
                    Thời gian thanh toán
                  </p>
                  <p>{{ formatDate(this.$route.query.vnp_PayDate) }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="p-9">
            <div class="flex flex-col mx-0 mt-8">
              <table class="min-w-full divide-y divide-slate-500">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                    >
                      Tên sản phẩm
                    </th>
                    <th
                      scope="col"
                      class="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                    >
                      Số lượng
                    </th>
                    <th
                      scope="col"
                      class="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                    >
                      Giá
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="border-b border-slate-200"
                    v-for="cart in order.carts"
                  >
                    <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                      <div class="font-medium text-slate-700 sm:block hidden">
                        {{ cart.name_product }}
                      </div>
                      <div class="mt-0.5 text-slate-500 sm:hidden font-medium">
                        {{ cart.quantity }} - {{ cart.name_product }}
                      </div>
                    </td>
                    <td
                      class="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell"
                    >
                      {{ cart.quantity }}
                    </td>

                    <td
                      class="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0"
                    >
                      {{ formatPrice(cart.single_price) }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      scope="row"
                      colspan="3"
                      class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                    >
                      Tổng tiền
                    </th>
                    <th
                      scope="row"
                      class="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                    >
                      Tổng tiền
                    </th>
                    <td
                      class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0"
                    >
                      {{ formatPrice(this.$route.query.vnp_Amount / 100) }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div id="confirmation-bt" class="w-full">
            <button
              class="rounded-lg mb-5 p-3 px-6 w-full "
              @click="goHome()"
            >
              Về trang chủ
            </button>
          </div>

          <div class=" p-9">
            <div class="border-t pt-9 border-slate-200">
              <div class="text-sm font-light text-slate-700">
                <p>Cảm ơn quý khách đã sử dụng dịch vụ.</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import extensiveController from "../controllers/extensive.controller";
import orderController from "../controllers/order.controller";

export default {
  data() {
    return {
      user: "",
      order: "",
      coupon: "",
      check_create: JSON.parse(localStorage.getItem("check_create")),
      message: "1",
    };
  },
  async mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.order = JSON.parse(sessionStorage.getItem("order"));
    const check_payment = await this.getPayment();
    if (check_payment === `00`) {
      this.message = "Thanh toán thành công";
      const result = await orderController.updatePayment(
        this.order.id,
        this.$route.query.vnp_OrderInfo,
        this.$route.query.vnp_Amount,
        this.$route.query.vnp_PayDate,
        this.check_create
      );
      if (
      this.order.total_coupon ==
      this.order.total_order * this.coupon.coupon_percent/100
    ) {
      await orderController.changeCoupon(this.coupon.id,this.check_create)
    }
      localStorage.setItem("check_create", JSON.stringify(false));
    } else {
      this.message = "Thanh toán thất bại";
      await orderController.changeDelete(this.order.id,"HUY");
      console.log(check_payment);
      //this.$router.push("/");
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

    goHome()
    {
      window.location.href = `${import.meta.env.VITE_API_BASE_FE}`
    }
  },
};
</script>
