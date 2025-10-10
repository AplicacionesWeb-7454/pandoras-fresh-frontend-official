<template>
  <AuthLayout
      logo="/img/logo-pandora.png"
      image="/img/vegetales.jpg"
      title="Recover password"
      subtitle="Enter your email and we will send you instructions."
  >
    <!-- Formulario -->
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
            v-model="email"
            type="email"
            placeholder="example@email.com"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
        />
      </div>

      <button
          type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow-md font-semibold transition"
      >
        Enviar instrucciones
      </button>
    </form>

    <!-- Footer -->
    <p class="text-center text-sm text-gray-600 mt-6">
      Have you forgotten your password?
      <router-link to="/login" class="text-green-600 hover:underline">Sign in</router-link>
    </p>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import AuthLayout from '../components/AuthLayout.vue'
import { authApi } from '../../infrastructure/api/auth-api'

const email = ref('')

async function onSubmit() {
  if (!email.value) return alert('Please enter your email address')

  try {
    await authApi.resetPassword(email.value)
    alert('If the email exists, you will receive instructions to reset your password.')
  } catch (err) {
    alert('Error processing request')
  }
}
</script>
