<script setup lang="ts">
import { useRoute } from "vue-router"

const route = useRoute()
</script>

<template>
  <div class="bg-black min-h-screen flex items-center justify-center text-white">

    <div class="border border-gray-700 p-10 text-center w-[420px]">

      <img
        src="/img/check.svg"
        class="mx-auto mb-4 w-8"
      />

      <h2 class="text-xl font-semibold mb-2">
        Order Complete
      </h2>

      <p class="text-gray-400 text-sm mb-4">
        Thank you for your payment. You will receive your purchased products shortly.
      </p>

      <div class="bg-[#2a2a2a] py-2 px-4 text-sm rounded">
        Order Number: {{ route.query.tx }}
      </div>

    </div>

  </div>
</template>