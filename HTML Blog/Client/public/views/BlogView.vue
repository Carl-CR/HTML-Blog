<template>
    <div class="mode-change">
        <!-- code from blog.html - blog explore page -->
        <h1>Blog Posts</h1>
        <!--<Usercard username="sleeby" bio="bio"/>-->
        <Blogfeed/>
    </div>
</template>

<script>
import Blogfeed from '../../src/components/Blogfeed.vue'
//import Usercard from '../../src/components/Usercard.vue'

export default {
  name: 'App',
  components: {
    Blogfeed
  }
}
</script>

<style>

    body{
        background-color: white;

        /* add for background-colour showing on entire page */
        width: 100%;
        min-height: 100vh;

        /* font-family: 'Delicious Handrawn', cursive; */
        font-family: 'Bad Script', cursive;
    }

    .mode-change {
        color: black;
    }

    h1 {
        font-weight: bold;
        text-transform: capitalize;
        text-align: center;
        padding-top: 50px;
        font-size: 50px; 
    }
</style>