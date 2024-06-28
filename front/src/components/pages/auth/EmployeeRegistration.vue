<template>
    <div class="registration-container">
      <div class="form-container">
        <h2>Employee Registration</h2>
        <div class="form-group">
          <label for="user-type">I am a:</label>
          <div class="user-type-buttons">
            <button
              :class="{ 'active': userType === 'employee' }"
              @click="userType = 'employee'"
            >
              Employee
            </button>
            <button
              :class="{ 'active': userType === 'manager' }"
              @click="userType = 'manager'"
            >
              Manager
            </button>
          </div>
        </div>
  
        <form @submit.prevent="submitForm">
          <div class="form-group" v-if="userType === 'employee'">
            <label for="full-name">Full Name</label>
            <input type="text" id="full-name" v-model="fullName" required />
          </div>
          <div class="form-group" v-if="userType === 'employee'">
            <label for="company">Company</label>
            <input type="text" id="company" v-model="company" required />
          </div>
          <div class="form-group" v-if="userType === 'manager'">
            <label for="surname">Surname</label>
            <input type="text" id="surname" v-model="surname" required />
          </div>
          <div class="form-group" v-if="userType === 'manager'">
            <label for="company-name">Company Name</label>
            <input type="text" id="company-name" v-model="companyName" required />
          </div>
          <div class="form-group" v-if="userType === 'manager'">
            <label for="activity-type">Type of Activity</label>
            <input type="text" id="activity-type" v-model="activityType" required />
          </div>
          <div class="form-group" v-if="userType === 'manager'">
            <label for="staff-count">Approximate Staff Count</label>
            <input type="number" id="staff-count" v-model="staffCount" required />
          </div>
          <button type="submit" class="submit-btn">Register</button>
        </form>
        <div class="login-link">
          Already have an account? <a href="#">Log in</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EmployeeRegistration',
    data() {
      return {
        userType: 'employee',
        fullName: '',
        company: '',
        surname: '',
        companyName: '',
        activityType: '',
        staffCount: null
      }
    },
    methods: {
      submitForm() {
        // Handle form submission logic here
        console.log('Form submitted:', {
          userType: this.userType,
          fullName: this.fullName,
          company: this.company,
          surname: this.surname,
          companyName: this.companyName,
          activityType: this.activityType,
          staffCount: this.staffCount
        });
      }
    }
  }
  </script>
  
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
  
  .user-type-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .user-type-buttons button {
    background-color: #4b4b7a;
    color: #c8c8c8;
    border: none;
    padding: 0.5em 1em;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 0 0.5rem;
  }
  
  .user-type-buttons button.active {
    background-color: #9370db;
    color: #fff;
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