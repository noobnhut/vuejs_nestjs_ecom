<template>
  <section class="p-3 sm:p-5 antialiased">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <!-- Start coding here -->
      <div class="relative shadow-md sm:rounded-lg overflow-hidden px-2 py-2">
       
        <!--nội dung-->
        <!--title add-->
        <div class="cat">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Chọn sản phẩm</label
          >
          <select
            v-model="productId"
            @change="getImgs(productId)"
            required
            class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm"
          >
            <option disabled>Chọn sản phẩm</option>

            <option v-for="product in products" :value="product.id">
              {{ product.name_product }}
            </option>
          </select>
        </div>
        <div class="flex items-center justify-between mt-2 mb-2">
          <h2 class="text-[20px] font-medium">Quản lý ảnh sản phẩm</h2>
          <button v-if="productId != ''"
            @click="isAdd = true"
            class="inline-flex items-center gap-x-1 rounded-10 bg-white py-2 px-4 text-sm"
          >
            <svg fill="none" viewBox="0 0 24 24" class="h-6 w-6 stroke-current">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M12 5.75v12.5M18.25 12H5.75"
              ></path></svg
            ><span>Thêm mới</span>
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
                <th scope="col" class="px-4 py-3">Ảnh sản phẩm</th>
                <th scope="col" class="px-4 py-3">Ngày tạo</th>
                <th scope="col" class="px-4 py-3"></th>
                <th scope="col" class="px-4 py-3"></th>
              </tr>
            </thead>

            <tbody v-for="(img, index) in imgs" :key="index">
              <tr class="border-b">
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-white-900 whitespace-nowrap dark:text-black"
                >
                  {{ index + 1 }}
                </th>

                <td class="px-4 py-3">
                  <img :src="img.img_url" alt="" />
                </td>

                <td class="px-4 py-3">
                  {{ formatTime(img.created_at) }}
                </td>

                <td class="px-4 py-3">
                  <div
                    @click="
                      isDelete = true;
                      get_img = img;
                    "
                    class="cursor-pointer flex items-center justify-center gap-x-2 rounded-10 border py-2 px-1 border-red-400/10 bg-red-700/20 text-red-400"
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

  <!-- delete -->
  <div
    id="deleteModal"
    v-if="isDelete"
    class="overflow-y-auto overflow-x-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center z-50"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div
        class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
      >
        <button
          @click="
            isDelete = false;
            get_img = '';
          "
          type="button"
          class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-toggle="deleteModal"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewbox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <svg
          class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
          aria-hidden="true"
          fill="currentColor"
          viewbox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="mb-4 text-gray-500 dark:text-gray-300">
          Bạn có muốn xóa
          <span class="font-bold">ảnh này</span> ?
        </p>
        <div class="flex justify-center items-center space-x-4">
          <button
            data-modal-toggle="deleteModal"
            type="button"
            @click="
              isDelete = false;
              get_img = '';
            "
            class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Hủy
          </button>
          <button
            type="submit"
            @click="deleteImg(get_img.id)"
            class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--create-->
  <div
    v-if="isAdd"
    id="createProductModal"
    class="overflow-y-auto overflow-x-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center z-50"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div
        class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-400 sm:p-5"
      >
        <!-- Modal header -->
        <div
          class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Thêm banner
          </h3>

          <button
            @click="isAdd=false"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-target="createProductModal"
            data-modal-toggle="createProductModal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div>
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Hình ảnh</label
              >
              <input type="file" @change="onFileSelected($event)" />
            </div>
          </div>
          <button
            @click="addImg()"
            type="button"
            class="inline-flex items-center bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <svg
              class="mr-1 -ml-1 w-6 h-6"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Thêm img
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productController from "../../controllers/product.controller";

import extensiveController from "../../controllers/extensive.controller";
import imgController from "../../controllers/img.controller";
export default {
  data() {
    return {
      isDelete: false,
      isAdd: false,
      get_img: "",
      products: [],
      imgs: [],
      productId: "",
      value_search: "",
      avatar: null,
    };
  },
  mounted() {
    this.getProduct();
  },
  components: {},
  methods: {
    onFileSelected(event) {
      this.avatar = event.target.files[0];
    },
    async getProduct() {
      const result = await productController.getProducts();
      this.products = result.data;
    },

    async getImgs(id) {
      const result = await imgController.getImgByProduct(id);
      this.imgs = result.data;
    },

    async deleteImg(id) {
      const result = await imgController.deleteImg(id);
      if (result.status == 200) {
        this.getImgs(this.productId);
        this.isDelete = false;
      } else {
        console.log(result);
      }
    },

   async addImg()
    {
      const formData = new FormData();
      formData.append('avatar', this.avatar);
      const result = await imgController.createImg(formData,this.productId)
      if (result.status == 201) {
        this.getImgs(this.productId);
        this.isAdd = false;
      } else {
        console.log(result);
      }
    },

    formatTime(value) {
      return extensiveController.formatTime(value);
    },
  },
};
</script>
