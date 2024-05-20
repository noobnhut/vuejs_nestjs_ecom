<template>
  <div
    class="m-1 overflow-y-auto overflow-x-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center z-[100]"
  >
    <div
      class="relative w-screen max-w-sm rounded-xl bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
      aria-modal="true"
      role="dialog"
      tabindex="-1"
    >
      <!--nút đóng-->
      <button
        @click="onclose()"
        class="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
      >
        <span class="sr-only">Close cart</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div class="mt-4 space-y-6">
        <!--list sản phẩm mua-->
        <template v-if="carts.length == 0">
          <div class="cart--empty-message py-4 text-center">
            <img
              src="https://nghiphat.com/images/empty_cart.png"
              class="mx-auto"
              alt=""
            />
            <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
          </div>
        </template>
        <ul class="space-y-4">
          <li class="flex items-center gap-4" v-for="(product, index) in carts">
            <img
              :src="product.img"
              alt=""
              class="size-16 rounded object-cover"
            />

            <div>
              <h3 class="text-sm text-gray-900">{{ product.name_product }}</h3>
            </div>

            <div class="flex flex-1 items-center justify-end gap-2">
              <div>
                <label for="Line1Qty" class="sr-only"> Quantity </label>
                <ol class="flex justify-center gap-1 text-xs font-medium">
                  <!--decrease-->
                  <li @click="handlePage(index, 'decrease')">
                    <a
                      class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    >
                      <span class="sr-only">Prev Page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>

                  <!-- input value-->
                  <input
                    type="number"
                    min="1"
                    :value="product.quantity"
                    disabled
                    id="Line1Qty"
                    class="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  />

                  <!--increase-->
                  <li @click="handlePage(index, 'increase')">
                    <a
                      class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    >
                      <span class="sr-only">Next Page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                </ol>
              </div>

              <button
                class="text-gray-600 transition hover:text-red-600"
                @click="deleteItem(index)"
              >
                <span class="sr-only">Remove item</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </li>
        </ul>

        <!--các lựu chọn nè-->
        <div class="space-y-4 text-center">
          <router-link
            to="/carts"
            @click="onclose"
            class="block rounded cursor-pointer border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
          >
            Xem giỏ hàng ({{sum_item }})
          </router-link>

          <router-link
            to="/"
            @click="onclose()"
            class="inline-block cursor-pointer text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
          >
            Tiếp tục mua sắm
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <toast ref="toast"></toast>
</template>

<script>
import toast from "../toast.component.vue"
import cartController from "../../controllers/cart.controller";
export default {
  emits: ["cancel"],
  data() {
    return {
      carts: [],
      sum_item:0
    };
  },
  mounted() {
    this.getCart();
  },
  components: {toast},
  methods: {
    onclose() {
      this.$emit("cancel");
    },

    getCart() {
      this.carts = cartController.loadCartFromlocal();
      this.getValue()
    },

    deleteItem(index) {
      cartController.removeItem(index);
      this.getCart();
      this.getValue()
    },

    handlePage(index, value) {
      if (value == "increase") {
        cartController.increaseQuantity(index,this.$refs);
        this.getCart();
      } else if (value == "decrease") {
        cartController.decreaseQuantity(index,this.$refs);
        this.getCart();
      }
      this.getValue()

    },

    getValue() {
      let sum = 0;
      let carts = JSON.parse(localStorage.getItem("cart"));

      if (carts) {
        for (let i = 0; i < carts.length; i++) {
          sum += carts[i].quantity;
        }
      } else {
        sum = 0
      }

     this.sum_item = sum
    },
  },
};
</script>
