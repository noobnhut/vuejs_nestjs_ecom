<!-- CreateUser.vue -->

<template>
  <div>
    <h1>Create User</h1>
    <form @submit.prevent="submitForm">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="formData.name" required>
      
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="formData.email" required>
      
      <button type="submit">Create User</button>
    </form>
    
    <div v-if="responseMessage">{{ responseMessage }}</div>
  </div>
</template>

<script>
import UserController from '@/controllers/UserController.js';

export default {
  data() {
    return {
      formData: {
        name: '',
        email: ''
      },
      responseMessage: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await UserController.createUser(this.formData);
        this.responseMessage = 'User created successfully!';
        console.log('User created:', response.data);
        // Đặt logic để xử lý sau khi tạo user thành công (ví dụ: reset form, hiển thị thông báo...)
      } catch (error) {
        console.error('Error creating user:', error);
        this.responseMessage = 'Failed to create user.';
        // Xử lý lỗi, hiển thị thông báo cho người dùng, v.v.
      }
    }
  }
};
</script>
