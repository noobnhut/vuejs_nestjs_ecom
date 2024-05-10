<template>
  <section style="background-image: url('https://mixivivu.com/section-background.png')">
    <main class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
      <div class="max-w-xl lg:max-w-3xl bg-white">
        <!--top-->
        <div class="relative mt-4 block">
          <h1 class="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Chào mừng đến với 404NFP
          </h1>

          <p class="mt-4 leading-relaxed text-gray-500">
            Bạn muốn mua gì, chúng tôi không có bán hàng đâu mà mua ?
          </p>
        </div>

        <!--phan dang ky nè-->
        <div class="mt-8 grid grid-cols-6 gap-6">
          <div class="col-span-6 fullname">
            <label for="Fullname" class="block text-sm font-medium text-gray-700">
              Họ và tên
            </label>

            <input autocomplete="off" type="text" id="Fullname" name="fullname" v-model="fullname"
              class="mt-1 w-full p-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
          </div>

          <div class="col-span-6 numberphone">
            <label for="numberphone" class="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>

            <input autocomplete="off" type="text" id="numberphone" name="numberphone" v-model="numberphone"
              class="mt-1 w-full p-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
          </div>

          <div class="col-span-6 email">
            <label for="Email" class="block text-sm font-medium text-gray-700">
              Địa chỉ email
            </label>

            <input autocomplete="off" type="email" id="Email" name="email" v-model="email"
              class="mt-1 w-full p-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
          </div>

          <div class="col-span-6 password">
            <label for="Password" class="block text-sm font-medium text-gray-700">
              Nhập mật khẩu
            </label>

            <input autocomplete="off" type="password" id="Password" name="password" v-model="password"
              class="mt-1 w-full p-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
          </div>

          <div class="col-span-6 address">
            <label for="address" class="block text-sm font-medium text-gray-700">
              Nhập địa chỉ
            </label>

            <textarea id="OrderNotes" class="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
              v-model="address" rows="4"></textarea>
          </div>

          <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button @click="register()"
              class="inline-block shrink-0 rounded-md border border-gray-600 bg-gray-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-blue-500">
              Đăng ký tài khoản
            </button>

            <p class="mt-4 text-sm text-gray-500 sm:mt-0">
              Bạn đã có tài khoản
              <router-link to="/login" class="text-gray-700 underline">Đăng nhập</router-link>.
            </p>
          </div>
        </div>
      </div>
    </main>
  </section>
  <toast ref="toast"></toast>
</template>
<script>
import UserController from '../controllers/user.controller'
import toast from '../components/toast.component.vue'
export default {
  data() {
    return {
      email: '', address: '', fullname: '', numberphone: '', password: ''
    };
  },
  mounted() { },
  components: { toast },
  methods: {
    async register() {
      const formData = new FormData();
      formData.append("fullname", this.fullname);
      formData.append("address", this.address);
      formData.append("email", this.email);
      formData.append("numberphone", this.numberphone);
      formData.append("password", this.password);
      const result = await UserController.register(formData)
      if (result.data.success == true) {
        this.$refs.toast.showToast(result.data.message);
        setTimeout(() => {
          this.$router.push({ name: "login" });
        }, 1000)
      }
      else {
        this.$refs.toast.showToast(result.data.message);
      }
    }
  },
};
</script>
