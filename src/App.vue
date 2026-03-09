<script lang="ts" setup>
import { Toaster } from "vue-sonner"
</script>

<template>
  <router-view />

  <Toaster
    position="top-right"
    richColors
  />
</template>
