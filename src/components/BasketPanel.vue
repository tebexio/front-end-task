<script setup lang="ts">
import { useBasket } from "../composables/useBasket"
import BasketSummary from "./BasketSummary.vue"
import CouponInput from "./CouponInput.vue"
import BasketTotals from "./BasketTotals.vue"

const { basket } = useBasket()
</script>

<template>
  <div v-if="basket">

    <div class="h-22">
      <img src="/img/logo.svg" class="h-12 mb-10"/>
    </div>

    <div class="flex flex-col gap-10 lg:gap-34">
      <BasketSummary :products="basket.products" />

      <div>
        <CouponInput />
        <BasketTotals :basket="basket" />
      </div>
    </div>

  </div>
</template>