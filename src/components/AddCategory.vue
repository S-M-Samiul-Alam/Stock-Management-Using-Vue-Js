<!-- CategoryForm.vue -->
<template>
    <div>
      <form @submit.prevent="saveCategory">
        <div class="form-group">
          <label for="categoryName">Category Name</label>
          <input type="text" id="categoryName" v-model="categoryName" class="form-control" required>
        </div>
  
        <div class="form-group">
          <label for="categoryType">Category Type</label>
          <input type="text" id="categoryType" v-model="categoryType" class="form-control" required>
        </div>
  
        <div class="form-group">
          <label for="categoryDescription">Category Description</label>
          <textarea id="categoryDescription" v-model="categoryDescription" class="form-control" required></textarea>
        </div>
  
        <button type="submit" class="btn btn-primary">Save Category</button>
      </form>
  
      <!-- Display success and error messages -->
      <div v-if="successMessage" class="alert alert-success mt-3">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; // Import Axios library
  
  export default {
    data() {
      return {
        categoryName: '',
        categoryType: '',
        categoryDescription: '',
        successMessage: '',
        errorMessage: '',
      };
    },
    methods: {
      saveCategory() {
        const categoryData = {
          name: this.categoryName,
          type: this.categoryType,
          description: this.categoryDescription,
        };
  
        axios
          .post('/api/categories', categoryData)
          .then(response => {
            this.successMessage = 'Category saved successfully!' + response.message;
            this.errorMessage = ''; // Clear any previous error message
            this.categoryName = '';
            this.categoryType = '';
            this.categoryDescription = '';
          })
          .catch(error => {
            this.successMessage = ''; // Clear any previous success message
            this.errorMessage = 'Error saving category: ' + error.message; // Set the error message
          });
      },
    },
  };
  </script>
  