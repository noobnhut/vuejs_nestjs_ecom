<template>
  <!-- component -->
  <section class="text-gray-700 body-font overflow-hidden">
    <!--detail product-->
    <div class="container px-5 py-10">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img
          alt="ecommerce"
          class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
          src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/3-anh-trang-den-meo-den-heinz-inkythuatso-02-16-05-21.jpg"
        />

        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest">
            Tên danh mục
          </h2>

          <h1 class="text-gray-900 text-3xl title-font font-medium mb-10">
            Sản phẩm gì đó nè
          </h1>

          <p class="leading-relaxed mb-10">
            Mô tả quá trời mô tả cho 1 sản phẩm lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quam debitis maxime molestias odio
            accusantium similique, reiciendis asperiores alias atque. Aliquam.
          </p>

          <div class="flex">
            <span class="title-font font-medium text-2xl text-gray-900 mb-10"
              >Giá sản phẩm: 50.000.000</span
            >
          </div>
          // chổ này để cái tăng giảm sl sp ? t chỉ sau
          <button
            type="button"
            class="mb-2 text-white bg-gray-500 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xl px-10 py-2 w-full text-center"
          >
            Đặt hàng
          </button>

          <button
            type="button"
            class="text-white bg-gray-500 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xl px-10 py-2 w-full text-center"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>

    <!--chuyen doi tab-->
    <div
    class="text-sm mb-2 font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul class="flex flex-wrap">
      <li class="mr-2 cursor-pointer ">
        <a @click="activeHotel()"
          :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', { 'text-gray-600 border-gray-600 rounded-t-lg font-bold bg-gray-100': activeTab === 'active' }]"
          class=" active inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Hình ảnh sản phẩm</a>
      </li>
      <li class="mr-2 cursor-pointer">
        <a @click="unActiveHotel()"
          :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', { 'text-gray-600 border-gray-600 rounded-t-lg font-bold bg-gray-100': activeTab === 'unactive' }]"
          class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Đánh giá sản phẩm</a>
      </li>

    </ul>
  </div>
  
    <!--list image-->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2" v-if="isActive">
       <div class="img_detail ">
        <img
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
          alt=""
        />
      </div>

       <div class="img_detail ">
        <img
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
          alt=""
        />
      </div>

       <div class="img_detail ">
        <img
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
          alt=""
        />
      </div>

      <div class="img_detail ">
        <img
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
          alt=""
        />
      </div>

      <div class="img_detail ">
        <img
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
          alt=""
        />
      </div>

      <div class="img_detail ">
        <img
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
          alt=""
        />
      </div>
    </div>

    <!--list đánh giá sp-->
    <div v-if="isUnActive">
    <Review/>
    </div>

    
    <!--list sản phâm tương tự-->
    <div
    class="text-sm mb-2 mt-4 font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul class="flex flex-wrap">
      <li class="mr-2 cursor-pointer ">
        <a 
          class=" active inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 text-gray-600 border-gray-600  font-bold bg-gray-100">Sản phẩm tương tự</a>
      </li>
    </ul>
  </div>

  <Product :isCatTitle="false" :isCatTitle2="false"/>
  </section>

</template>
<script>
import Product from "../../components/client/product.component.vue";
import Review from "../../components/client/review.component.vue"
export default {

  data() {
    return {
     activeTab: 'active',
      isActive: true, isUnActive: false, 
    };
  },
  mounted() {
   
  },
  components: {Product,Review},
  methods: {
    activeHotel() {
      this.activeTab = 'active'
      this.isActive = true
      this.isUnActive = false
    },
    unActiveHotel() {
      this.activeTab = 'unactive'
      this.isActive = false
      this.isUnActive = true 
    },
  },
};
</script>
