import { createRouter, createWebHistory } from "vue-router"

import Checkout from "../pages/Checkout.vue"
import Complete from "../pages/Complete.vue"
import NotFound from "../pages/NotFound.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Checkout
    },
    {
      path: "/complete/:transaction",
      component: Complete,
      // Guard: ensure the route contains a valid-looking transaction id.
      // Since the API does not provide an endpoint to verify transactions,this only prevents malformed URLs (e.g. /complete/abc).
      beforeEnter: (to) => {
        const tx = to.params.transaction?.toString()
        if (!tx || !tx.startsWith("tbx-")) {
          return "/"
        }
      }    
    },
    {
      path: "/404",
      component: NotFound
    },
    // Catch-all route to handle undefined paths and redirect to 404 page
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404"
    }
  ]
})

export default router