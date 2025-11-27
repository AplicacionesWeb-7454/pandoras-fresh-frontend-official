<template>
  <AuthLayout
      logo="/img/logo-pandora.png"
      image="/img/vegetales.jpg"
      title="Login"
      subtitle="We're glad to have you back!"
  >
    <!-- Formulario -->
    <form @submit.prevent="onSubmit" class="card bg-base-100 shadow-xl p-6 space-y-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input
            v-model="email"
            type="email"
            placeholder="example@email.com"
            class="input input-bordered w-full"
        />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Password</span>
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

      <button type="submit" class="btn btn-success w-full">Login</button>
    </form>

    <!-- Separador -->
    <div class="divider">o</div>

    <!-- Footer -->
    <p class="text-center text-sm text-gray-600 mt-6">
      Don't have an account?
      <router-link to="/register" class="link link-success">Create account</router-link>
    </p>
  </AuthLayout>


</template>

<script setup>
import { ref } from 'vue'
import AuthLayout from '../components/AuthLayout.vue'
import { loginUseCase } from '../../application/use-cases/login.usecase'
import { useRouter } from 'vue-router'
const router = useRouter()

const email = ref('')
const password = ref('')

async function onSubmit() {
  try {
    await loginUseCase(email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    alert('Login error')
  }
}
</script>
