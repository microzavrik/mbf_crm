<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="login-container">
    <div class="form-container">
      <h2>Welcome to MBF CRM</h2>
      <div class="content">
        <p>
          Our team leader Artem Usmanov created this for you. How Steve Jobs created the iPhone
        </p>
        <div class="buttons-container">
          <div class="buttons">
            <RouterLink to="/login" class="btn btn-primary">Login</RouterLink>
            <RouterLink to="/register" class="btn btn-secondary">Register</RouterLink>
          </div>
        </div>
      </div>
      <div class="footer">
        <p>&copy; 2024 MBF CORP. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #9370db;
  color: #3c3c6e;
  padding: 2rem;
}

.form-container {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 350px;
}

.form-container h2 {
  color: #9370db;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.8rem;
}

.content {
  text-align: center;
  margin-bottom: 2rem;
}

.buttons-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  text-decoration: none;
  font-weight: bold;
}

.btn-primary {
  background-color: #9370db;
  color: #fff;
}

.btn-primary:hover {
  background-color: #c8a2c8;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #3c3c6e;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.footer {
  font-size: 0.8rem;
  color: #3c3c6e;
}
</style>