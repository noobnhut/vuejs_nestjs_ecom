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
        <a class="group block overflow-hidden shadow-xl">
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
            </div>
          </div>
        </a>
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
      :class="{'bg-gray-600 text-white': pageNumber === page_number}"
      class="block size-8 rounded border-gray-600  text-center leading-8  cursor-pointer"
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
</template>

<script>
import extensiveController from "../../controllers/extensive.controller";
import productController from "../../controllers/product.controller";

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
      last_page: "",
      page_number: 1,
    };
  },

  mounted() {
    this.getProducts();
  },
  components: {},
  methods: {
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
    formatPrice(value) {
      return extensiveController.formatCurrency(value);
    },
  },
};
</script>
