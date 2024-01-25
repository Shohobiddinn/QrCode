import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:catchAll(.*)',
            name: 'Not found',
            component: () => import('../components/NoteFound/index.vue')
        },
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/Home/home.vue')
        },

    ]
})

export default router
