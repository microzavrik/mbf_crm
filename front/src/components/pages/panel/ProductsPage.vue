<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

import categoriesIcon from '../../../assets/categories.png';
import addIcon from '../../../assets/plus.png';


const products = ref([]);
const categories = ref([]);
const showForm = ref(false);
const showCategoryForm = ref(false);
const activeTab = ref('products');
const newProduct = ref({
  name: '',
  category: '',
  price: '',
});
const newCategory = ref('');
const currentPage = ref(1);
const productsPerPage = 6;

// Fetch all products
async function fetchProducts() {
  try {
    const response = await axios.get('/api/products');
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Fetch all categories
async function fetchCategories() {
  try {
    const response = await axios.get('/api/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

// Create a new product
async function createProduct() {
  try {
    const response = await axios.post('/api/products', newProduct.value);
    products.value.push(response.data);
    showForm.value = false;
    newProduct.value = {
      name: '',
      category: '',
      price: '',
    };
  } catch (error) {
    console.error('Error creating product:', error);
  }
}

// Create a new category
async function createCategory() {
  try {
    const response = await axios.post('/api/categories', { name: newCategory.value });
    categories.value.push(response.data);
    showCategoryForm.value = false;
    newCategory.value = '';
  } catch (error) {
    console.error('Error creating category:', error);
  }
}

// Update a product
async function updateProduct(id, product) {
  try {
    const response = await axios.put(`/api/products/${id}`, product);
    const index = products.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      products.value[index] = response.data;
    }
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

// Delete a product
async function deleteProduct(id) {
  try {
    await axios.delete(`/api/products/${id}`);
    products.value = products.value.filter((p) => p.id !== id);
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

// Pagination
const totalPages = computed(() => Math.ceil(activeTab.value === 'products' ? products.value.length : categories.value.length / productsPerPage));
const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  return activeTab.value === 'products' ? products.value.slice(startIndex, endIndex) : categories.value.slice(startIndex, endIndex);
});

function goToPage(page) {
  currentPage.value = page;
}

function switchTab(tab) {
  activeTab.value = tab;
  currentPage.value = 1;
}

onMounted(() => {
  fetchProducts();
  fetchCategories();
});
</script>

<template>
    <div class="container">
      <header class="header">
        <div class="header-content">
          <h1 class="title">{{ activeTab === 'products' ? 'Products' : 'Categories' }}</h1>
          <div class="tabs">
            <button class="tab-btn" :class="{ 'active': activeTab === 'products' }" @click="switchTab('products')">
  <img :src="productIcon" alt="Product" />
</button>
<button class="tab-btn" :class="{ 'active': activeTab === 'categories' }" @click="switchTab('categories')">
  <img :src="categoriesIcon" alt="Category" class="tab-icon" />
</button>
          </div>
        </div>
      </header>
      <main class="main">
        <div class="actions">
            <button class="add-btn" @click="activeTab === 'products' ? (showForm = true) : (showCategoryForm = true)">
  <img :src="addIcon" alt="Add" />
</button>
        </div>
        <div class="form-container" v-if="showForm">
          <form @submit.prevent="createProduct" class="form">
            <input v-model="newProduct.name" placeholder="Name" required />
            <input v-model="newProduct.category" placeholder="Category" required />
            <input v-model="newProduct.price" placeholder="Price" required />
            <div class="form-actions">
              <button type="submit" class="submit-btn">Save</button>
              <button type="button" class="cancel-btn" @click="showForm = false">Cancel</button>
            </div>
          </form>
        </div>
        <div class="form-container" v-if="showCategoryForm">
          <form @submit.prevent="createCategory" class="form">
            <input v-model="newCategory" placeholder="New Category" required />
            <div class="form-actions">
              <button type="submit" class="submit-btn">Save</button>
              <button type="button" class="cancel-btn" @click="showCategoryForm = false">Cancel</button>
            </div>
          </form>
        </div>
        <table class="table" v-if="activeTab === 'products'">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in paginatedItems" :key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price }}</td>
              <td>
                <button class="edit-btn" @click="updateProduct(product.id, product)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" @click="deleteProduct(product.id)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="table" v-if="activeTab === 'categories'">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in paginatedItems" :key="category.id">
              <td>{{ category.name }}</td>
              <td>
                <button class="edit-btn">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
      <div class="pagination">
        <button
          v-for="page in totalPages"
          :key="page"
          :class="{ 'active': currentPage === page }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </template>
  
  <style scoped>
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    background-color: #8b5fbd;
    color: #fff;
    padding: 1.5rem;
    border-radius: 8px 8px 0 0;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .tabs {
    display: flex;
  }
  
  .tab-btn {
  width: 50px;
  height: 50px;
  background-color: #a07bcd;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1.2rem;
  margin-right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tab-icon {
  max-width: 100%;
  max-height: 100%;
}
  
  .tab-btn:hover {
    background-color: #b38dd0;
  }
  
  .main {
    padding: 2rem;
  }
  
  .actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
  }
  
  .add-btn {
    width: 40px;
    height: 40px;
    background-color: #8b5fbd;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 1.2rem;
  }
  
  .add-btn:hover {
    background-color: #a07bcd;
  }
  
  .form-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .form {
    background-color: #f5f5f5;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 400px;
  }
  
  .form input {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  
  .submit-btn,
  .cancel-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }
  
  .submit-btn {
    background-color: #8b5fbd;
    color: #fff;
    transition: background-color 0.3s ease;
  }
  
  .submit-btn:hover {
    background-color: #a07bcd;
  }
  
  .cancel-btn {
    background-color: #ccc;
    color: #333;
    transition: background-color 0.3s ease;
  }
  
  .cancel-btn:hover {
    background-color: #ddd;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }
  
  th {
    background-color: #e0e0e0;
    color: #8b5fbd;
  }
  
  .edit-btn,
  .delete-btn {
    width: 30px;
    height: 30px;
    background-color: #8b5fbd;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 0.9rem;
    margin: 0 0.25rem;
  }
  
  .edit-btn:hover,
  .delete-btn:hover {
    background-color: #a07bcd;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
  
  .pagination button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #e0e0e0;
    color: #333;
    cursor: pointer;
    margin: 0 0.25rem;
    transition: background-color 0.3s ease;
    font-size: 0.9rem;
  }
  
  .pagination button.active {
    background-color: #8b5fbd;
    color: #fff;
  }
  
  .pagination button:hover {
    background-color: #ccc;
  }
  </style>