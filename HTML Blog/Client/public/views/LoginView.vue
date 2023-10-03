<template>
    <div class="mode-change">
        <!-- login title -->
        <h1 class = "login-title"> LOGIN </h1>

        <!-- email -->
        <form @submit.prevent="handleSubmit">

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Username</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" name="username" id="username" v-model="username"
                            placeholder="Enter Username">
                    </div>
                </div>
            </div>
        </div>

        <!-- password -->
        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Password </label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input class="input" type="password" name="password" id="password" v-model="password"
                            placeholder="Enter Password">
                    </div>
                </div>
            </div>
        </div>

        <!-- submit button -->
        <div class="field is-horizontal">
            <div class="field-label">
            <!-- Left empty for spacing -->
            </div>
            <div class="field-body text-center">
            <div class="field">
                <div class="control has-text-centered">
                <input type="submit" value="Login" class="button is-black is-rounded" id="submit_login">
                </div>
            </div>
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

    .label {
        color: black;
    }

    .login-title {
        font-weight: bold;
        text-transform: capitalize;
        text-align: center;
        padding-top: 50px;
        font-size: 50px; 
        margin-left: 120px;
        
    }

    h3 {
        font-weight: bold;
        text-align: center;
        padding-top: 50px;
        font-size: 25px; 
    }

    .field {
        align-items: center;
        margin: auto;
        width: 40%;
    }

</style>

<script>
import { useResponseStore, userStore } from '@/dataStore';
import axios from 'axios';

export default {
    name: "LoginComponent",
    data() {
        return {
            username: '',
            password: ''
        }
    },
    setup() {
        const responseStores = useResponseStore()
        const userStores = userStore();
        return { responseStores, userStores }
    },
    methods: {
        handleSubmit() {
            axios.post('http://127.0.0.1:3500/login', { 'username': this.username, 'password': this.password })
                .then(response => {
                    const data = response.data
                    this.responseStores.setMessage(data.message)
                    this.responseStores.setSuccess("" + data.success)

                    if (data.success) {
                        this.userStores.setUsername(this.username);
                        this.userStores.setToken(data.token);
                        this.$router.push("/");
                    }
                })
        }
    }
}
</script>