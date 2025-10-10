<template>
  <form @submit.prevent="$emit('submit', { email, password, remember })" class="flex flex-col gap-4 w-80">
    <input v-model="email" type="email" placeholder="Correo electrónico" class="border p-2 rounded" />
    <input v-model="password" type="password" placeholder="Contraseña" class="border p-2 rounded" />
    <label class="text-sm">
      <input type="checkbox" v-model="remember" /> Remember me
    </label>
    <button type="submit" class="bg-green-600 text-white py-2 rounded">Enter</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const email = ref('')
const password = ref('')
const remember = ref(false)
</script>
