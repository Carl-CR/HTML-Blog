<template>
    <div class="response" :style="cssVars">
      <p>{{ responseStore.message }}</p>
    </div>
</template>


<script>
import {useResponseStore} from '@/dataStore'
  export default {
    name: "Response",
    props: {
      message: { type: String, default: "" },
      success: { type: String, default: "false" },
    },
    watch: {
      
    },
    setup() {
      const responseStore = useResponseStore();
      responseStore.setMessage("")
      responseStore.setSuccess(false)

      return {
        responseStore
      }
    },
    mounted() {
      this.responseStore.setMessage(this.message)
      this.responseStore.setSuccess(this.success)
    },
    computed: {
      cssVars() {
        return {
          "--bColour": this.responseStore.success=="true" ? "lime" : "red",
        };
      },
    },
  };
</script>

<style scoped>
  .response {
    background-color: var(--bColour);
    opacity: 0.5;
  }
</style>