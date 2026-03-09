<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useBasket } from "../composables/useBasket"
import BasketPanel from "../components/BasketPanel.vue"
import CheckoutForm from "../components/CheckoutForm.vue"
import { toast } from "vue-sonner"
import { useRouter } from "vue-router"

const { fetchBasket } = useBasket()

const router = useRouter()

onMounted(async () => {
  try {
    await fetchBasket()
  } catch (err: any) {
    loadError.value = true
    toast.error(err.message || "Failed to load basket")
  }
})

const loadError = ref(false)

const retryCheckout = () => {
  router.push("/").then(() => {
    router.go(0)
  })
}
</script>

<template>

  <!-- ERROR STATE -->
  <div
    v-if="loadError"
    class="bg-black min-h-screen text-white flex flex-col items-center justify-center gap-4"
  >

    <p class="text-lg font-semibold">
      Failed to load checkout
    </p>

    <p class="text-gray-400 text-sm">
      Please refresh the page or try again later.
    </p>

    <button
      class="bg-checkout-accent text-black px-4 py-2 rounded cursor-pointer"
      @click="retryCheckout"
    >
      Reload
    </button>

  </div>


  <!-- NORMAL CHECKOUT -->
  <div v-if="!loadError" class="grid grid-cols-1 lg:grid-cols-2 min-h-screen border-t-2 border-checkout-accent">

    <!-- LEFT PANEL -->
    <div class="bg-checkout-black text-white flex justify-center">
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