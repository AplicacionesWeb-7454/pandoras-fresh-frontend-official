<template>
  <AuthLayout
      logo="/img/logo-pandora.png"
      image="/img/vegetales.jpg"
      title="Create account"
      subtitle="We are happy to have you join us!"
  >
    <form @submit.prevent="onSubmit" class="card bg-base-100 shadow-xl p-6 space-y-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Company Name</span>
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
          <span class="label-text">Email</span>
        </label>
        <input v-model="email" type="email" placeholder="example@email.com" class="input input-bordered w-full" />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input v-model="password" type="password" placeholder="••••••••" class="input input-bordered w-full" />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Repeat password</span>
        </label>
        <input v-model="confirm" type="password" placeholder="••••••••" class="input input-bordered w-full" />
      </div>

      <div class="form-control">
        <label class="cursor-pointer label">
          <input type="checkbox" v-model="terms" class="checkbox checkbox-success mr-2" />
          <span class="label-text">I have read and accept the <a href="#" class="link link-success">Terms and Conditions</a></span>
        </label>
      </div>

      <button type="submit" class="btn btn-success w-full">Create Account</button>
    </form>

    <p class="text-center text-sm text-gray-600 mt-6">
      Already have an account?
      <router-link to="/login" class="link link-success">Login</router-link>
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
  if (!terms.value) return alert('You must accept the terms and conditions')
  if (password.value !== confirm.value) return alert('Passwords do not match')

  try {
    await authApi.register({
      company: company.value,
      ruc: ruc.value,
      email: email.value,
      password: password.value
    })
    alert('Account created successfully')
  } catch (err) {
    alert('Error registering')
  }
}
</script>
