<template>
  <AuthLayout
      logo="/img/logo-pandora.png"
      image="/img/vegetales.jpg"
      title="Recuperar contraseña"
      subtitle="Ingresa tu correo y te enviaremos instrucciones"
  >
    <!-- Formulario -->
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Correo electrónico</label>
        <input
            v-model="email"
            type="email"
            placeholder="ejemplo@correo.com"
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
      ¿Ya recordaste tu contraseña?
      <router-link to="/login" class="text-green-600 hover:underline">Inicia sesión</router-link>
    </p>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import AuthLayout from '../components/AuthLayout.vue'
import { authApi } from '../../infrastructure/api/auth-api'

const email = ref('')

async function onSubmit() {
  if (!email.value) return alert('Por favor ingresa tu correo electrónico')

  try {
    await authApi.resetPassword(email.value)
    alert('Si el correo existe, recibirás instrucciones para restablecer tu contraseña')
  } catch (err) {
    alert('Error al procesar la solicitud')
  }
}
</script>
