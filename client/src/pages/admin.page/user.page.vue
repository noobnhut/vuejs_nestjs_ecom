<template>
    <!-- Start block -->
    <section class=" p-3 sm:p-5 antialiased">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
            <!-- Start coding here -->
            <div class=" relative shadow-md sm:rounded-lg overflow-hidden bg-gray-900 px-2 py-2">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div class="w-full md:w-1/2">
                        <div class="flex items-center">
                            <label for="simple-search" class="sr-only">Tìm kiếm</label>
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" id="simple-search" v-on:keyup.enter="search()" v-model="value_search"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Tìm theo theo tên..." required="">
                            </div>
                        </div>
                    </div>
              
                </div>
                <!--nội dung-->
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-4 py-4">STT</th>
                                <th scope="col" class="px-4 py-3">Họ Tên</th>
                                <th scope="col" class="px-4 py-3">Địa chỉ</th>
                                <th scope="col" class="px-4 py-3">Email</th>
                            </tr>
                        </thead>
                        <tbody v-for="(user, index) in users" :key="index">
                            <tr class="border-b dark:border-gray-700">
                                <th scope="row"
                                    class="px-4 py-3 font-medium  text-gray-900 whitespace-nowrap dark:text-black">{{ index +
                                        1 }}</th>
                                <td class="px-4 py-3">
                                    {{ user.fullname }}
                                </td>
                                <td class="px-4 py-3"> {{ user.address }}</td>
                                <td class="px-4 py-3"> {{ user.email }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    <!-- End block -->


</template>

<script>

export default
{
  data(){
    return {
        users: [], 
        user: '',value_search:'', 
    }
  },
  mounted(){
    this.getUser();
  },
  components: {
   
  },
  methods: {
    async getUser() {
       try {
          
       } catch (error) {
           console.log(error)
       }
    },

    async search()
    {
       try {
           
       } catch (error) {
        console.log(error)
       }
    }    
  }
}
</script>