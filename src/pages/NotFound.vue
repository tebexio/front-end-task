<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

const goHome = () => {
  router.push("/")
}
</script>

<template>
  <div class="bg-black min-h-screen flex flex-col items-center justify-center text-white text-center gap-6">

    <h1 class="text-3xl font-bold">
      404
    </h1>

    <p class="text-gray-400 text-sm">
      The page you are looking for does not exist.
    </p>

    <button
      @click="goHome"
      class="bg-checkout-accent text-black px-6 py-2 rounded"
    >
      Go to checkout
    </button>

  </div>
</template>