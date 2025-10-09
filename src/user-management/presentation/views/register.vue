<template>
  <AuthLayout
      logo="/img/logo-pandora.png"
      image="/img/vegetales.jpg"
      title="Crear cuenta"
      subtitle="¡Estamos felices de que te unas!"
  >
    <form @submit.prevent="onSubmit" class="card bg-base-100 shadow-xl p-6 space-y-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Nombre de la Empresa</span>
        </label>
        <input v-model="company" type="text" placeholder="Pandora Fresh" class="input input-bordered w-full" />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">RUC</span>
        </label>
        <input v-model="ruc" type="text" placeholder="12345678901" class="input input-bordered w-full" />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Correo electrónico</span>
        </label>
        <input v-model="email" type="email" placeholder="ejemplo@correo.com" class="input input-bordered w-full" />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Contraseña</span>
        </label>
        <input v-model="password" type="password" placeholder="••••••••" class="input input-bordered w-full" />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Repetir contraseña</span>
        </label>
        <input v-model="confirm" type="password" placeholder="••••••••" class="input input-bordered w-full" />
      </div>

      <div class="form-control">
        <label class="cursor-pointer label">
          <input type="checkbox" v-model="terms" class="checkbox checkbox-success mr-2" />
          <span class="label-text">He leído y acepto los <a href="#" class="link link-success">Términos y Condiciones</a></span>
        </label>
      </div>

      <button type="submit" class="btn btn-success w-full">Crear Cuenta</button>
    </form>

    <p class="text-center text-sm text-gray-600 mt-6">
      ¿Ya tienes una cuenta?
      <router-link to="/login" class="link link-success">Inicia sesión</router-link>
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
    await authApi.register({
      company: company.value,
      ruc: ruc.value,
      email: email.value,
      password: password.value
    })
    alert('Cuenta creada con éxito')
  } catch (err) {
    alert('Error al registrar')
  }
}
</script>
