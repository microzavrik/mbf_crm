<template>
  <MainPage test="test"/>
</template>

<style scoped>

</style>

<script>
import MainPage from "./components/pages/MainPage.vue";

export default{
  components:{ MainPage },
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
