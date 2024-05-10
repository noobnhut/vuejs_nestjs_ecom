<template>

  <div class="flex min-h-screen w-full bg-white-800 font-san" @click="setRefreshToken()">
    <!--backview mờ ảo-->
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
      @click="isOpen = false"
    ></div>

    <!--sidebar-->
    <aside
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="flex w-64 flex-col px-4 pt-10 pb-6 bg-white-800 inset-y-0 left-0 z-30 fixed transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0"
    >
      <!--title adminpage-->
      <a
        href=""
        class=" flex items-center gap-x-4 px-8 text-2xl font-medium focus:outline-none"
      >
        <!-- <h1 class="h-6 w-6 stroke-current" /> -->
        <span>ADMIN PAGE</span>
      </a>
      <!--list nav-->
      <ul class="flex flex-1 flex-col gap-y-10 px-8 pt-14">
        <li v-for="item in menu" :key="item.name" >
          <router-link
            :to="item.to"
            class="flex items-center gap-x-4 text-black hover:font-medium hover:text-gray-500 focus:font-medium focus:text-gray-900 focus:outline-non"
          >
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </aside>

    <!--main -->
    <main
      class="flex min-h-screen flex-1 flex-col rounded-l-[48px] bg-white-800 md:p-8"
    >
      <!--navbar-->
      <nav class="flex items-center gap-x-6 justify-between">
        <!--reponsive button-->
        <button
          class="text-black focus:outline-none lg:hidden ml-2"
          @click="isOpen = true"
        >
          <svg
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <div class="flex items-center md:pl-0 pl-10">
          <h1 class="text-[30px] font-bold ">404NFP</h1>
        </div>
        <!--avatar-->
        <button
          class="md:pr-0 pr-10 flex h-11 items-center justify-center rounded-full bg-white-900 px-2 text-black hover:text-gray-500"
        >
          <img
            src="https://mcdn.coolmate.me/image/May2022/wibu-la-gi-weeaboo-la-gi-su-khac-nhau-giua-wibu-va-otaku_494.jpg"
            alt=""
            class="h-8 w-8 rounded-full object-cover"
          />
          <span class="pl-2 pr-2 text-sm">Admin</span>
        </button>
      </nav>

      <!--router-view-->
      <div class="m-2">
        <router-view></router-view>
      </div>
    </main>
    
  </div>

</template>

<script>
import userController from "../controllers/user.controller";

export default {
  data() {
    return {
      menu: [
        { name: "Trang chủ", to: "/admin" },
        { name: "Quản lý user", to: "/admin/user" },
        { name: "Quản lý danh mục", to: "/admin/cat" },
        { name: "Quản lý sản phẩm", to: "/admin/product" },
        { name: "Quản lý ảnh", to: "/admin/img" },
        { name: "Quản lý đơn hàng", to: "/admin/order" },
      ],
      isOpen: false,
      user:null
    };
  },
  mounted(){
    this.getProfile()
  },
  methods: {

    async setRefreshToken()
    {
     const result = await userController.refreshToken()
     this.user = JSON.parse(localStorage.getItem("admin"));
    },

    async getProfile() {
      let token = localStorage.getItem("token");
      if (token) {
      const result = await userController.getProfile()
      this.user = JSON.parse(localStorage.getItem("admin"));
      }
      else
      {
        this.$router.push({name:'login'})
      }
    },

    async logout()
    {
      const result = await userController.logout()
      this.user = null
      localStorage.removeItem("admin");
      localStorage.removeItem("token");
      this.$router.push({name:'login'})
    }
  },
  components: {},
};
</script>
