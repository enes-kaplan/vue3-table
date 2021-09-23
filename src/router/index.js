import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '/src/components/HelloWorld.vue'
import MyTable from '/src/components/MyTable.vue'

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/table',
    name: 'MyTable',
    component: MyTable
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
