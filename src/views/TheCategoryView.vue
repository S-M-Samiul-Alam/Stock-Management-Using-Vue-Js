<template>
    <div class="d-flex justify-content-center">
      <p>All Categories</p>
    </div>
    <div>
      <!-- Display success and error messages -->
      <div v-if="successMessage" class="alert alert-success mt-3">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
  
      <!-- Table to display categories -->
      <table class="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Category Type</th>
            <th>Category Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in categories" :key="index">
            <td>{{ category.name }}</td>
            <td>{{ category.type }}</td>
            <td>{{ category.description }}</td>
            <td>
              <button @click="editCategory(category)" class="btn btn-primary">Edit</button>
              <button @click="deleteCategory(category.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Edit Form -->
      <div v-if="editMode">
        <h2>Edit Category</h2>
        <form @submit.prevent="updateCategory">
          <div class="form-group">
            <label for="editCategoryName">Category Name</label>
            <input type="text" id="editCategoryName" v-model="editedCategory.name" class="form-control" required>
          </div>
  
          <div class="form-group">
            <label for="editCategoryType">Category Type</label>
            <input type="text" id="editCategoryType" v-model="editedCategory.type" class="form-control" required>
          </div>
  
          <div class="form-group">
            <label for="editCategoryDescription">Category Description</label>
            <textarea id="editCategoryDescription" v-model="editedCategory.description" class="form-control" required></textarea>
          </div>
  
          <button type="submit" class="btn btn-primary">Update Category</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        categoryName: '',
        categoryType: '',
        categoryDescription: '',
        successMessage: '',
        errorMessage: '',
        categories: [], // Array to store categories
        editMode: false,
        editedCategory: {
          id: null,
          name: '',
          type: '',
          description: '',
        },
      };
    },
    created() {
      this.fetchCategories();
    },
    methods: {
      fetchCategories() {
        // Fetch the list of categories from the server using Axios
        axios
          .get('/api/categories')
          .then(response => {
            this.categories = response.data;
          })
          .catch(error => {
            this.errorMessage = 'Error fetching categories: ' + error.message;
          });
      },
      editCategory(category) {
        this.editMode = true;
        this.editedCategory.id = category.id;
        this.editedCategory.name = category.name;
        this.editedCategory.type = category.type;
        this.editedCategory.description = category.description;
      },
      updateCategory() {
        // Implement the logic to update a category here
        // You can make an Axios request to update the category by categoryId
  
        axios
          .put(`/api/categories/${this.editedCategory.id}`, this.editedCategory)
          .then(response => {
            // If updating is successful, show a success message
            this.successMessage = 'Category updated successfully' + response.message;
  
            // Exit edit mode and clear the edited category
            this.editMode = false;
            this.editedCategory.id = null;
            this.editedCategory.name = '';
            this.editedCategory.type = '';
            this.editedCategory.description = '';
  
            // Fetch the updated list of categories
            this.fetchCategories();
          })
          .catch(error => {
            this.errorMessage = 'Error updating category: ' + error.message;
          });
      },
      deleteCategory(categoryId) {
        // Implement the logic to delete a category here
        // You can make an Axios request to delete the category by categoryId
  
        axios
          .delete(`/api/categories/${categoryId}`)
          .then(response => {
            // If deletion is successful, show a success message
            this.successMessage = 'Category deleted successfully'+ response.message;
  
            // Fetch the updated list of categories
            this.fetchCategories();
          })
          .catch(error => {
            this.errorMessage = 'Error deleting category: ' + error.message;
          });
      },
    },
  };
  </script>
  