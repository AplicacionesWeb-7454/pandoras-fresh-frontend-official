<template>
  <AuthLayout
      logo="/img/logo-pandora.png"
      image="/img/vegetales.jpg"
      title="Create account"
      subtitle="We're happy to have you join us!"
  >
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Company Name</label>
        <input v-model="company" type="text" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">RUC</label>
        <input v-model="ruc" type="text" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="email" type="email" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input v-model="password" type="password" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Repeat password</label>
        <input v-model="confirm" type="password" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400" />
      </div>

      <div class="flex items-center">
        <input type="checkbox" v-model="terms" class="mr-2" />
        <span class="text-sm text-gray-600">I have read and accept the <a href="#" class="text-green-600 underline">Terms and Conditions</a></span>
      </div>

      <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow-md">
        Create Account
      </button>
    </form>

    <p class="text-center text-sm text-gray-600 mt-6">
      Already have an account?
      <router-link to="/login" class="text-green-600 hover:underline">Sign in</router-link>
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
    await authApi.register({ company: company.value, ruc: ruc.value, email: email.value, password: password.value })
    alert('Account created successfully')
  } catch (err) {
    alert('Error registering')
  }
}
</script>
