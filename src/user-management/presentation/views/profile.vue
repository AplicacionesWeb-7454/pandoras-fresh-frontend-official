<template>
  <AuthLayout
      logo="/img/logo-pandora.png"
      image="/img/vegetales.jpg"
      title="Crear cuenta"
      subtitle="¡Estamos felices de que te nos unas!"
  >
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Nombre de la Empresa</label>
        <input v-model="company" type="text" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">RUC</label>
        <input v-model="ruc" type="text" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Correo electrónico</label>
        <input v-model="email" type="email" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Contraseña</label>
        <input v-model="password" type="password" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Repetir contraseña</label>
        <input v-model="confirm" type="password" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400" />
      </div>

      <div class="flex items-center">
        <input type="checkbox" v-model="terms" class="mr-2" />
        <span class="text-sm text-gray-600">He leído y acepto los <a href="#" class="text-green-600 underline">Términos y Condiciones</a></span>
      </div>

      <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow-md">
        Crear Cuenta
      </button>
    </form>

    <p class="text-center text-sm text-gray-600 mt-6">
      ¿Ya tienes una cuenta?
      <router-link to="/login" class="text-green-600 hover:underline">Inicia sesión</router-link>
    </p>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import AuthLayout from '../components/AuthLayout.vue'
import { authApi } from '../../infrastructure/api/auth-api'

const company = ref('')
const ruc = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const terms = ref(false)

async function onSubmit() {
  if (!terms.value) return alert('Debes aceptar los términos y condiciones')
  if (password.value !== confirm.value) return alert('Las contraseñas no coinciden')

  try {
    await authApi.register({ company: company.value, ruc: ruc.value, email: email.value, password: password.value })
    alert('Cuenta creada con éxito')
  } catch (err) {
    alert('Error al registrar')
  }
}
</script>
