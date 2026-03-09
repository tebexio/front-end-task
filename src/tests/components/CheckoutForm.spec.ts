import { mount } from "@vue/test-utils"
import { describe, test, expect, vi, beforeEach } from "vitest"
import CheckoutForm from "../../components/CheckoutForm.vue"
import { useBasket } from "../../composables/useBasket"

vi.mock("../../composables/useBasket")
vi.mock("../../router", () => ({
  default: {
    push: vi.fn()
  }
}))

vi.mock("vue-sonner", () => ({
  toast: {
    error: vi.fn()
  }
}))

describe("CheckoutForm", () => {

  const checkoutMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    ;(useBasket as any).mockReturnValue({
      checkout: checkoutMock,
      processingCheckout: false
    })
  })


  test("renders form fields", () => {

    const wrapper = mount(CheckoutForm)

    expect(wrapper.find("input[placeholder='Enter your email address']").exists()).toBe(true)
    expect(wrapper.find("input[placeholder='1234 5678 9101 1121']").exists()).toBe(true)
    expect(wrapper.find("input[placeholder='MM/YY']").exists()).toBe(true)
    expect(wrapper.find("input[placeholder='123']").exists()).toBe(true)
    expect(wrapper.find("input[placeholder='PO12 1AB']").exists()).toBe(true)
    expect(wrapper.find("input[placeholder='Enter your name as shown']").exists()).toBe(true)    
  })


  test("submit button disabled when form invalid", () => {

    const wrapper = mount(CheckoutForm)

    const button = wrapper.find("button")

    expect(button.attributes("disabled")).toBeDefined()
  })


  test("calls checkout with formatted payload", async () => {

    checkoutMock.mockResolvedValue({
      success: true,
      transactionId: "tx123"
    })

    const wrapper = mount(CheckoutForm)

    await wrapper.find("input[placeholder='Enter your email address']")
      .setValue("john@test.com")

    await wrapper.find("input[placeholder='1234 5678 9101 1121']")
      .setValue("1111 2222 3333 4444")

    await wrapper.find("input[placeholder='MM/YY']")
      .setValue("01/24")

    await wrapper.find("input[placeholder='123']")
      .setValue("123")

    await wrapper.find("input[placeholder='PO12 1AB']")
      .setValue("SW1W 0NY")

    await wrapper.find("input[placeholder='Enter your name as shown']")
      .setValue("John Doe")

    await wrapper.find("form").trigger("submit.prevent")

    expect(checkoutMock).toHaveBeenCalled()

    const payload = checkoutMock.mock.calls[0][0]

    expect(payload.cardNumber).toBe("1111222233334444")
  })

  
})