import { defineStore } from "pinia";

export const useResponseStore = defineStore({
    id: 'response',
    state: () => ({
        message: '',
        success: "false"
    }),
    actions: {
        setMessage(message) {
            this.message = message
        },
        setSuccess(success){
            this.success = success
        },
        setData(data){
            this.message = data.message,
            this.success = data.success
        }
    }
})

export const userStore = defineStore({
    id: 'user',
    state: () => ({
        username: '',
        token: ''
    }),
    actions: {
        setUsername(username) {
            this.username = username
        },
        setToken(token){
            this.token = token
        },
    }
})