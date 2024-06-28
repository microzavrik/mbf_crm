<template>
  <div class="registration-container">
    <div class="form-container">
      <h2>Employee Registration</h2>
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

      <form @submit.prevent="submitForm" class="registration-form">
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
          <select id="activity-type" v-model="activityType" required>
            <option value="" disabled selected>Select activity type</option>
            <option value="phone-sales">Phone Sales</option>
            <option value="computer-sales">Computer Sales</option>
            <option value="it-products">IT Products</option>
            <option value="agriculture">Agriculture</option>
          </select>
        </div>
        <div class="form-group" v-if="userType === 'manager'">
          <label for="staff-count">Approximate Staff Count</label>
          <select id="staff-count" v-model="staffCount" required>
            <option value="" disabled selected>Select staff count</option>
            <option value="1-5">1-5 co-workers</option>
            <option value="5-15">5-15 co-workers</option>
            <option value="15-50">15-50 co-workers</option>
            <option value="50+">50+ co-workers</option>
          </select>
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
  width: 400px;
}

.form-group select {
  width: 100%;
  padding: 0.6em 0.6em;
  border: 1px solid #4b4b7a;
  border-radius: 4px;
  background-color: #3c3c6e;
  color: #c8c8c8;
  font-size: 0.9rem;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.5em;
  padding-right: 1.5rem;
  cursor: pointer;
}

.form-container h2 {
  color: #9370db;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.8rem;
}

.user-type-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.user-type-buttons button {
  background-color: #4b4b7a;
  color: #c8c8c8;
  border: none;
  padding: 0.6em 1.2em;
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

.registration-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: #c8c8c8;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.6em 0.6em;
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