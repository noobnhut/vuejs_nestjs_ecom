<template>
  <section class="opacity-75">
    <div class=" bg-white   mx-auto max-w-screen-xl px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <header class="">
          <h1 class="text-xl font-bold text-gray-900 sm:text-3xl">Giỏ hàng</h1>
        </header>

        <div class="mt-8">
          
          <template v-if="carts.length == 0">
          <div class="cart--empty-message  py-4 text-center">
            <img src="https://nghiphat.com/images/empty_cart.png" class="mx-auto" alt="">
            <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
          </div>
        </template>

        <!--danh sách sản phẩm mua-->
          <ul class="space-y-4" v-for="(product,index) in carts">
            <li class="flex items-center gap-4">
              <img
                :src="product.img"
                alt=""
                class="size-16 rounded object-cover"
              />

              <div>
                <h3 class="text-base font-bold text-gray-900">
                  {{ product.name_product }}
                </h3>

                <dl class="mt-0.5 space-y-px text-sm text-gray-600">
                  <div>
                    <dt class="inline mr-2">Giá:</dt>
                    <dd class="inline">{{ formatPrice(product.single_price) }}</dd>
                  </div>
                </dl>
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

          <!--total price-->
          <div v-if="carts.length > 0" class="mt-8 flex justify-end border-t border-gray-100 pt-8">
            <div class="w-screen max-w-lg space-y-4">

                <!--form discord-->
              <div  class="sm:flex sm:gap-4">

                <div class="sm:flex-1">
                  <input
                    type="text"
                    placeholder="Nhập mã khuyến mãi"
                    class="w-full rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-gray-400"
                  />
                </div>

                <button
                  type="submit"
                  class="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-gray-700 px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-gray-400 sm:mt-0 sm:w-auto"
                >
                  <span class="text-sm font-medium"> Nhập mã</span>
                </button>

              </div>

              <dl class="space-y-0.5 text-sm text-gray-700">
                <div class="flex justify-between">
                  <dt>Tổng giá</dt>
                  <dd>{{ formatPrice( totalPrice) }}</dd>
                </div>

                <div class="flex justify-between">
                  <dt>Discount</dt>
                  <dd>{{ formatPrice( discount) }}</dd>
                </div>

                <div class="flex justify-between !text-base font-medium">
                  <dt>Tổng tiền</dt>
                  <dd>{{ formatPrice( finalPrice) }}</dd>
                </div>
              </dl>

              <div class="flex justify-end"></div>

              <div class="flex justify-end">
                <a
                  class="block rounded cursor-pointer bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                >
                  Thanh toán
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import cartController from '../../controllers/cart.controller';
import extensiveController from '../../controllers/extensive.controller'
export default {
  data() {
    return {
      carts:[],
      totalPrice:0,
      discount:0,
      finalPrice:0
    };
  },
  mounted() {
    this.getCart();
    
  },
  components: {},
  methods: {
    getCart() {
      this.carts = cartController.loadCartFromlocal();
      this.getPrice()
      this.getFinalPrice()
    },
    formatPrice(value)
    {
      return extensiveController.formatCurrency(value)
    },
    deleteItem(index) {
      cartController.removeItem(index);
      this.getCart();
    },

    handlePage(index, value) {
      if (value == "increase") {
        cartController.increaseQuantity(index);
        this.getCart();
      } else if (value == "decrease") {
        cartController.decreaseQuantity(index);
        this.getCart();
      }
    },

    getPrice()
    {
      let totalPrice = 0;
      
      for(let i = 0;i<this.carts.length;i++)
      {
        totalPrice += this.carts[i].single_price * this.carts[i].quantity;
      }

      this.totalPrice = totalPrice;
    },

    getFinalPrice()
    {
      this.finalPrice = this.totalPrice - this.discount
    }

  },
};
</script>
