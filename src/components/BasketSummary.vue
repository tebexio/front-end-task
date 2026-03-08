<script setup lang="ts">
import BasketProduct from "./BasketProduct.vue"
import type { Product } from "../types/basket"

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div>

    <p class="text-xs mb-4">
      Your order
    </p>

    <div class="space-y-4 mb-8">

      <BasketProduct
        v-for="product in products"
        :key="product.name + product.quantity"
        :product="product"
      />

    </div>

  </div>
</template>