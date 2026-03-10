<script setup lang="ts">
import BasketProduct from "./BasketProduct.vue"
import type { Product } from "../types/basket"

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div class="lg:h-[40vh] flex flex-col">

    <p class="text-xs mb-4">
      Your order
    </p>

    <div class="space-y-4 mb-8 overflow-y-auto flex-1 lg:pr-6">

      <BasketProduct
        v-for="product in products"
        :key="product.name + product.quantity"
        :product="product"
      />

    </div>

  </div>
</template>