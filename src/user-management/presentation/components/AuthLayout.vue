<template>
  <div class="min-h-screen flex">
    <!-- Columna izquierda con imagen -->
    <div class="hidden md:flex w-1/2">
      <img :src="image" alt="Auth background" class="object-cover w-full h-full" />
    </div>

    <!-- Columna derecha -->
    <div class="flex w-full md:w-1/2 items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
      <div class="max-w-md w-full p-8 bg-white rounded-xl shadow-lg">
        <!-- Logo -->
        <div class="flex justify-center mb-6">
          <img :src="logo" alt="Pandora Fresh" class="h-12" />
        </div>

        <!-- Título y subtítulo -->
        <h2 class="text-2xl font-bold text-center text-green-700">{{ title }}</h2>
        <p v-if="subtitle" class="text-center text-gray-500 mb-6">{{ subtitle }}</p>

        <!-- Formulario principal -->
        <slot />

        <!-- Separador opcional -->
        <div v-if="$slots.separator" class="flex items-center my-6">
          <div class="flex-grow h-px bg-gray-200"></div>
          <span class="px-3 text-sm text-gray-500">o</span>
          <div class="flex-grow h-px bg-gray-200"></div>
        </div>

        <!-- Botones sociales opcionales -->
        <div v-if="$slots.social" class="mt-4">
          <slot name="social" />
        </div>

        <!-- Links secundarios opcionales -->
        <div v-if="$slots.footer" class="mt-6 text-center text-sm text-gray-600">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  logo: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' }
})
</script>
