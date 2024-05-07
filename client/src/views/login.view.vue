<template>
  <section style="background-image: url('https://mixivivu.com/section-background.png')">
    <main class="  flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
      <div class="max-w-xl lg:max-w-3xl bg-white">
        <!--top-->
        <div class="relative mt-4 block ">
          <h1 class="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Chào mừng đến với 404NFP
          </h1>

          <p class="mt-4 leading-relaxed text-gray-500">
            Bạn muốn mua gì, chúng tôi không có bán hàng đâu mà mua ?
          </p>
        </div>

        <!--phan dang ky nè-->
        <div class="mt-8 grid grid-cols-6 gap-6">

          <div class="col-span-6 email">
            <label for="Email" class="block text-sm font-medium text-gray-700">
              Địa chỉ email
            </label>

            <input v-model="email" type="email" id="Email" name="email"
              class="mt-1 w-full p-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
          </div>

          <div class="col-span-6 password">
            <label for="Password" class="block text-sm font-medium text-gray-700">
              Nhập mật khẩu
            </label>

            <input v-model="password" type="password" id="Password" name="password"
              class="mt-1 w-full p-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
          </div>

          <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button @click="login()"
              class="inline-block shrink-0 rounded-md border border-gray-600 bg-gray-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-blue-500">
              Đăng nhập
            </button>

            <p class="mt-4 text-sm text-gray-500 sm:mt-0">
              Bạn chưa có tài khoản
              <router-link to="/register" class="text-gray-700 underline">Đăng ký</router-link>.
            </p>
          </div>

        </div>

      </div>

    </main>
  </section>
</template>


<script>
import userController from '../controllers/user.controller'
export default {
  data() {
    return {
      email: '', password: ''
    };
  },
  mounted() { },
  components: {},
  methods: {
    async login() {
      const formData = new FormData();
      formData.append("email", this.email);
      formData.append("password", this.password);
      const result = await userController.login(formData)

      if (result.data.user.role == 'user') {
        localStorage.setItem("token", JSON.stringify(result.data.access_token));
        localStorage.setItem("user", JSON.stringify(result.data.user))
        this.$router.push({ name: "home" });
      }
      else if (result.data.user.role == 'admin') {
        localStorage.setItem("token", JSON.stringify(result.data.access_token));
        this.$router.push({ name: "admin" });
      }
    }
  },
};
</script>
