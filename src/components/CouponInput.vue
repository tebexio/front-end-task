<script setup lang="ts">
import { ref } from "vue"
import { useBasket } from "../composables/useBasket"

const code = ref("")
const applying = ref(false)
const error = ref("")

const { applyCoupon } = useBasket()

const submit = async () => {
  if (!code.value) return

  applying.value = true
  error.value = ""

  try {
    await applyCoupon(code.value)
  } catch {
    error.value = "Invalid coupon code"
  } finally {
    applying.value = false
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
        v-model="code"
        class="flex-1 bg-checkout-input-bg px-3 py-3 rounded text-xs placeholder:text-checkout-input-placeholder"
        placeholder="Enter code here"
      />

      <button
        @click="submit"
        :disabled="applying"
        class="bg-white px-2 py-2 rounded text-black text-xs disabled:opacity-50"
      >
        {{ applying ? "Applying..." : "Confirm" }}
      </button>

    </div>

    <p v-if="error" class="text-red-500 text-xs mt-2">
      {{ error }}
    </p>

  </div>
</template>