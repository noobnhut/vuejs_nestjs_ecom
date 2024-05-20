<template>
  <div class="px-4 py-4">
    <!--filter-->

    <div class="space-y-2 w-[300px] ml-auto">
    <!--price-->
    <div class="max-w-sm mx-auto">

  <select v-model="check" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option disabled value="new">Bộ lọc sản phẩm</option>
    <option value="new">Mới nhất</option>
    <option value="asc">Giá tăng dần</option>
    <option value="desc">Giá giảm dần</option>
  </select>
</div>
  </div>
    
    <template v-if="check=='new'">
      <div v-for="cat in cats.filter(item=>item.id == this.$route.params.id)">
      <Product :isCatTitle="false" :cat=cat page="1" limit="8" check="new"/>
    </div>
    </template>
    
    <template v-if="check=='desc'">
      <div v-for="cat in cats.filter(item=>item.id == this.$route.params.id)">
      <Product :isCatTitle="false" :cat=cat page="1" limit="8" check="desc"/>
    </div>
    </template>

    <template v-if="check=='asc'">
      <div v-for="cat in cats.filter(item=>item.id == this.$route.params.id)">
      <Product :isCatTitle="false" :cat=cat page="1" limit="8" check="asc"/>
    </div>
    </template>
  </div>
</template>

<script>
import Product from "../../components/client/product.component.vue";
import categoryController from "../../controllers/category.controller";

export default {
  data() {
    return {
      cats:[],
      check:"new"
    };
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
    },
    setCheck(value) {
      this.check = value;
    }
  },
};
</script>
