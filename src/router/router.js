import Main from "@/pages/Main.vue";
import PostsPage from "@/pages/PostsPage.vue";
import About from "@/pages/About.vue";
import PostDetails from "@/pages/PostDetails.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostsPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostDetails
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;