<template>
  <div class="registration-container">
    <div class="form-container">
      <h2>Employee Registration</h2>
      <div class="user-type-buttons">
        <button
          :class="{ 'active': position === 'employee' }"
          @click="position = 'employee'"
        >
          Employee
        </button>
        <button
          :class="{ 'active': position === 'manager' }"
          @click="position = 'manager'"
        >
          Manager
        </button>
      </div>

      <form @submit.prevent="submitForm" class="registration-form">
        <div class="form-group" v-if="position === 'employee'">
          <label for="full-name">Full Name</label>
          <input type="text" id="full-name" v-model="full_name" required />
        </div>
        <div class="form-group" v-if="position === 'employee'">
          <label for="company">Company</label>
          <input type="text" id="company" v-model="company" required />
        </div>
        <div class="form-group" v-if="position === 'manager'">
          <label for="surname">Surname</label>
          <input type="text" id="surname" v-model="surname" required />
        </div>
        <div class="form-group" v-if="position === 'manager'">
          <label for="company-name">Company Name</label>
          <input type="text" id="company-name" v-model="companyName" required />
        </div>
        <div class="form-group" v-if="position === 'manager'">
          <label for="activity-type">Type of Activity</label>
          <select id="activity-type" v-model="activityType" required>
            <option value="" disabled selected>Select activity type</option>
            <option value="phone-sales">Phone Sales</option>
            <option value="computer-sales">Computer Sales</option>
            <option value="it-products">IT Products</option>
            <option value="agriculture">Agriculture</option>
          </select>
        </div>
        <div class="form-group" v-if="position === 'manager'">
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
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'EmployeeRegistration',
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      position: 'employee',
      full_name: '',
      company: '',
      surname: '',
      companyName: '',
      activityType: '',
      staffCount: null
    }
  },
  methods: {
    submitForm() {
      const formData = {
        username: localStorage.getItem("username"),
        position: this.position,
        company: this.companyName,
        full_name: this.surname,
        activityType: this.activityType,
        staffCount: this.staffCount
      };

      axios.post('/api/empl/employees', formData)
        .then(response => {
          console.log('Form submitted successfully:', response.data);
          // Дополнительная логика после успешной отправки формы
          this.router.push('/panel');
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          // Обработка ошибок при отправке формы
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
  background-color: #9370db;
}

.form-container {
  background-color: #fff;
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
  background-color: #f0f0f0;
  color: #3c3c6e;
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
  background-color: #f0f0f0;
  color: #3c3c6e;
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
  color: #3c3c6e;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.6em 0.6em;
  border: 1px solid #4b4b7a;
  border-radius: 4px;
  background-color: #f0f0f0;
  color: #3c3c6e;
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
  color: #3c3c6e;
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