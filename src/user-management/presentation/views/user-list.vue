<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Usuarios</h1>
    <div class="mb-4">
      <input v-model="search" placeholder="Buscar..." class="border p-2 rounded w-64" />
      <button @click="load" class="ml-2 bg-green-600 text-white px-3 py-2 rounded">Search</button>
    </div>
    <table class="w-full text-left border">
      <thead>
      <tr>
        <th class="p-2 border">Name</th>
        <th class="p-2 border">Email</th>
        <th class="p-2 border">Role</th>
        <th class="p-2 border">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="u in users" :key="u.id">
        <td class="p-2 border">{{ u.name }}</td>
        <td class="p-2 border">{{ u.email }}</td>
        <td class="p-2 border">{{ (u.roles || [u.role]).join(', ') }}</td>
        <td class="p-2 border">
          <button @click="edit(u)" class="text-blue-600 mr-2">Edit</button>
          <role-selector :user="u" @change="assignRole(u.id, $event)" />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { userApi } from '../../infrastructure/api/user-api'
import { assignRoleUseCase } from '../../application/use-cases/assign-role.usecase'
import RoleSelector from '../components/role-selector.vue'

const users = ref([])
const search = ref('')

async function load() {
  users.value = await userApi.list({ q: search.value })
}
function edit(u) {
  // TODO: navegar a formulario o abrir modal
  alert(`Editar ${u.name} (stub)`)
}
async function assignRole(userId, role) {
  await assignRoleUseCase(userId, role)
  await load()
}
onMounted(load)
</script>
