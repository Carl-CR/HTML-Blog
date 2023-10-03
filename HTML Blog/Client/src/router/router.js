import { createRouter, createWebHistory } from "vue-router"

import HomeView from "../../public/views/HomeView.vue"

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: ()=> import("../../public/views/LoginView.vue")
    },
    {
        path: '/signup',
        name: 'signup',
        component: ()=> import("../../public/views/SignupView.vue")
    },
    {
        path: '/blog',
        name: 'blog',
        component: ()=> import("../../public/views/BlogView.vue")
    },
    {
        path: '/group-members',
        name: 'group',
        component: ()=> import("../../public/views/GroupView.vue")
    },
    {
        path: '/create-post',
        name: 'create',
        component: ()=> import("../../public/views/CreatePostView.vue")
    },
    {
        path: '/about-me',
        name: 'about',
        component: ()=> import("../../public/views/AboutMeView.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;