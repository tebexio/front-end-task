<script setup lang="ts">
import type { Basket } from "../types/basket"

defineProps<{ basket: Basket }>()
</script>

<template>
  <div class="mt-8 space-y-3 text-xs">

    <div class="flex justify-between">
      <span>Subtotal:</span>
      <span>${{ basket.subTotal.toFixed(2) }}</span>
    </div>

    <div class="flex justify-between">
      <span>Sales Tax:</span>
      <span>${{ basket.salesTax.toFixed(2) }}</span>
    </div>

    <!-- DISCOUNT -->
    <div v-if="basket.couponCode" class="flex justify-between items-start">
      <div class="flex flex-col">
        <span>Discounts:</span>
        <span
          class="bg-neutral-600 text-white text-sm px-3 py-1 rounded-full mt-1 w-fit"
        >
          {{ basket.couponCode }}
        </span>
      </div>
      <!-- TODO: discount value is hardcoded - clarifications from BE needed -->
      <span class="text-right self-end">
        - $4.50
      </span>
    </div>

    <div class="flex justify-between font-bold text-xl mt-5">
      <span>Total price:</span>
      <span>${{ basket.total.toFixed(2) }}</span>
    </div>

  </div>
</template>