<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4 text-red-600">Eliminar Cuenta</h1>
    <p class="mb-4">Esta acción es irreversible. ¿Seguro que deseas continuar?</p>
    <button @click="onDelete" class="bg-red-600 text-white py-2 px-4 rounded">Eliminar cuenta</button>
  </div>
</template>

<script setup>
import { deleteAccountUseCase } from '../../application/use-cases/delete-account.usecase'

async function onDelete() {
  await deleteAccountUseCase()
  alert('Cuenta eliminada')
}
</script>
