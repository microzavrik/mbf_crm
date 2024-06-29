<template>
    <div class="error-page">
      <div class="error-container">
        <div class="error-content">
          <h1 class="error-title">Oops! Something went wrong.</h1>
          <p class="error-message">
            We're sorry, but there seems to be an issue with your connection, your
            JWT token, or our servers. Please try again later.
          </p>
          <button class="error-button" @click="goHome">Go to Home</button>
        </div>
        <div class="error-image">
          <img src="https://bitmedia.io/wp-files/2021/07/cover-image.jpeg" alt="Error Illustration" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ErrorPage',
    methods: {
      goHome() {
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .error-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .error-container {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    max-width: 800px;
    width: 100%;
  }
  
  .error-content {
    flex: 1;
    margin-right: 2rem;
  }
  
  .error-title {
    color: #8b5fbd;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  .error-message {
    color: #3c3c6e;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .error-button {
    background-color: #8b5fbd;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .error-button:hover {
    background-color: #a07bcd;
  }
  
  .error-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .error-image img {
    max-width: 100%;
    height: auto;
  }
  </style>