import { ref } from "vue"
import type { Basket } from "../types/basket"
import type { CheckoutPayload } from "../types/payment"

const basket = ref<Basket | null>(null)

const loadingBasket = ref(false)
const applyingCoupon = ref(false)
const processingCheckout = ref(false)


// TODO CLEAN HERE

// export const useBasket = () => {
  
//   const fetchBasket = async () => {
//     loadingBasket.value = true

//     const res = await fetch("/api/basket")
//     basket.value = await res.json()

//     loadingBasket.value = false
//   }

//   const applyCoupon = async (code: string) => {
//     if (!basket.value) return

//     applyingCoupon.value = true

//     const res = await fetch(`/api/basket/${basket.value.id}/coupon`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ code })
//     })

//     const data = await res.json()

//     applyingCoupon.value = false

//     if (!res.ok) {
//       throw new Error(data.message || "Invalid coupon")
//     }

//     basket.value = data
//   }

//   const checkout = async (payload: any) => {
//     if (!basket.value) return

//     processingCheckout.value = true

//     const res = await fetch(`/api/basket/${basket.value.id}/checkout`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(payload)
//     })

//     const data = await res.json()

//     processingCheckout.value = false

//     if (!res.ok) {
//       throw new Error("Checkout failed")
//     }

//     return data
//   }

//   return {
//     basket,

//     loadingBasket,
//     applyingCoupon,
//     processingCheckout,

//     fetchBasket,
//     applyCoupon,
//     checkout
//   }
// }






export const useBasket = () => {

  const fetchBasket = async () => {

    loadingBasket.value = true

    try {

      const res = await fetch("/api/basket")

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Failed to load basket")
      }

      basket.value = data

    } finally {
      loadingBasket.value = false
    }

  }


  const applyCoupon = async (code: string) => {

    if (!basket.value) return

    applyingCoupon.value = true

    try {

      const res = await fetch(`/api/basket/${basket.value.id}/coupon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Invalid coupon")
      }

      if (!res.ok) {
        // invalid coupon
        if (res.status === 400) {
          throw new Error(data.message)
        }
        // any other error
        throw new Error("Coupon not applied - server error")
     }

      basket.value = data

    } finally {
      applyingCoupon.value = false
    }

  }


  const checkout = async (payload: CheckoutPayload) => {

    if (!basket.value) return

    processingCheckout.value = true

    try {

      const res = await fetch(`/api/basket/${basket.value.id}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Checkout failed")
      }

      return data

    } finally {
      processingCheckout.value = false
    }

  }


  return {
    basket,

    loadingBasket,
    applyingCoupon,
    processingCheckout,

    fetchBasket,
    applyCoupon,
    checkout
  }
}