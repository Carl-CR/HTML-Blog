<script>
export default {
  name: 'Usercard',
  props: {
    username: String,
    bio: String
  }
}
</script>

<template>
<div class="total_container">
    <div class="card">
    <header class="card-header">
        <p class="card-header-title">
            {{username}}
        </p>
        <div class="dropdown is-active">
        </div>
    </header>
    <div class="card-content">
        <div class="content">
            <p>{{bio}}</p>
            <!-- {{text}} -->
        <!-- <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a> -->
        <br>
        </div>
    </div>
    </div>
</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .total_container {
        float: left;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-left: auto;
        margin-right: auto;
        width: 250px;
        padding-top: 50px;
        padding-left: 50px;
    }
    .username_label {
        text-align: left;
    }

    .card {
        background-color: #d3d3d3;
    }

</style>
