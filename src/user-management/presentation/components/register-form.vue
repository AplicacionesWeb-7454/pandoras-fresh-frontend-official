<template>
  <form @submit.prevent="$emit('submit', { name, email, password })" class="flex flex-col gap-4 w-80">
    <input v-model="name" type="text" placeholder="Nombre" class="border p-2 rounded" />
    <input v-model="email" type="email" placeholder="Correo electrónico" class="border p-2 rounded" />
    <input v-model="password" type="password" placeholder="Contraseña" class="border p-2 rounded" />
    <button type="submit" class="bg-green-600 text-white py-2 rounded">Registrar</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
const email = ref('')
const password = ref('')
</script>
