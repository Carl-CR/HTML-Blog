<template>
  <div class="hello">
    <h1 class="welcome">{{ msg }}</h1>

    <div class="username">
      <div class="field is-horizontal" style="width: 400px; margin-left: auto; margin-right:auto; padding-top: 2rem">
        <div class="field-label is-normal">
          <label class="label" >Username:</label>
        </div>
        <div class="field-body">
          <input class="input" type="text" >
        </div>
      </div>
    </div>
    <div class="password">
      <div class="field is-horizontal" style="width: 400px; margin-left: auto; margin-right:auto; padding-top: 1rem;">
        <div class="field-label is-normal">
          <label class="label" >Password:</label>
        </div>
        <div class="field-body">
          <input class="input" type="text" >
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
  <div class="field-label">
    <!-- Left empty for spacing -->
  </div>
  <div class="field-body">
    <div class="field">
      <div class="control">
        <button class="button is-primary">
          Join
        </button>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

</style>
