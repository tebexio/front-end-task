import { createRouter, createWebHistory } from "vue-router"

import Checkout from "../pages/Checkout.vue"
import Complete from "../pages/Complete.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Checkout
    },
    {
      path: "/complete",
      component: Complete
    }
  ]
})

export default router