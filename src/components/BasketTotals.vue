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


    <div class="flex justify-between font-bold text-xl">
      <span>Total price:</span>
      <span>${{ basket.total.toFixed(2) }}</span>
    </div>

  </div>
</template>