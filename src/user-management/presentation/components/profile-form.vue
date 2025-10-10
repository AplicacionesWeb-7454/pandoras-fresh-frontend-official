<template>
  <form @submit.prevent="$emit('submit', { name, email })" class="flex flex-col gap-4 w-80">
    <input v-model="name" type="text" placeholder="Name" class="border p-2 rounded" />
    <input v-model="email" type="email" placeholder="Email" class="border p-2 rounded" />
    <button type="submit" class="bg-green-600 text-white py-2 rounded">Save</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
const email = ref('')
</script>
