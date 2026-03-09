import { describe, test, expect, vi, beforeEach } from "vitest"
import { useBasket } from "../../composables/useBasket"

globalThis.fetch = vi.fn() as any

describe("useBasket", () => {

  beforeEach(() => {
    vi.clearAllMocks()
    const { basket } = useBasket()
    basket.value = null
  })

  test("fetchBasket loads basket data", async () => {

    const mockBasket = {
      id: "1",
      products: [
        {
          name: "Medium Booster",
          price: 9.99,
          image: "medium_booster.png",
          quantity: 1
        }
      ],
      couponCode: null,
      subTotal: 10,
      salesTax: 2,
      total: 12
    }

    ;(fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockBasket
    })

    const { fetchBasket, basket } = useBasket()

    await fetchBasket()

    expect(fetch).toHaveBeenCalledWith("/api/basket")
    expect(basket.value).toEqual(mockBasket)
  })


  test("fetchBasket throws error when API fails", async () => {

    ;(fetch as any).mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Failed" })
    })

    const { fetchBasket } = useBasket()

    await expect(fetchBasket()).rejects.toThrow("Failed")
    expect(fetch).toHaveBeenCalledWith("/api/basket")
  })


  test("applyCoupon updates basket", async () => {

    const basketResponse = {
      id: "1",
      products: [
        {
          name: "Medium Booster",
          price: 9.99,
          image: "medium_booster.png",
          quantity: 1
        }
      ],
      couponCode: "25OFF",
      subTotal: 10,
      salesTax: 2,
      total: 12
    }

    ;(fetch as any).mockResolvedValue({
      ok: true,
      json: async () => basketResponse
    })

    const { applyCoupon, basket } = useBasket()

    basket.value = { id: "1" } as any

    await applyCoupon("25OFF")

    expect(fetch).toHaveBeenCalledWith(
      "/api/basket/1/coupon",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: "25OFF" })
      })
    )

    expect(basket.value!.couponCode).toBe("25OFF")
  })


  test("applyCoupon throws error for invalid coupon", async () => {

    ;(fetch as any).mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ message: "Invalid coupon" })
    })

    const { applyCoupon, basket } = useBasket()

    basket.value = { id: "1" } as any

    await expect(applyCoupon("BAD")).rejects.toThrow("Invalid coupon")

    expect(fetch).toHaveBeenCalledWith(
      "/api/basket/1/coupon",
      expect.objectContaining({
        method: "POST"
      })
    )
  })


  test("checkout returns transactionId after successful payment", async () => {

    const response = {
      success: true,
      transactionId: "tbx-6a6da59ebfa86d3d106fb68be75c0fd7"
    }

    ;(fetch as any).mockResolvedValue({
      ok: true,
      json: async () => response
    })

    const { checkout, basket } = useBasket()

    basket.value = { id: "1" } as any

    const payload = {
      cardCvc: "123",
      cardExpiry: "01/24",
      cardNumber: "1111222233334444",
      email: "john.doe@example.com",
      nameOnCard: "John Doe",
      postalCode: "SW1W 0NY"
    }

    const result = await checkout(payload)

    expect(result).toMatchObject({
      success: true,
      transactionId: "tbx-6a6da59ebfa86d3d106fb68be75c0fd7"
    })

    expect(fetch).toHaveBeenCalledWith(
      "/api/basket/1/checkout",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
    )
  })


  test("checkout throws error when API fails", async () => {

    ;(fetch as any).mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Checkout failed" })
    })

    const { checkout, basket } = useBasket()

    basket.value = { id: "1" } as any

    await expect(checkout({} as any)).rejects.toThrow("Checkout failed")

    expect(fetch).toHaveBeenCalledWith(
      "/api/basket/1/checkout",
      expect.objectContaining({
        method: "POST"
      })
    )
  })

})