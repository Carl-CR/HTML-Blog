<template>
  <div id="app">
    <Navibar />
    <Response id="responseData" message="" success="false" />
    <router-view />
  </div>
</template>

<script>
  import Navibar from './components/Navibar.vue'
  import Response from './components/Response.vue'

  export default {
    name: 'App',
    components: {
      Navibar,
      Response
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>
