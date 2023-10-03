<template>
    <div class="mode-change">
        <!-- signup title -->
        <h1 class = "sign-title">SIGN UP</h1>

    <!-- signup form -->
    <form @submit.prevent="handleSubmit">

        <!-- username -->
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
                    <p class="help is-danger">
                        This field is required
                    </p>
                </div>
            </div>
        </div>

        <!-- email -->
        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Email</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" name="email" id="email" v-model="email" placeholder="Enter Email">
                    </div>
                    <p class="help is-danger">
                        This field is required
                    </p>
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
                    <p class="help is-danger">
                        This field is required
                    </p>
                </div>
            </div>
        </div>

        <!-- submit button -->
        <div class="field is-horizontal">
            <div class="field-label">
            <!-- Left empty for spacing -->
            </div>

            <div class="field-body">
            <div class="field">
                <div class="control has-text-centered">
                <input type="submit" value="Sign Up" class="button is-black is-rounded" id="submit_login">
                </div>
            </div>
            </div>
        </div>
        </form>
    </div>
</template>

<style>
    body{
        background-color: white;
        /* font-family: 'Delicious Handrawn', cursive; */
        font-family: 'Bad Script', cursive;
    }

    .mode-change {
        color: black;
    }

    .sign-title{
        font-weight: bold;
        text-transform: capitalize;
        text-align: center;
        padding-top: 50px;
        font-size: 50px; 
        margin-left: 110px;
    }

.field {
    align-items: center;
    margin: auto;
    width: 40%;
}

#file-js-example {
    align-items: center;
    margin: auto;
    width: 30%;
    padding-left: 50px;
    padding-bottom: 30px;
}
</style>

<script>
    import { useResponseStore } from '@/dataStore';
    import axios from 'axios';

    export default {
        name: "SignupComponent",
        data() {
            return {
                username: '',
                email: '',
                password: ''
            }
        },
        setup() {
            const responseStores = useResponseStore()
            return { responseStores }
        },
        methods: {
            handleSubmit() {
                axios.post('http://127.0.0.1:3500/signup', { 'username': this.username, 'email': this.email, 'password': this.password }
                )
                    .then(response => {
                        const data = response.data
                        this.responseStores.setMessage(data.message)
                        this.responseStores.setSuccess("" + data.success)

                        if (data.success) {
                            this.$router.push("/login");
                        }
                    })
            }
        }
    }
</script>