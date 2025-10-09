<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900">
    <!-- Navbar -->
    <header class="bg-green-600 text-white shadow">
      <nav class="container mx-auto flex justify-between items-center p-4">
        <h1 class="text-xl font-bold">Pandora Fresh</h1>
        <ul class="flex gap-4">
          <li><router-link to="/" class="hover:underline">Inicio</router-link></li>

          <!-- Si NO está autenticado -->
          <template v-if="!store.isAuthenticated">
            <li><router-link to="/login" class="hover:underline">Login</router-link></li>
            <li><router-link to="/register" class="hover:underline">Registro</router-link></li>
          </template>

          <!-- Si SÍ está autenticado -->
          <template v-else>
            <li><router-link to="/profile" class="hover:underline">Perfil</router-link></li>
            <li v-if="store.isAdmin"><router-link to="/users" class="hover:underline">Usuarios</router-link></li>
            <li>
              <button @click="logout" class="hover:underline">Cerrar sesión</button>
            </li>
          </template>
        </ul>
      </nav>
    </header>

    <!-- Contenido dinámico -->
    <main class="flex-1 container mx-auto p-6">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-200 text-center py-4">
      <p>&copy; 2025 Pandora Fresh. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script setup>
import { useUserStore } from './user-management/application/store/user-management.store'
import { logoutUseCase } from './user-management/application/use-cases/logout.usecase'

const store = useUserStore()

function logout() {
  logoutUseCase()
}
</script>
