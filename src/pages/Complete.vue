<script setup lang="ts">
import { useRoute } from "vue-router"

const route = useRoute()
const transaction = route.params.transaction
</script>

<template>
  <div class="bg-black min-h-screen flex flex-col items-center text-white mt-14 gap-2">

    <div class="h-22">
      <img src="/img/logo.svg" class="h-10 mb-8"/>
    </div>

    <div class="border border-checkout-dark-gray pt-6 pb-5.5 px-44 text-center w-[40%]">

      <img
        src="/img/check.svg"
        class="mx-auto mb-2 w-12"
      />

      <h2 class="text-2xl font-bold mb-4">
        Order Complete
      </h2>

      <p class="text-checkout-light text-sm mb-4">
        Thank you for your payment. You will receive your purchased products shortly.
      </p>

      <div class="bg-checkout-black border border-checkout-dark-gray py-2 px-4 text-lg">
        <span class="font-bold">Order Number: </span>
        <span> {{ transaction }} </span> 
      </div>

    </div>

  </div>
</template>