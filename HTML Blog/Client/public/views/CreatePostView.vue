<template>
  <div class="mode-change">
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label">Create a title</label>
        <div class="control">
          <input class="input" name="title" type="text" placeholder="Enter title" v-model="title" id="title-input" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Write something like a post</label>
        <div class="control">
          <textarea class="textarea" name="bodytext" placeholder="Write a post" v-model="bodytext" 
            id="post-input" required></textarea>
        </div>
      </div>

        <div class="field">
          <div class="control has-text-centered">
            <input type="submit" value="Post" class="button is-black is-rounded" id="make_post">
          </div>
        </div>
      </form>
  </div>
</template>


<style>
  body {
    background-color: white;
    font-family: 'Bad Script', cursive;
  }

  .mode-change {
        color: black;
    }

  h1{
      font-weight: bold;
      text-transform: capitalize;
      text-align: center;
      padding-top: 50px;
      font-size: 50px; 
      
  }

  .field{
      align-items: center;
      margin: auto;
      width: 40%;
      margin-bottom: 20px; 
  }

  .textarea{ 
    height: 200px;
  }
</style>

<script>
import { useResponseStore, userStore } from '@/dataStore';
import axios from 'axios';

export default {
    name: "CreatepostComponent",
    data() {
      return {
        title: '',
        bodytext: ''
      }
    },
    setup() {
      const responseStores = useResponseStore()
      const userData = userStore()
      return { responseStores, userData }
    },
    methods: {
      handleSubmit() {
        if(this.userData.username == ""){
          this.responseStores.setMessage("You must be logged in to do that!")
          this.responseStores.setSuccess("false")
          return;
        }
        axios.post('http://localhost:3500/makepost', { 'title': this.title, 'bodytext': this.bodytext, 'username': this.userData.username }
        //axios.post('http://127.0.0.1:3500/makepost', { 'title': this.title, 'bodytext': this.bodytext }
        )
          .then(response => {
            const data = response.data
            this.responseStores.setMessage(data.message)
            this.responseStores.setSuccess("" + data.success)

            if (data.success) {
              this.$router.push("/blog");
            }
          })
      }
    }
  }
</script>