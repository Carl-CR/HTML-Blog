<template>
    <div class="mode-change">
        <!-- <h1 class="user-title">{{ username }}</h1>
        <div class="user-bio">Bio: {{ bio }}</div> -->
        <div class="columns">
            
            <div class="column">
            <form @submit.prevent="handleSubmit">
            <h1><b style="font-size: 26px;">Enter User Information</b></h1>
            <!-- firstname -->
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">First Name</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <input class="input" type="text" name="firstname" id="firstname" v-model="firstname"
                                placeholder="Enter your firstname">
                        </div>
                    </div>
                </div>
            </div>

            <!-- lastname -->
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Last Name</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <input class="input" type="text" name="lastname" id="lastname" v-model="lastname"
                                placeholder="Enter your lastname">
                        </div>
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
                            <input class="input" type="text" name="email" id="email" v-model="email"
                                placeholder="Enter an email address">
                        </div>
                    </div>
                </div>
            </div>

            <!-- age -->
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Age</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <input class="input" type="text" name="age" id="age" v-model="age" placeholder="Enter your age">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bio -->
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Bio</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <textarea class="textarea" name="biotext" placeholder="Write a bio" v-model="biotext"
                                id="biotext"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <!-- submit button -->
            <div class="field is-horizontal">
                <div class="field-label">
                    <!-- left empty for spacing -->
                </div>

                <div class="field-body">
                    <div class="field">
                        <div class="control has-text-centered">
                            <input type="submit" value="Save" class="button is-black is-rounded" id="submit_login">
                        </div>
                    </div>
                </div>
            </div>
        </form>
            </div>
            <div class="column">
                <h1><b style="font-size: 26px;">Current User Information</b></h1>
                <!--  -->
                <div class="info">
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Username:</label>
                    </div>
                    <div class="field-label is-normal">
                        <label class="label">{{this.userData.username}}</label>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Bio:</label>
                    </div>
                    <div class="field-label is-normal">
                        <label class="label" ref="biozone">test</label>
                    </div>
                </div>
                </div>
                <!--  -->
                <div style="padding-top:5rem;">
                    <h1><b style="font-size: 26px;">Total Posts:</b></h1>
                    <D3Chart/>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
body {
    background-color: white;
    font-family: 'Bad Script', cursive;
}
.info{
    float: center;
    margin-right: 15rem;
}
.float-right{
    width: 75rem;
    float: right;
}
.float-left{
    float: left;
}
.mode-change {
    color: black;
}



.field {
    align-items: center;
    margin: auto;
    width: 40%;
    margin-bottom: 20px;
}

.textarea {
    height: 200px;
}
</style>

<script>
import { useResponseStore, userStore } from '@/dataStore';
import axios from 'axios';
import D3Chart from '../../src/components/D3Chart.vue'

export default {
    name: "SignupComponent",
        components: {
        D3Chart
    },
    data() {
        return {
            firstname: '',
            lastname: '',
            email: '',
            age: '',
            biotext: '',
        }
    },
    setup() {
        const userbio = "test"
        const responseStores = useResponseStore()
        const userData = userStore()
        return { responseStores, userData, userbio}
    },
    methods: {
        // getuserdata(){
        //     axios.get('http://localhost:3500/CreateBlog')
        //         .then((response) => {
        //             //let temp = response.data.data;
                
        //         })
        //         .catch((error) => {console.log(error)})
        // },
        handleSubmit() {
            if(this.userData.username == ""){
                this.responseStores.setMessage("You must be logged in to do that!")
                this.responseStores.setSuccess("false")
                return;
            }
            axios.post('http://127.0.0.1:3500/aboutme', {
                'username': this.userData.username,
                'firstname': this.firstname,
                'lastname': this.lastname,
                'email': this.email,
                'age': this.age,
                'biotext': this.biotext
            }
            )
                .then(response => {
                    const data = response.data
                    this.responseStores.setMessage(data.message)
                    this.responseStores.setSuccess("" + data.success)

                    if (data.success) {
                        this.$router.push("/blog");
                    }
                })
        },
        getuserdata(){
            axios.get("http://localhost:3500/getProfile")
                .then(response => { 
                //console.log(response.data);
                    this.posts = response.data.data;
                    for (let key in this.posts){
                        if (this.posts[key].username == this.userData.username){
                            console.log(this.posts[key].biotext)
                            this.userbio = this.posts[key].biotext
                        }
                        //console.log(this.posts[key].username)
                        console.log(this.userbio)
                    }
                })
                .catch(error =>{ 
            console.log(error);
        });
        },
        changebiozone(){
            this.$refs.biozone.innerText = this.userbio
            console.log("CHANGE")
        }
    },
    mounted(){
        this.getuserdata()
        console.log(this.userbio)
        setTimeout(this.changebiozone,100)
    }
}



</script>