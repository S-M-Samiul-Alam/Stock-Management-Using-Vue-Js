<template>
    <div class="container">
      <div class="d-flex justify-content-between">
        <h2>Product Categories</h2>
        <button type="button" class="btn btn-primary" @click="openAddCategoryModal">ADD</button>
      </div>
  
      <!-- Modal for adding a new category -->
      <div class="modal" id="addCategoryModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Category</h5>
              <button type="button" class="close" aria-label="Close" @click="closeAddCategoryModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <!-- Success and Error Messages for Add Category -->
              <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
              <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
  
              <form @submit.prevent="addCategory">
                <div class="form-group">
                  <label for="categoryName">Category Name</label>
                  <input type="text" class="form-control" id="categoryName" v-model="newCategory.name" required>
                </div>
                <div class="form-group">
                  <label for="categoryType">Category Type</label>
                  <input type="text" class="form-control" id="categoryType" v-model="newCategory.type" required>
                </div>
                <div class="form-group">
                  <label for="categoryDescription">Category Description</label>
                  <textarea class="form-control" id="categoryDescription" v-model="newCategory.description" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal for editing a category -->
      <div class="modal" id="editCategoryModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Category</h5>
              <button type="button" class="close" aria-label="Close" @click="closeEditCategoryModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <!-- Success and Error Messages for Edit Category -->
              <div v-if="editSuccessMessage" class="alert alert-success">{{ editSuccessMessage }}</div>
              <div v-if="editErrorMessage" class="alert alert-danger">{{ editErrorMessage }}</div>
  
              <form @submit.prevent="updateCategory">
                <div class="form-group">
                  <label for="editCategoryName">Category Name</label>
                  <input type="text" class="form-control" id="editCategoryName" v-model="editedCategory.name" required>
                </div>
                <div class="form-group">
                  <label for="editCategoryType">Category Type</label>
                  <input type="text" class="form-control" id="editCategoryType" v-model="editedCategory.type" required>
                </div>
                <div class="form-group">
                  <label for="editCategoryDescription">Category Description</label>
                  <textarea class="form-control" id="editCategoryDescription" v-model="editedCategory.description" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Table of categories -->
      <table class="table mt-3">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Category Type</th>
            <th>Category Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.name }}</td>
            <td>{{ category.type }}</td>
            <td>{{ category.description }}</td>
            <td>
              <button class="btn btn-primary" @click="editCategory(category)">Edit</button>
              <button class="btn btn-danger" @click="deleteCategory(category.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newCategory: {
          name: '',
          type: '',
          description: '',
        },
        successMessage: '',
        errorMessage: '',
        categories: [],
        editedCategory: {
          id: null,
          name: '',
          type: '',
          description: '',
        },
        editSuccessMessage: '',
        editErrorMessage: '',
      };
    },
    mounted() {
      // Fetch existing categories when the component is mounted
      this.fetchCategories();
    },
    methods: {
      openAddCategoryModal() {
        // Show the modal for adding
        this.showModal('addCategoryModal');
      },
      closeAddCategoryModal() {
        // Hide the modal for adding and reset the form and messages
        this.hideModal('addCategoryModal');
        this.newCategory = {
          name: '',
          type: '',
          description: '',
        };
        this.successMessage = '';
        this.errorMessage = '';
      },
      showEditCategoryModal() {
        // Show the modal for editing
        this.showModal('editCategoryModal');
      },
      closeEditCategoryModal() {
        // Hide the modal for editing and reset the form and messages
        this.hideModal('editCategoryModal');
        this.editedCategory = {
          id: null,
          name: '',
          type: '',
          description: '',
        };
        this.editSuccessMessage = '';
        this.editErrorMessage = '';
      },
      showModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
      },
      hideModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
      },
      addCategory() {
        // Send a POST request to your API to save the new category
        axios
          .post('/api/categories', this.newCategory)
          .then((response) => {
            this.successMessage = 'Category added successfully: ' + response.data.name;
            this.errorMessage = '';
            this.closeAddCategoryModal();
            this.fetchCategories();
          })
          .catch((error) => {
            this.successMessage = '';
            this.errorMessage = 'Error adding category: ' + error.message;
          });
      },
      fetchCategories() {
        // Fetch existing categories from your API
        axios
          .get('/api/categories')
          .then((response) => {
            this.categories = response.data;
          })
          .catch((error) => {
            console.error('Error fetching categories:', error);
          });
      },
      editCategory(category) {
        this.editedCategory = { ...category };
        this.showEditCategoryModal();
      },
      updateCategory() {
        axios
          .put(`/api/categories/${this.editedCategory.id}`, this.editedCategory)
          .then((response) => {
            this.editSuccessMessage = 'Category updated successfully: ' + response.data.name;
            this.editErrorMessage = '';
            this.closeEditCategoryModal();
            this.fetchCategories();
          })
          .catch((error) => {
            this.editSuccessMessage = '';
            this.editErrorMessage = 'Error updating category: ' + error.message;
          });
      },
      deleteCategory(categoryId) {
        axios
          .delete(`/api/categories/${categoryId}`)
          .then(() => {
            this.successMessage = 'Category deleted successfully';
            this.errorMessage = '';
            this.fetchCategories();
          })
          .catch((error) => {
            this.successMessage = '';
            this.errorMessage = 'Error deleting category: ' + error.message;
          });
      },
    },
  };
  </script>
  
<style>
img{
  height: 30px;
  width: 30px;
}
</style>