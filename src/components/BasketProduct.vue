<script setup lang="ts">
import type { Product } from "../types/basket"

defineProps<{ product: Product }>()

</script>

<template>
  <div class="flex items-center justify-between my-4">

    <div class="flex items-center gap-1">

      <img
        :src="`/img/products/${product.image}`"
        class="w-10 h-10"
      />

      <div>

        <p class="text-sm font-semibold">
          {{ product.name }}
        </p>

        <p class="text-xs">
          Qty: {{ product.quantity }}
        </p>

      </div>

    </div>

    <p class="text-xs self-end">
      ${{ product.price.toFixed(2) }} USD
    </p>

  </div>
</template>