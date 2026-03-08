import { ref } from "vue"

interface Product {
  name: string
  price: number
  image: string
  quantity: number
}

interface Basket {
  id: string
  products: Product[]
  couponCode: string | null
  subTotal: number
  salesTax: number
  total: number
}

const basket = ref<Basket | null>(null)
const loading = ref(false)

export const useBasket = () => {

  const fetchBasket = async () => {
    loading.value = true

    const res = await fetch("/api/basket")
    basket.value = await res.json()

    loading.value = false
  }

  // const applyCoupon = async (code: string) => {
  //   if (!basket.value) return

  //   const res = await fetch(`/api/basket/${basket.value.id}/coupon`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ code })
  //   })

  //   basket.value = await res.json()
  // }

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

  return {
    basket,
    loading,
    fetchBasket,
    applyCoupon
  }
}