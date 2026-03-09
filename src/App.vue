<script lang="ts" setup>
import { Toaster } from "vue-sonner"
</script>

<template>
  <router-view :key="$route.fullPath"/>

  <Toaster
    position="top-right"
    richColors
  />
</template>
