<script setup lang="ts">
import { reactive } from "vue"
import router from "../router"
import { useBasket } from "../composables/useBasket"

const { checkout } = useBasket()

const form = reactive({
  email: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
  postalCode: "",
  nameOnCard: ""
})

const submit = async () => {

  const mockedPayload = {
    cardCvc: "123",
    cardExpiry: "01/24",
    cardNumber: "1111222233334444",    
    email: "john.doe@example.com",
    nameOnCard: "John Doe",
    postalCode: "SW1W 0NY"
  };

  // const payload = {
  //   cardCvc: form.cardCvc,
  //   cardExpiry: form.cardExpiry,
  //   cardNumber: form.cardNumber,
  //   email: form.email,
  //   nameOnCard: form.nameOnCard,
  //   postalCode: form.postalCode
  // };

  const res = await checkout(mockedPayload)
  // const res = await checkout(payload)
  // TODO: call endpoint with real form data

  if (res?.success) {
    router.push(`/complete/${res.transactionId}`)
  }

}

const formatCardNumber = (e: Event) => {
  const input = e.target as HTMLInputElement

  let value = input.value.replace(/\D/g, "") // remove non digits

  value = value.slice(0, 16) // max 16 digits

  const formatted = value.match(/.{1,4}/g)?.join(" ") || ""

  form.cardNumber = formatted
}

const formatExpiry = (e: Event) => {
  const input = e.target as HTMLInputElement

  let value = input.value.replace(/\D/g, "")

  if (value.length > 4) value = value.slice(0, 4)

  if (value.length >= 3) {
    value = value.slice(0, 2) + "/" + value.slice(2)
  }

  form.cardExpiry = value
}

const formatCvc = (e: Event) => {
  const input = e.target as HTMLInputElement

  let value = input.value.replace(/\D/g, "")
  value = value.slice(0, 4)

  form.cardCvc = value
}
</script>

<template>
  <div class="w-full mt-22 space-y-4">

    <div class="text-xs flex gap-2 mb-4">
      <span class="font-bold text-checkout-accent">Make Payment</span>
      <span class="text-xs text-checkout-gray">></span> 
      <span class="text-checkout-gray">Order Confirmed</span>
    </div>

    <form @submit.prevent="submit" class="space-y-4">

      <!-- EMAIL -->
      <div>
        <label class="text-xs font-bold">
          Email*
        </label>

        <input
          v-model="form.email"
          class="w-full bg-checkout-input-bg px-3 py-3 rounded text-xs mt-1 placeholder:text-checkout-input-placeholder"
          placeholder="Enter your email address"
        />
      </div>

      <!-- CARD -->
      <div>
        <label class="text-xs font-bold">
          Card number*
        </label>

        <input
          @input="formatCardNumber"
          v-model="form.cardNumber"
          class="w-full bg-checkout-input-bg px-3 py-3 rounded text-xs mt-1 placeholder:text-checkout-input-placeholder"
          placeholder="1234 5678 9101 1121"
          inputmode="numeric"
        />
      </div>

      <!-- ROW -->    
      <div class="grid grid-cols-3 gap-3">

        <div class="flex flex-col space-y-1">
          <label class="text-xs font-bold">
            Expiry date*
          </label>
          <input
            @input="formatExpiry"
            v-model="form.cardExpiry"
            class="bg-checkout-input-bg px-3 py-3 rounded text-xs mt-1 placeholder:text-checkout-input-placeholder"
            placeholder="MM/YY"
            inputmode="numeric"
          />
        </div>

        <div class="flex flex-col space-y-1">
          <label class="text-xs font-bold">
            CVC/CVV*
          </label>
          <input
            @input="formatCvc"
            v-model="form.cardCvc"
            class="bg-checkout-input-bg px-3 py-3 rounded text-xs mt-1 placeholder:text-checkout-input-placeholder"
            placeholder="123"
            inputmode="numeric"
          />
        </div>

        <div class="flex flex-col space-y-1">
          <label class="text-xs font-bold">
            Zip Code / Postal code*
          </label>
          <input
            v-model="form.postalCode"
            class="bg-checkout-input-bg px-3 py-3 rounded text-xs mt-1 placeholder:text-checkout-input-placeholder"
            placeholder="PO12 1AB"
          />
        </div>

      </div>

      <!-- NAME -->
      <div>
        <label class="text-xs font-bold">
          Name on card*
        </label>

        <input
          v-model="form.nameOnCard"
          class="w-full bg-checkout-input-bg px-3 py-3 rounded text-xs mt-1 placeholder:text-checkout-input-placeholder"
          placeholder="Enter your name as shown"
        />
      </div>

      <!-- BUTTON -->
      <button
        class="w-full bg-checkout-accent text-black py-2 rounded mt-2"
        type="submit"
      >
        Pay by Card
      </button>

    </form>


  </div>
</template>