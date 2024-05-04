<template>
  <div class="product_view mt-5 mb-2">
    <div class="mx-auto max-w-lg text-center">
      <h2 class="text-2xl font-bold text-gray-600 md:text-3xl" v-if="isCatTitle2">
        DANH MỤC SẢN PHẨM A
      </h2>
      <p  @click="goProductByCat()"
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
              :src="product.images[0]"
              alt=""
              class="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
            />
            <img
              :src="product.images[1]"
              alt=""
              class="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
            />
          </div>

          <div class="relative bg-white p-3">
            <!-- Product details -->
            <h3
              @click="goToDetail()"
              class="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4 cursor-pointer"
            >
              {{ product.name }}
            </h3>

            <div class="mt-1.5 flex items-center justify-between text-gray-900">
              <p class="tracking-wide">{{ product.price }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isCatTitle: {
      type:Boolean,
      default() {
      return true
    }
    },

    isCatTitle2: {
      type:Boolean,
      default() {
      return true
    }
    },
  },
  data() {
    return {
      products: [
        {
          name: "Limited Edition Sports Trainer",
          price: "$189.99",
          images: [
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
          ],
        },
        {
          name: "Limited Edition Sports Trainer",
          price: "$189.99",
          images: [
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
          ],
        },
        {
          name: "Limited Edition Sports Trainer",
          price: "$189.99",
          images: [
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
          ],
        },
        {
          name: "Limited Edition Sports Trainer",
          price: "$189.99",
          images: [
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
          ],
        },
      ],
    };
  },

  mounted() {},
  components: {},
  methods: {
    goProductByCat() {
      this.$router.push('/category/haymotaido')
    },
    goToDetail(){
      this.$router.push('/products/haymotaido')
    }
  },
};
</script>
