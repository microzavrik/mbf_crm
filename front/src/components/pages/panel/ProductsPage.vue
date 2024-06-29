<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const products = ref([]);
const showForm = ref(false);
const newProduct = ref({
  name: '',
  category: '',
  price: '',
});
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
const totalPages = computed(() => Math.ceil(products.value.length / productsPerPage));
const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  return products.value.slice(startIndex, endIndex);
});

function goToPage(page) {
  currentPage.value = page;
}

onMounted(fetchProducts);
</script>

<template>
  <div class="container">
    <h1 class="title">Products</h1>
    <button class="add-product-btn" @click="showForm = true">Add Product</button>
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
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in paginatedProducts" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.price }}</td>
          <td>
            <button class="edit-btn" @click="updateProduct(product.id, product)">Edit</button>
            <button class="delete-btn" @click="deleteProduct(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
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
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
  color: #8b5fbd;
  text-align: center;
  margin-bottom: 2rem;
}

.add-product-btn {
  display: block;
  margin: 0 auto 2rem;
  padding: 0.5rem 1rem;
  background-color: #8b5fbd;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-product-btn:hover {
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
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 600px;
}

.form input {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
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
  font-size: 1rem;
}

.submit-btn {
  background-color: #8b5fbd;
  color: white;
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
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #f2f2f2;
}

th {
  background-color: #f2f2f2;
  color: #8b5fbd;
}

.edit-btn,
.delete-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background-color: #8b5fbd;
  color: white;
  transition: background-color 0.3s ease;
}

.edit-btn:hover {
  background-color: #a07bcd;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background-color: #c82333;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #f2f2f2;
  color: #333;
  cursor: pointer;
  margin: 0 0.25rem;
  transition: background-color 0.3s ease;
}

.pagination button.active {
  background-color: #8b5fbd;
  color: white;
}

.pagination button:hover {
  background-color: #ddd;
}
</style>