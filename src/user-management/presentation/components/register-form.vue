<template>
  <form @submit.prevent="$emit('submit', { name, email, password })" class="flex flex-col gap-4 w-80">
    <input v-model="name" type="text" placeholder="Name" class="border p-2 rounded" />
    <input v-model="email" type="email" placeholder="Email" class="border p-2 rounded" />
    <input v-model="password" type="password" placeholder="Password" class="border p-2 rounded" />
    <button type="submit" class="bg-green-600 text-white py-2 rounded">Register</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
const email = ref('')
const password = ref('')
</script>
