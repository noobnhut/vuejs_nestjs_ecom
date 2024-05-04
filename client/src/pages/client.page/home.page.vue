<template>
  <!--section hero-->
  <section
    class="relative bg-[url(https://scr.vn/wp-content/uploads/2020/07/H%C3%ACnh-n%E1%BB%81n-Star-War-cho-desktop-scaled.jpg)] bg-cover bg-center bg-no-repeat"
  >
    <div
      class="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
    ></div>

    <div
      class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
    >
      <div class="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
        <h1 class="text-3xl font-extrabold sm:text-5xl">
          Let us find your

          <strong class="block font-extrabold text-gray-700">
            Forever Home.
          </strong>
        </h1>

        <p class="mt-4 max-w-lg sm:text-xl/relaxed text-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
          illo tenetur fuga ducimus numquam ea!
        </p>
      </div>
    </div>
  </section>

  <!--list product-->
  <Product />

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
            src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/3-anh-trang-den-meo-den-heinz-inkythuatso-02-16-05-21.jpg"
            class="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div class="lg:py-24">
          <h2 class="text-3xl font-bold sm:text-4xl">Grow your audience</h2>

          <p class="mt-4 text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui
            hic atque tenetur quis eius quos ea neque sunt, accusantium soluta
            minus veniam tempora deserunt? Molestiae eius quidem quam repellat.
          </p>
        </div>
      </div>
    </div>
  </section>
  <!--tin tức-->

  <!--contact-->
  <section id="contact" class="bg-white">
    <div class="p-8 md:p-8 lg:px-16 ">
      <div class="mx-auto max-w-lg text-center">
        <h2 class="text-2xl font-bold text-gray-900 md:text-3xl">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit
        </h2>

        <p class="hidden text-gray-500 sm:mt-4 sm:block">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae dolor
          officia blanditiis repellat in, vero, aperiam porro ipsum laboriosam
          consequuntur exercitationem incidunt tempora nisi?
        </p>
      </div>

      <div class="mx-auto mt-8 max-w-xl">
        <form action="#" class="sm:flex sm:gap-4">
          <div class="sm:flex-1">
            <label for="email" class="sr-only">Email</label>

            <input
              type="email"
              placeholder="Email address"
              class="w-full rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-gray-400"
            />
          </div>

          <button
            type="submit"
            class="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-gray-600 px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-gray-400 sm:mt-0 sm:w-auto"
          >
            <span class="text-sm font-medium"> Sign Up </span>

            <svg
              class="size-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </section>
  
 
</template>

<script>
import Product from "../../components/client/product.component.vue";

export default {
  data() {
    return {
     
    };
  },
  mounted() {},
  components: {
    Product,
   
  },
  methods: {
   
  },
};
</script>
