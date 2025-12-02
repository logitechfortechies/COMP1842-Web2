import { createRouter, createWebHistory } from 'vue-router' //
import Posts from '@/views/Posts.vue'
import NewPost from '@/views/NewPost.vue'
import EditPost from '@/views/EditPost.vue'
import TestPage from '@/views/TestPage.vue' 

const routes = [
  {
    path: '/',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/posts/new',
    name: 'NewPost',
    component: NewPost
  },
  {
    path: '/posts/:id',
    name: 'EditPost',
    component: EditPost
  },
  {
    path: '/test',
    name: 'TestPage',
    component: TestPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router