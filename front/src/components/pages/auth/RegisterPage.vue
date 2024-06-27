<script setup>
import axios from 'axios';

const handleSubmit = (e) => {
  const form = new FormData(e.target);
  const formProps = Object.fromEntries(form.entries());
  
  if(formProps.password !== formProps.repeatPassword) {
    alert('Passwords do not match');
    return;
  }
  formProps.repeatPassword = undefined;
  console.log(formProps);
  axios.post('/api/auth/register', formProps)
  .then(res => {
    console.log(res.data);
  })
}
</script>

<template>
  <div class="registration-container">
    <div class="form-container">
      <h2>Create Account</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="E-Mail" required>
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="username" placeholder="Name" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" required>
        </div>
        <div class="form-group">
          <label for="repeat-password">Repeat Password</label>
          <input type="password" id="repeat-password" name="repeatPassword" placeholder="Repeat Password" required>
        </div>
        <button type="submit" class="submit-btn">Register</button>
      </form>
      <div class="login-link">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.registration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1a1a2e;
}

.form-container {
  background-color: #2c2c54;
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

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: #c8c8c8;
  margin-bottom: 0.2rem;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.5em 0.5em;
  border: 1px solid #4b4b7a;
  border-radius: 4px;
  background-color: #3c3c6e;
  color: #c8c8c8;
  font-size: 0.9rem;
}

.submit-btn {
  
  background-color: #9370db;
  color: #fff;
  border: none;
  padding: 0.8em 1.2em;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 1rem;
}

.submit-btn:hover {
  
  background-color: #c8a2c8;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
  color: #c8c8c8;
  font-size: 0.9rem;
}

.login-link a {
  color: #9370db;
  text-decoration: none;
}

.login-link a:hover {
  color: #c8a2c8;
}
</style>