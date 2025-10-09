<template>
  <div class="sidebar">
    <!-- 🌿 Ícono principal arriba -->
    <div class="top-icon">
      <img src="/icons/hoja.png" alt="hoja" />
    </div>

    <!-- 📦 Íconos secundarios centrados con separación amplia -->
    <div class="middle-icons">
      <img src="/icons/dashboard.svg" alt="Dashboard" />
      <img src="/icons/sensor.svg" alt="Sensores" />
      <img src="/icons/stats.svg" alt="Alertas" />
      <img src="/icons/usuario.svg" alt="Configuración" />
    </div>
  </div>
</template>

<script setup>
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
  position: relative;
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
  gap: 3rem; /* Separación más amplia entre íconos */
  align-items: center;
}

.middle-icons img {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
</style>
