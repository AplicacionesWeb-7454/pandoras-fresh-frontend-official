<template>
  <div class="sidebar">
    <!-- 🌿 Ícono principal arriba -->
    <div class="top-icon">
      <img src="/icons/hoja.png" alt="hoja" />
    </div>

    <!-- 📦 Íconos secundarios centrados con separación amplia -->
    <div class="middle-icons">
      <img src="/icons/dashboard.svg" alt="Inventario" @click="goToInventory" />
      <img src="/icons/sensor.svg" alt="Sensores" @click="goToSensors" />
      <img src="/icons/stats.svg" alt="Analitica" @click="goToAnalytics" />
      <img src="/icons/warning.png" alt="Alertas" @click="goToAlerts" />
      <img src="/icons/usuario.svg" alt="Configuración" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goToInventory() {
  router.push('/inventory/dashboard')
}
function goToSensors() {
  router.push('/dashboard')
}
function goToAnalytics() {
  router.push('/analytics/dashboard')
}
function goToAlerts() {
  router.push('/alerts')  // ← Cambiar de '/alerts/management' a '/alerts'
}
</script>

<style scoped>
.sidebar {
  width: 60px;
  background-color: #e8f5e9;
  padding: 1rem 0.5rem;
  border-right: 2px solid #4CAF50;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: fixed;  /* ← CAMBIO: de relative a fixed */
  left: 0;          /* ← NUEVO */
  top: 0;           /* ← NUEVO */
  z-index: 1000;    /* ← NUEVO: para que esté encima del contenido */
}

.top-icon {
  margin-top: 1rem;
}

.top-icon img {
  width: 32px;
  height: 32px;
}

.middle-icons {
  position: absolute;
  top: 30%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
}

.middle-icons img {
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: transform 0.2s;
}

.middle-icons img:hover {
  transform: scale(1.1);
}
</style>