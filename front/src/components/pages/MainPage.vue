<template>
    <div>
        <h1>crm system by usmanov`s team</h1>
        <button @click="test">Login</button>
        <button @click="test">Register</button>
    </div>
</template>

<style scoped>

</style>

<script>
export default{
    props:{
        test:{
            type: Function,
            required: true
        },
    }
  }
</script>
