<template>
  <div class="product_view mt-5 mb-2">
    <div class="mx-auto max-w-lg text-center">
      <h2
        class="text-2xl font-bold text-gray-600 md:text-3xl"
        v-if="isCatTitle2"
      >
        DANH MỤC SẢN PHẨM {{ cat.name_cat.toUpperCase() }}
      </h2>
      <p
        @click="goProductByCat()"
        class="font-bold text-gray-400 underline cursor-pointer text-sm md:text-base"
        v-if="isCatTitle"
      >
        Xem thêm
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4">
      <!-- render list product -->
      <div v-for="(product, index) in products" :key="index">
        <div
          class="group block overflow-hidden shadow-xl"
          v-if="product.imgs.length > 0">
          <div class="relative h-[250px] sm:h-[300px]">
            <!-- Product images -->
            <img
              :src="product.imgs[0].img_url"
              alt=""
              class="absolute inset-0 h-full w-full object-cover opacity-100"
            />
          </div>

          <div class="relative bg-white p-3">
            <!-- Product details -->
            <h3
              @click="goToDetail(product.id)"
              class="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4 cursor-pointer"
            >
              {{ product.name_product }}
            </h3>

            <div class="mt-1.5 flex items-center justify-between text-gray-900">
              <p class="tracking-wide">{{ formatPrice(product.price) }}</p>
              <!--nut mua hang -->
              <div
                @click="addCart(product)"
                class="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-2 hover:bg-gray-100"
              >
                <div class="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    />
                  </svg>
                </div>
              </div>

              <div class="ml-auto" v-if="user != null">
                <span
                  v-if="
                    favourites.some(
                      (item) =>
                        item.product.id == product.id && item.user.id == user.id
                    )
                  "
                >
                  <!-- Sử dụng v-for để lặp lại các sản phẩm trong danh sách thích -->
                  <span
                    v-for="favourite in favourites.filter(
                      (item) =>
                        item.product.id == product.id && item.user.id == user.id
                    )"
                  > 
                 
                    <!-- Kiểm tra trạng thái của sản phẩm và sử dụng màu đỏ hoặc #ccc tương ứng -->
                    
                    <i v-if="favourite.status == true"
                      class="fa-solid fa-bookmark text-xl text-black"
                      
                      @click="unfavourite(favourite, product.id)"
                    ></i>
                  </span>
                </span>
                <!-- Nếu không có sản phẩm nào trong danh sách thích, hiển thị chữ màu #ccc -->
                <span v-else>
                  <i
                    class="fa-solid fa-bookmark text-xl"
                    style="color: #ccc"
                    @click="addfavourite(product.id)"
                  ></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--pagination-->
  <ol class="flex justify-center gap-1 text-xs font-medium" v-if="!isCatTitle">
    <!--prev-->
    <li @click="handlePage('prev')">
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

    <li
      v-for="pageNumber in last_page"
      :key="pageNumber"
      @click="changePage(pageNumber)"
      :class="{ 'bg-gray-600 text-white': pageNumber === page_number }"
      class="block size-8 rounded border-gray-600 text-center leading-8 cursor-pointer"
    >
      {{ pageNumber }}
    </li>

    <!--next-->
    <li @click="handlePage('next')">
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

  <MiniCart @cancel="openCart()" v-if="isOpenCart" />
</template>

<script>
import MiniCart from "./minicart.component.vue";
import extensiveController from "../../controllers/extensive.controller";
import productController from "../../controllers/product.controller";
import cartController from "../../controllers/cart.controller";
import favouriteController from "../../controllers/favourite.controller";
export default {
  props: {
    isCatTitle: {
      type: Boolean,
      default() {
        return true;
      },
    },

    isCatTitle2: {
      type: Boolean,
      default() {
        return true;
      },
    },

    cat: {},

    page: {},

    limit: {},
  },

  data() {
    return {
      products: [],
      favourites: [],
      user: "",
      last_page: "",
      page_number: 1,
      isOpenCart: false,
      newItem: {
        id_product: 0,
        name_product: "",
        single_price: 0,
        quantity: 1,
        real_quantity: 1,
        img: "",
      },
    };
  },

  mounted() {
    this.getProducts();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getFavouti();
  },
  components: { MiniCart },
  methods: {
    openCart() {
      this.isOpenCart = !this.isOpenCart;
    },

    async getFavouti() {
      const result = await favouriteController.getFavourites();
      this.favourites = result.data;
    },

    async unfavourite(favoutire, productid) {
      const id_user = favoutire.user.id;

      const result = await favouriteController.addfavoutires(
        id_user,
        productid
      );
      this.getFavouti()
    },

    async addfavourite(productid) {
      const id_user = this.user.id;
      const result = await favouriteController.addfavoutires(
        id_user,
        productid
      );
        this.getFavouti();
      
    },

    async getProducts() {
      const result = await productController.getProductByCat(
        this.cat.id,
        this.page,
        this.limit
      );
      this.products = result.data.products;
      this.last_page = result.data.lastPage;

    },

    async changePage(pageNumber) {
      this.page_number = pageNumber;
      const result = await productController.getProductByCat(
        this.cat.id,
        pageNumber,
        this.limit
      );
      this.products = result.data.products;
      this.last_page = result.data.lastPage;
    },

    async handlePage(value) {
      if (value == "next" && this.page_number < this.last_page) {
        this.page_number++;
      } else if (value == "prev" && this.page_number > 1) {
        this.page_number--;
      }
      const result = await productController.getProductByCat(
        this.cat.id,
        this.page_number,
        this.limit
      );
      this.products = result.data.products;
      this.last_page = result.data.lastPage;
    },

    goProductByCat() {
      this.$router.push(`/category/${this.cat.id}`);
    },

    goToDetail(id) {
      this.$router.push(`/products/${id}`);
    },

    addCart(product) {
      this.newItem.img = product.imgs[0].img_url;
      this.newItem.id_product = product.id;
      this.newItem.name_product = product.name_product;
      this.newItem.single_price = product.price;
      this.newItem.real_quantity = product.real_quantity;
      cartController.addItem(this.newItem);
      this.openCart();
    },

    formatPrice(value) {
      return extensiveController.formatCurrency(value);
    },
  },
};
</script>
