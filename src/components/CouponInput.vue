<script setup lang="ts">
import { ref } from "vue"
import { useBasket } from "../composables/useBasket"
import { toast } from "vue-sonner"

const code = ref("")
const error = ref("")

const { applyCoupon, applyingCoupon } = useBasket()

const submit = async () => {

  if (!code.value) return

  error.value = ""

  try {
    await applyCoupon(code.value)
    toast.success("Coupon applied")
  } catch (err: any) {
      if (err.message === "Coupon code not found") {
        error.value = "Invalid coupon code"
      } else {
        toast.error("Something went wrong. Coupon not applied.")
      }
  }

}
</script>

<template>
  <div class="mt-10">

    <p class="text-xs font-bold mb-1.5">
      Coupon/Gift Card
    </p>

    <div class="flex gap-2.5">

      <input
        id="coupon"
        name="coupon"
        v-model="code"
        class="flex-1 bg-checkout-input-bg px-3 py-3 rounded text-xs placeholder:text-checkout-input-placeholder"
        placeholder="Enter code here"
      />

      <button
        @click="submit"
        :disabled="applyingCoupon || !code"
        class="bg-white px-2 py-2 rounded cursor-pointer text-black text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
      >
        {{ applyingCoupon ? "Applying..." : "Confirm" }}
      </button>

    </div>

    <p v-if="error" class="text-red-500 text-xs mt-2">
      {{ error }}
    </p>

  </div>
</template>