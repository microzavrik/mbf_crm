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
  <div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email</label>
        <input type="text" id="email" name="email" placeholder="E-Mail">
      </div>
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="username" placeholder="Name">
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password">
      </div>
      <div>
        <label for="repeat-password">Repeat Password: </label>
        <input type="password" id="repeat-password" name="repeatPassword" placeholder="Repeat Password">
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped>

</style>