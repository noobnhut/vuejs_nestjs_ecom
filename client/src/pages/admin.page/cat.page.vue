<template>
  <!-- Start block -->
  <section class="p-3 sm:p-5 antialiased">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <!-- Start coding here -->
      <div
        class="relative shadow-md sm:rounded-lg overflow-hidden bg-gray-900 px-2 py-2"
      >
        <div
          class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
        >
          <div class="w-full md:w-1/2">
            <div class="flex items-center">
              <label for="simple-search" class="sr-only">Tìm kiếm</label>
              <div class="relative w-full">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  v-on:keyup.enter="search()"
                  v-model="value_search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Tìm theo theo tên..."
                  required=""
                />
              </div>
            </div>
          </div>
        </div>
        <!--nội dung-->
        <!--title add-->
        <div class="flex items-center justify-between mt-2 mb-2">
          <h2 class="text-[20px] font-medium text-white">Quản lý danh mục</h2>
          <button
            class="inline-flex items-center gap-x-1 rounded-10 bg-white py-2 px-4 text-sm"
          >
            <svg fill="none" viewBox="0 0 24 24" class="h-6 w-6 stroke-current">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M12 5.75v12.5M18.25 12H5.75"
              ></path></svg><span>Thêm mới</span>
          </button>
        </div>

        <!--table-->
        <div class="overflow-x-auto">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-4 py-4">STT</th>
                <th scope="col" class="px-4 py-3">Tên danh mục</th>
                <th scope="col" class="px-4 py-3"></th>
                <th scope="col" class="px-4 py-3"></th>
              </tr>
            </thead>

            <tbody v-for="(cat, index) in cats" :key="index">
              <tr class="border-b border-gray-700">
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-white-900 whitespace-nowrap dark:text-black"
                >
                  {{ index + 1 }}
                </th>
                <td class="px-4 py-3">
                  {{ cat.name_cat }}
                </td>

                <td class="px-4 py-3">
                  <div
                    class="flex items-center justify-center gap-x-2 rounded-10 border py-2 px-1 border-blue-400/10 bg-blue-700/20 text-blue-400"
                  >
                    <span class="h-2 w-2 rounded-full bg-blue-400"></span
                    ><span class="text-xs">Cập nhập</span>
                  </div>
                </td>

                <td class="px-4 py-3">
                  <div
                    class="flex items-center justify-center gap-x-2 rounded-10 border py-2 px-1 border-red-400/10 bg-red-700/20 text-red-400"
                  >
                    <span class="h-2 w-2 rounded-full bg-red-400"></span
                    ><span class="text-xs">Xóa</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  <!-- End block -->

  <!--component toast thông báo !!!-->
  <toast ref="toast"></toast>
</template>

<script>
import toast from "../../components/toast.component.vue";
export default {
  data() {
    return {
      cats: [],
      value_search: "",
      name_cat:null,select_cat:null,
      isAdd:false,isUpdate:false,isDelete:false
    };
  },
  mounted() {
    this.getUserRole();
  },
  components: {
    toast,
  },
  methods: {
    async getUserRole() {
      try {
      } catch (error) {
        console.log(error);
      }
    },

    async search() {
      try {
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
