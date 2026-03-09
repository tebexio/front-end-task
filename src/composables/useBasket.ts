import { ref } from "vue"
import type { Basket } from "../types/basket"

const basket = ref<Basket | null>(null)
const loading = ref(false)

export const useBasket = () => {

  const fetchBasket = async () => {
    loading.value = true

    const res = await fetch("/api/basket")
    basket.value = await res.json()

    loading.value = false
  }

  const applyCoupon = async (code: string) => {
    if (!basket.value) return

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

    basket.value = data
  }

  const checkout = async (payload: any) => {
    if (!basket.value) return

    const res = await fetch(`/api/basket/${basket.value.id}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    return await res.json()
  }

  return {
    basket,
    loading,
    fetchBasket,
    applyCoupon,
    checkout
  }
}