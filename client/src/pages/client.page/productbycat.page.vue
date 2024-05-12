<template>
  <div class="px-4 py-4">
    <!--filter-->

    <div class="space-y-2 w-[300px] ml-auto">
      <!--price-->
      <details
        class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary
          class="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
        >
          <span class="text-sm font-medium"> Bộ lọc </span>

          <span class="transition group-open:-rotate-180">
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
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>

        <div class="border-t border-gray-200 bg-white ">
          <div class="border-t border-gray-200 p-4">
            <div class="gap-4">
            <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mới nhất</a>
            <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Giá tăng dần</a>
            <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Giá giảm nhất</a>
            </div>
          </div>

          
        </div>
        
      </details>
    </div>
    
    <div v-for="cat in cats.filter(item=>item.id == this.$route.params.id)">
      <Product :isCatTitle="false" :cat=cat page="1" limit="2"/>
    </div>
    
  </div>
</template>

<script>
import Product from "../../components/client/product.component.vue";
import categoryController from "../../controllers/category.controller";

export default {
  data() {
    return {cats:[]};
  },
  mounted() {
    this.getCat()
  },
  components: { Product },
  methods: {
    async getCat()
    {
      const result = await categoryController.getCats()
      this.cats = result.data
    }
  },
};
</script>
