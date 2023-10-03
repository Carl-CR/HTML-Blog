<template>
  <nav class="navbar is-black">
    <div class="navbar-brand">
      <!-- <router-link to="/" class="navbar-item"><p class="ctitle">Blogo</p></router-link> -->
      <router-link to="/" class="navbar-item">
        <img :src="logo" alt="Blogo" />
        <!-- <svg :src="logo" alt="Blogo" height="10px" ></svg> -->
      </router-link>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/blog" v-if="isLoggedIn" class="navbar-item"><i class="fa-regular fa-compass"></i>Blog</router-link>
        <router-link to="/create-post" v-if="isLoggedIn" class="navbar-item"> 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" fill="white"/>
          </svg>
          Create Post
        </router-link>

        <router-link to="/group-members" v-if="isLoggedIn" class="navbar-item"> <i class="fa-solid fa-code"></i> Group Members</router-link>
        <router-link to="/about-me" v-if="isLoggedIn" class="navbar-item"><i class="fa fa-user fa-md" ></i>Profile</router-link>
      </div>
    </div>

    <!-- login/signup options -->
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <button class="button is-black is-light is-rounded" id="dark-mode-toggle">Switch Mode</button>
          <router-link to="/login" v-if="!isLoggedIn" class="button is-light is-rounded">Log In</router-link>
          <button v-if="isLoggedIn" class="button is-light is-rounded" @click="logout">Logout</button>
          <router-link to="/signup" v-if="!isLoggedIn" class="button is-light is-rounded">Sign Up</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

import logo from '@/assets/logo.png';
import { userStore } from '@/dataStore';
import { computed } from 'vue';

export default {
  name: 'Navibar',
  data() {
    return {
      logo: logo,
      // isLoggedIn: false
    };
  },
  methods: {
    

    logout() {
      this.userData.setUsername("");
      this.userData.setToken("");
      this.$router.push('/login');
    },
  
  },
  mounted() {
    // this.isLoggedIn = getIsLoggedIn();
    // setInterval(() => {
    //   this.isLoggedIn = getIsLoggedIn();
    // }, 1000); // checks every 1 second

    const darkModeBtn = document.querySelector('#dark-mode-toggle');
    darkModeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      darkModeBtn.classList.toggle('is-light');
    });
  },
  setup() {
    const userData = userStore();

    const isLoggedIn = computed(() =>{
      return userData.username != ""
    })

    return { userData, isLoggedIn }
  }
};
</script>

<!-- add "scoped" attribute to limit CSS to this component only -->
<style>
  div {
    margin: 0;
    padding: 0;
  }

  body.dark-mode {
    /* background-color: #2b2b2b; */
    background-color: black;
    color: white;
  }

  body.dark-mode .mode-change {
    color: white;
    border-color: white;
  }

  body.dark-mode .label {
    color: white;
  }

  body.dark-mode #group .mode-change {
    border: 2px solid white;
    color: white;
  }

  body.dark-mode .axis-label {
    fill: white;
}
  /* body.dark-mode #blog_rules {
    background-color: #444444;
  } */

  .fa-user{
    padding-right: 5px;
  }

  .fa-compass{
    padding-right: 5px;
  }

  svg{
    padding-right: 5px;
  }

  .fa-code{
    padding-right: 5px;
  }
</style>

