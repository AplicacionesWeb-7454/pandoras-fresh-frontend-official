<template>
  <div class="layout">
    <Sidebar @add="showModal = true" />

    <div class="main-content">
      <!-- 🔍 Encabezado con búsqueda y filtro -->
      <div class="dashboard-header">
        <input type="text" placeholder="Buscar sensor..." v-model="searchQuery" />
        <button class="filter-btn" @click="showFilter = true">Filtro</button>
        <button class="add-btn" @click="showModal = true">Agregar</button>
      </div>

      <!-- 🎛️ Panel de filtros -->
      <div v-if="showFilter" class="filter-panel">
        <h3>Filtrar sensores</h3>

        <label>Zona:</label>
        <select v-model="filters.zone">
          <option value="">Todas</option>
          <option value="Zona A">Zona A</option>
          <option value="Zona B">Zona B</option>
        </select>

        <label>Estado:</label>
        <select v-model="filters.status">
          <option value="">Todos</option>
          <option value="Activo">Activo</option>
          <option value="Desactivado">Desactivado</option>
        </select>

        <div class="filter-actions">
          <button @click="showFilter = false">Cerrar</button>
          <button @click="resetFilters">Limpiar</button>
        </div>
      </div>

      <!-- 📋 Listado de sensores -->
      <div class="sensor-list">
        <div
            v-for="sensor in filteredSensors"
            :key="sensor.id"
            class="sensor-card"
        >
          <h3>{{ sensor.name }}</h3>
          <p>{{ sensor.description }}</p>
          <span :class="sensor.status">{{ sensor.status }}</span>
          <button @click="selectSensor(sensor)">Ver lecturas</button>
        </div>
      </div>

      <!-- 📊 Panel lateral de detalles -->
      <aside v-if="selectedSensor" class="sensor-details">
        <h2>{{ selectedSensor.name }}</h2>
        <p>Estado: {{ selectedSensor.status }}</p>
        <p>Última lectura: {{ selectedSensor.lastReading }}</p>
        <table>
          <tr><td>Temperatura:</td><td>{{ selectedSensor.readings.temperature }}°C</td></tr>
          <tr><td>Humedad:</td><td>{{ selectedSensor.readings.humidity }}%</td></tr>
          <tr><td>Viento:</td><td>{{ selectedSensor.readings.wind }} km/h</td></tr>
        </table>
        <button @click="removeSensor(selectedSensor.id)">Desvincular</button>
        <button>Editar</button>
      </aside>
    </div>

    <!-- 🟢 Modal de vinculación -->
    <SensorLinkModal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  sensors,
  selectedSensor,
  showModal,
  loadSensors,
  selectSensor,
  removeSensor
} from '../../application/sensor.store.js'

import SensorLinkModal from './SensorLinkModal.vue'
import Sidebar from '../components/Sidebar.vue'

const showFilter = ref(false)
const searchQuery = ref('')

const filters = ref({
  zone: '',
  status: ''
})

function resetFilters() {
  filters.value.zone = ''
  filters.value.status = ''
}

const filteredSensors = computed(() =>
    sensors.value.filter(sensor => {
      const matchesSearch = sensor.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesZone = !filters.value.zone || sensor.zone === filters.value.zone
      const matchesStatus = !filters.value.status || sensor.status === filters.value.status
      return matchesSearch && matchesZone && matchesStatus
    })
)

onMounted(() => {
  loadSensors()
})
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
}

.dashboard-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.dashboard-header input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.filter-btn,
.add-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}
.filter-btn {
  background-color: #81c784;
}

.filter-panel {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 1000;
  width: 300px;
}

.filter-panel h3 {
  margin-top: 0;
  color: #2e7d32;
}

.filter-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.sensor-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.sensor-card {
  background-color: white;
  border: 1px solid #ddd;
  padding: 1rem;
  width: 250px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.sensor-details {
  background-color: #f0fdf0;
  border-left: 4px solid #4CAF50;
  padding: 1rem;
  border-radius: 8px;
  max-width: 500px;
}
</style>
