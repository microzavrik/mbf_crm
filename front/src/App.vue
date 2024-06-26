<template>
<helloPage :test="test" />
</template>

<style scoped>

</style>

<script>
import auth from "./components/auth.vue";
import helloPage from './components/helloPage.vue'

export default{
  components:{ auth, helloPage },
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
