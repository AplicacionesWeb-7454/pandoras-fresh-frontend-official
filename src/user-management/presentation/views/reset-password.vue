<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-xl font-bold mb-4">Reset password</h1>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-4 w-80">
      <input v-model="password" type="password" placeholder="New Password" class="border p-2 rounded" />
      <input v-model="confirm" type="password" placeholder="Confirm Password" class="border p-2 rounded" />
      <button type="submit" class="bg-green-600 text-white py-2 rounded">Restore</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// TODO: conectar con API /auth/reset-password/confirm usando token de URL
const password = ref('')
const confirm = ref('')
async function onSubmit() {
  if (password.value !== confirm.value) return alert('Passwords do not match')
  alert('Password reset (stub)')
}
</script>
