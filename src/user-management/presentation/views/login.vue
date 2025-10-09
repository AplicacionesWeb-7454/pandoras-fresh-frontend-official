<template>
  <AuthLayout
      logo="/img/logo-pandora.png"
      image="/img/vegetales.jpg"
      title="Iniciar Sesión"
      subtitle="¡Nos alegra tenerte de vuelta!"
  >
    <!-- Formulario -->
    <form @submit.prevent="onSubmit" class="card bg-base-100 shadow-xl p-6 space-y-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Correo electrónico</span>
        </label>
        <input
            v-model="email"
            type="email"
            placeholder="ejemplo@correo.com"
            class="input input-bordered w-full"
        />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Contraseña</span>
        </label>
        <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="input input-bordered w-full"
        />
        <label class="label">
          <router-link to="/forgot-password" class="label-text-alt link link-success">
            ¿Olvidó su contraseña?
          </router-link>
        </label>
      </div>

      <button type="submit" class="btn btn-success w-full">Iniciar Sesión</button>
    </form>

    <!-- Separador -->
    <div class="divider">o</div>

    <!-- Botones sociales -->
    <div class="flex gap-4 justify-center">
      <button class="btn btn-outline w-full flex items-center gap-2">
        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="" class="w-5 h-5" />
        Google
      </button>
      <button class="btn btn-outline w-full flex items-center gap-2">
        <img src="https://www.svgrepo.com/show/303145/microsoft.svg" alt="" class="w-5 h-5" />
        Microsoft
      </button>
    </div>

    <!-- Footer -->
    <p class="text-center text-sm text-gray-600 mt-6">
      ¿No tienes una cuenta?
      <router-link to="/register" class="link link-success">Crea una</router-link>
    </p>
  </AuthLayout>
  <button class="btn btn-success">Probar DaisyUI</button>

</template>

<script setup>
import { ref } from 'vue'
import AuthLayout from '../components/AuthLayout.vue'
import { loginUseCase } from '../../application/use-cases/login.usecase'

const email = ref('')
const password = ref('')

async function onSubmit() {
  try {
    await loginUseCase(email.value, password.value)
    alert('Sesión iniciada')
  } catch (err) {
    alert('Error al iniciar sesión')
  }
}
</script>
