<template>
<HelloPage :test="test"/>
</template>

<style scoped>

</style>

<script>
import Auth from "./components/Auth.vue";
import HelloPage from './components/HelloPage.vue'

export default{
  components:{ Auth, HelloPage },
  data(){
    return{

    }
    },
  methods:{
    test(){
        console.log(1)
    }
  }
}
</script>
