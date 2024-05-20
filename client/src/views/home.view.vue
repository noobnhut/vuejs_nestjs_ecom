<template>
  <!-- navbar -->
  <div class="fixed top-0 w-full z-20 bg-white" @click="getProfile()">
    <div class="border shadow-md py-3 px-6">
      <!--header 1-->
      <div class="flex justify-between">
        <!--logo-->
        <router-link to="/" class="flex items-center cursor-pointer">
          <span class="ml-2 font-semibold text-[#252C32] text-xl tracking-wider">404NFP</span></router-link>

        <div class="ml-8 hidden md:flex flex-1 gap-x-3">
          <!--danh mục sản phẩm-->
          <div class="relative">
            <div class="flex cursor-pointer select-none items-center gap-x-2 rounded-md border bg-gray-100 py-2 px-4"
              @click="openMenu = !openMenu">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span class="text-sm font-medium w-max">Danh mục sản phẩm</span>
            </div>
            <!-- Dropdown menu -->
            <div v-show="openMenu" v-for="cat in cats"
              class="absolute  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <!-- Các mục trong dropdown -->
              <a  @click="gotoCat(cat.id);openMenu=false" class=" cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{{ cat.name_cat }}</a >
            </div>
          </div>
          <!--thanh search-->
          <input type="text" class="md:block hidden w-full rounded-md border border-[#DDE2E4] px-3 py-2 text-sm"
            placeholder="Tìm kiếm sản phẩm ..." v-on:keyup.enter="submit()" v-model="search_value"/>
        </div>

        <!--icon + login-->
        <div class="ml-2 flex" >
          <div class="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-2 hover:bg-gray-100">
            <router-link to="/informations" class="relative" v-if="user != null">
              <i class="fa-solid fa-user h-5 w-5 text-gray-500"></i>
            </router-link>
          </div>

          <div class="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-2 hover:bg-gray-100"
            @click="openCart()">
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
          </div>

          <div v-if="user == null" @click="goToLogin()"
            class="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-2 md:px-4 hover:bg-gray-100">
            <span class="text-sm font-medium">Đăng nhập</span>
          </div>

          <div v-if="user != null" @click="logout()"
            class="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-2 md:px-4 hover:bg-gray-100">
            <span class="text-sm font-medium">Đăng xuất</span>
          </div>
        </div>

      </div>

      <!--list thông tin website-->
      <!--header 2-->
      <div class="mt-4 flex items-center justify-center">
        <div class="hidden md:flex gap-x-8">
          <router-link to="/abouts" class="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">Về
            chúng tôi</router-link>
          <router-link to="/contacts"
            class="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">Liên hệ</router-link>
          <router-link to="/guarantees"
            class="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">Chính sách bảo
            hành</router-link>
        </div>

        <!--danh mục sản phẩm reponsive-->
        <div class="md:hidden flex flex-1 gap-x-3">
          <div class="relative">
            <div class="flex cursor-pointer select-none items-center gap-x-2 rounded-md border bg-gray-100 py-2 px-4"
              @click="openMenu = !openMenu">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <!-- Dropdown menu -->
            <div v-show="openMenu" v-for="cat in cats"
              class="absolute  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <!-- Các mục trong dropdown -->
              <a  @click="gotoCat(cat.id);openMenu=false" class=" cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{{ cat.name_cat }}</a >
            </div>
          </div>

          <!--thanh search-->
          <input type="text" class="md:hidden block w-full rounded-md border border-[#DDE2E4] px-3 py-2 text-sm"
            value="Tìm kiếm sản phẩm ..." />
        </div>
      </div>
    </div>
  </div>

  <div style="background-image: url('https://mixivivu.com/section-background.png');"  @click="getProfile()">
    <div class="container mx-auto mt-[7.1rem] main">
      <router-view></router-view>
    </div>
  </div>

  <!--footer-->
  <footer class="bg-white "  @click="getProfile()">
    <div class="mx-auto mb-4 max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div class="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
        <div class="mx-auto max-w-sm lg:max-w-none">
          <p class="mt-4 text-center text-gray-500 lg:text-left lg:text-lg">
            Với đội ngũ nhân viên tận tâm và chuyên nghiệp, chúng tôi sẵn lòng
            hỗ trợ bạn trong việc chọn lựa sản phẩm phù hợp nhất với nhu cầu và
            mong muốn của bạn. Không chỉ là một cửa hàng, chúng tôi là một cộng
            đồng của những người yêu thích bàn phím, chia sẻ kiến thức và kinh
            nghiệm để cùng nhau phát triển.
          </p>

          <div class="mt-6 flex justify-center gap-4 lg:justify-start">
            <a class="text-gray-700 transition hover:text-gray-700/75" href="#" target="_blank" rel="noreferrer">
              <span class="sr-only"> Facebook </span>

              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clip-rule="evenodd" />
              </svg>
            </a>

            <a class="text-gray-700 transition hover:text-gray-700/75" href="#" target="_blank" rel="noreferrer">
              <span class="sr-only"> Instagram </span>

              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clip-rule="evenodd" />
              </svg>
            </a>

            <a class="text-gray-700 transition hover:text-gray-700/75" href="#" target="_blank" rel="noreferrer">
              <span class="sr-only"> Twitter </span>

              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>

            <a class="text-gray-700 transition hover:text-gray-700/75" href="#" target="_blank" rel="noreferrer">
              <span class="sr-only"> GitHub </span>

              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clip-rule="evenodd" />
              </svg>
            </a>

          </div>
        </div>

        <div class="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left">

          <div class="about">
          <router-link to="/abouts">
            <strong class="font-medium text-gray-900"> Về chúng tôi </strong></router-link>
          </div>

          <div class="about">
            <router-link to="/contacts">
            <strong class="font-medium text-gray-900"> Liên hệ </strong></router-link>
          </div>

          <div class="about">
            <router-link to="/guarantees">
            <strong class="font-medium text-gray-900"> Chính sách </strong></router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <MiniCart @cancel="openCart()" v-if="isOpenCart" />

</template>

<script>
import MiniCart from "../components/client/minicart.component.vue";
import userController from "../controllers/user.controller";
import categoryController from "../controllers/category.controller";
export default {
  data() {
    return {
      openMenu: false,
      isOpenCart: false,
      user: null,
      cats:[],
      search_value:''
    };
  },
  async mounted() {
    this.getProfile()
    this.cats = (await categoryController.getCats()).data
  },
  components: { MiniCart },
  methods: {
    openCart() {
      this.isOpenCart = !this.isOpenCart
    },

    goToLogin()
    {
      this.$router.push({name:'login'})
    },

   async setRefreshToken()
    {
     const result = await userController.refreshToken('user')
     this.user = JSON.parse(localStorage.getItem("user"));
    },

    async getProfile() {
      try {
      let token = localStorage.getItem("token");
      if (token) {
      const result = await userController.getProfile('user')
      this.user = JSON.parse(localStorage.getItem("user"));
      }
      } catch (error) {
        if (error.response.status === 401) {
           this.setRefreshToken()
           console.clear()
        } else {
            console.log(error);
        }
      }
    },

    async logout()
    {
      const result = await userController.logout(this.user.id,'user')
      this.user = null
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.$router.push({name:'login'})
    },

    gotoCat(id)
    {
      this.$router.push({ name: 'productbycat', params: { 'id': id } })
    },

    submit()
    {
      //this.$router.push({name:"search",query: { key: this.search_value }})
      window.location.href = `${import.meta.env.VITE_API_BASE_FE}search?key=${this.search_value}`
      console.log(this.search_value)
    }

  },
};
</script>