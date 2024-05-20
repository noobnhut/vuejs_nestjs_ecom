<template>
  <!--section hero-->
  <section
    class="relative bg-[url(https://blogchiasekienthuc.com/wp-content/uploads/2022/12/hinh-nen-may-tinh-fantasy-4k-blogchiasekienthuc.com-12-scaled.jpg)] bg-cover bg-center bg-no-repeat"
  >
    <div
      class="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
    ></div>

    <div
      class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
    >
      <div class="max-w-xl ltr:sm:text-left rtl:sm:text-right">
        <h1 class="text-3xl font-extrabold sm:text-5xl">
          <span class="text-white">404NFP</span> Bàn phím cơ

          <strong class="block font-extrabold text-white mt-2">
            Chẳng có gì ngoài bàn phím
          </strong>
        </h1>
      </div>
    </div>
  </section>

  <!--list product-->
  <div v-for="cat in cats">
    <Product :cat="cat" page="1" limit="4" />
  </div>

  <!--về chúng tôi-->
  <section id="about" class="bg-white">
    <div
      class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div
          class="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full"
        >
          <img
            alt=""
            src="https://www.tncstore.vn/image/catalog/nh%20b%C3%A0i%20vi%E1%BA%BFt%20bmin/tnc-store-top-5-ban-phim-co-tot-nhat%20(2).jpg"
            class="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div class="lg:py-24">
          <h2 class="text-3xl font-bold sm:text-4xl">Về chúng tôi</h2>

          <p class="mt-4 text-gray-600">
            Với đội ngũ nhân viên tận tâm và chuyên nghiệp, chúng tôi sẵn lòng
            hỗ trợ bạn trong việc chọn lựa sản phẩm phù hợp nhất với nhu cầu và
            mong muốn của bạn. Không chỉ là một cửa hàng, chúng tôi là một cộng
            đồng của những người yêu thích bàn phím, chia sẻ kiến thức và kinh
            nghiệm để cùng nhau phát triển.
          </p>
        </div>
      </div>
    </div>
  </section>
  <!--tin tức-->


</template>

<script>
import Product from "../../components/client/product.component.vue";
import catController from "../../controllers/category.controller";
export default {
  data() {
    return {
      cats: [],
    };
  },
  mounted() {
    this.getCat();
  },
  components: {
    Product,
  },
  methods: {
    async getCat() {
      const result = await catController.getByProduct();
      this.cats = result.data;
    },
  },
};
</script>
