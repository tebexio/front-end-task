<script setup lang="ts">
import { reactive, computed } from "vue"
import router from "../router"
import { useBasket } from "../composables/useBasket"
import { z } from "zod"
import type { CheckoutPayload } from "../types/payment"
import { toast } from "vue-sonner"

const { checkout, processingCheckout  } = useBasket()

const form = reactive<CheckoutPayload>({
  email: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
  postalCode: "",
  nameOnCard: ""
})

const errors = reactive<Record<string, string>>({})

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  cardNumber: z
    .string()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Card number must contain 16 digits"),
  cardExpiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be MM/YY"),
  cardCvc: z
    .string()
    .min(3, "CVC must be 3 digits"),
  postalCode: z
    .string()
    .min(3, "Postal code required"),
  nameOnCard: z
  .string()
  .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters")
  .min(2, "Name required")
})

const isValid = computed(() => schema.safeParse(form).success)

const validateField = (field: keyof typeof form) => {
  const result = schema.safeParse(form)

  if (!result.success) {
    const issue = result.error.issues.find(
      i => i.path[0] === field
    )
    if (issue) {
      errors[field] = issue.message
      return
    }
  }
  delete errors[field]
}

const submit = async () => {
  Object.keys(errors).forEach(key => delete errors[key])
  const result = schema.safeParse(form)

  if (!result.success) {
    result.error.issues.forEach(issue => {
      const field = issue.path[0] as string
      errors[field] = issue.message
    })
    return
  }

  const payload = {
    ...form,
    cardNumber: form.cardNumber.replace(/\s/g, "")
  }

  try {
    const res = await checkout(payload)
    if (res?.success) {
      router.push(`/complete/${res.transactionId}`)
    } else {
      toast.error("Checkout failed. Please try again.")
    }
  } catch {
    toast.error("Checkout failed. Please try again.")
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
  <div class="w-full lg:mt-22 space-y-4">

    <div class="text-xs flex gap-2 mb-4">
      <span class="font-bold text-checkout-accent">Make Payment</span>
      <span class="text-xs text-checkout-gray">></span> 
      <span class="text-checkout-gray">Order Confirmed</span>
    </div>

    <form @submit.prevent="submit" class="space-y-4">

      <fieldset :disabled="processingCheckout" class="space-y-4">

        <!-- EMAIL -->
        <div>
          <label for="email" class="text-xs font-bold">
            Email*
          </label>

          <input
            id="email"
            name="email"
            autocomplete="email"
            v-model="form.email"
            @blur="validateField('email')"
            class="w-full bg-checkout-input-bg px-3 py-3 rounded text-xs mt-1 placeholder:text-checkout-input-placeholder"
            placeholder="Enter your email address"
          />

          <p v-if="errors.email" class="text-red-400 text-xs mt-1">
            {{ errors.email }}
          </p>
        </div>

        <!-- CARD -->
        <div>
          <label for="cardNumber" class="text-xs font-bold">
            Card number*
          </label>

          <input
            id="cardNumber"
            name="cardNumber"
            @input="formatCardNumber"
            v-model="form.cardNumber"
            @blur="validateField('cardNumber')"
            class="w-full bg-checkout-input-bg px-3 py-3 rounded text-xs mt-1 placeholder:text-checkout-input-placeholder"
            placeholder="1234 5678 9101 1121"
            inputmode="numeric"
          />
          <p v-if="errors.cardNumber" class="text-red-400 text-xs mt-1">
            {{ errors.cardNumber }}
          </p>
        </div>

        <!-- ROW -->    
        <div class="grid grid-cols-3 gap-3">

          <div class="flex flex-col space-y-1">
            <label for="cardExpiry" class="text-xs font-bold">
              Expiry date*
            </label>
            <input
              id="cardExpiry"
              name="cardExpiry"
              @input="formatExpiry"
              v-model="form.cardExpiry"
              @blur="validateField('cardExpiry')"
              class="bg-checkout-input-bg px-3 py-3 rounded text-xs mt-1 placeholder:text-checkout-input-placeholder"
              placeholder="MM/YY"
              inputmode="numeric"
            />
            <p v-if="errors.cardExpiry" class="text-red-400 text-xs mt-1">
              {{ errors.cardExpiry }}
            </p>
          </div>

          <div class="flex flex-col space-y-1">
            <label for="cardCvc" class="text-xs font-bold">
              CVC/CVV*
            </label>
            <input
              id="cardCvc"
              name="cardCvc"
              @input="formatCvc"
              v-model="form.cardCvc"
              @blur="validateField('cardCvc')"
              class="bg-checkout-input-bg px-3 py-3 rounded text-xs mt-1 placeholder:text-checkout-input-placeholder"
              placeholder="123"
              inputmode="numeric"
            />
            <p v-if="errors.cardCvc" class="text-red-400 text-xs mt-1">
              {{ errors.cardCvc }}
            </p>
          </div>

          <div class="flex flex-col space-y-1">            
            <label for="postalCode" class="text-xs font-bold">
              <span class="lg:hidden">Postal code*</span>
              <span class="hidden lg:inline">Zip Code / Postal code*</span>
            </label>
            <input
              id="postalCode"
              name="postalCode"
              v-model="form.postalCode"
              @blur="validateField('postalCode')"
              class="bg-checkout-input-bg px-3 py-3 rounded text-xs mt-1 placeholder:text-checkout-input-placeholder"
              placeholder="PO12 1AB"
            />
            <p v-if="errors.postalCode" class="text-red-400 text-xs mt-1">
              {{ errors.postalCode }}
            </p>
          </div>

        </div>

        <!-- NAME -->
        <div>
          <label for="nameOnCard" class="text-xs font-bold">
            Name on card*
          </label>

          <input
            id="nameOnCard"
            name="nameOnCard"
            v-model="form.nameOnCard"
            @blur="validateField('nameOnCard')"
            class="w-full bg-checkout-input-bg px-3 py-3 rounded text-xs mt-1 placeholder:text-checkout-input-placeholder"
            placeholder="Enter your name as shown"
          />
          <p v-if="errors.nameOnCard" class="text-red-400 text-xs mt-1">
              {{ errors.nameOnCard }}
            </p>
        </div>

      </fieldset>


      <!-- BUTTON -->
      <button
        :disabled="!isValid || processingCheckout"
        class="w-full bg-checkout-accent text-black py-2 rounded mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
        type="submit"
      >
        {{ processingCheckout ? "Processing payment..." : "Pay by Card" }}
      </button>

    </form>

  </div>
</template>