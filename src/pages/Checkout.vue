<script setup lang="ts">
import { onMounted } from "vue"
import { useBasket } from "../composables/useBasket"

import BasketPanel from "../components/BasketPanel.vue"
import CheckoutForm from "../components/CheckoutForm.vue"

const { fetchBasket } = useBasket()

onMounted(fetchBasket)
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 min-h-screen border-t-2 border-checkout-accent">

    <!-- LEFT PANEL -->
    <div class="bg-checkout-dark-gray text-white flex justify-center">
      <div class="w-full ps-40 pe-30 py-8">
        <BasketPanel />
      </div>
    </div>

    <!-- RIGHT PANEL -->
    <div class="bg-black text-white flex justify-center">
      <div class="w-full ps-30 pe-40 py-8">
        <CheckoutForm />
      </div>
    </div>

  </div>
</template>