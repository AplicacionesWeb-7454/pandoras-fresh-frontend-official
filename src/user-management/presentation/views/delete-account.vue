<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4 text-red-600">Delete Account</h1>
    <p class="mb-4">This action is irreversible. Are you sure you want to continue?</p>
    <button @click="onDelete" class="bg-red-600 text-white py-2 px-4 rounded">Delete Account</button>
  </div>
</template>

<script setup>
import { deleteAccountUseCase } from '../../application/use-cases/delete-account.usecase'

async function onDelete() {
  await deleteAccountUseCase()
  alert('Cuenta eliminada')
}
</script>
