<template>
  <div class="px-4 py-4">
    <!--filter-->

    <div class="space-y-2 w-[300px] ml-auto">
      <!--price-->
      <details
        class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary
          class="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
        >
          <span class="text-sm font-medium"> Bộ lọc </span>

          <span class="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>

        <div class="border-t border-gray-200 bg-white ">
          <div class="border-t border-gray-200 p-4">
            <div class="gap-4">
            <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mới nhất</a>
            <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Giá tăng dần</a>
            <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Giá giảm nhất</a>
            </div>
          </div>

          
        </div>
        
      </details>
    </div>

    <Product :isCatTitle="false" />

    <!--pagination-->
    <ol class="flex justify-center gap-1 text-xs font-medium">
      <!--prev-->
      <li>
        <a
          href="#"
          class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span class="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </li>

      <li
        class="block size-8 rounded border-gray-600 bg-gray-600 text-center leading-8 text-white"
      >
        1
      </li>

      <!--next-->
      <li>
        <a
          href="#"
          class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span class="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </li>
    </ol>
  </div>
</template>

<script>
import Product from "../../components/client/product.component.vue";

export default {
  data() {
    return {};
  },
  mounted() {},
  components: { Product },
  methods: {},
};
</script>
