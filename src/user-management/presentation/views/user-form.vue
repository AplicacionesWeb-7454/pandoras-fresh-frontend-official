<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Crear Usuario</h1>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-4 w-96">
      <input v-model="name" type="text" placeholder="Nombre" class="border p-2 rounded" />
      <input v-model="email" type="email" placeholder="Correo" class="border p-2 rounded" />
      <input v-model="password" type="password" placeholder="Contraseña" class="border p-2 rounded" />
      <role-selector @change="(r) => role = r" />
      <button type="submit" class="bg-green-600 text-white py-2 rounded">Guardar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userApi } from '../../infrastructure/api/user-api'
import RoleSelector from '../components/role-selector.vue'

const name = ref('')
const email = ref('')
const password = ref('')
let role = 'empleado'

async function onSubmit() {
  await userApi.create({ name: name.value, email: email.value, password: password.value, role })
  alert('Usuario creado')
}
</script>
