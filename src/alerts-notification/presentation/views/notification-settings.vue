<script setup lang="ts">
import { ref } from "vue";
import { Home, ClipboardList, Thermometer, BarChart3, Settings } from "lucide-vue-next";

// Estado de las tareas para cada frigorífico
const frigorificos = ref([
  {
    id: 1,
    nombre: "Frigorífico 1",
    tareas: [
      "Identificar productos con fecha de vencimiento menor a 3 días",
      "Separar productos en condición de alerta para revisión",
      "Registrar cantidad de productos retirados por vencimiento",
      "Verificar etiquetas y fechas visibles en cada unidad",
      "Limpiar estantes donde se retiraron productos",
    ],
    observaciones: "",
  },
  {
    id: 2,
    nombre: "Frigorífico 2",
    tareas: [
      "Verificar estado físico de los productos vencidos",
      "Retirar productos caducados del área de almacenamiento",
      "Registrar cantidad retirada (unidades o peso)",
      "Registrar motivo de vencimiento (fecha, condición, error de rotación)",
      "Tomar evidencia fotográfica del retiro",
    ],
    observaciones: "",
  },
  {
    id: 3,
    nombre: "Frigorífico 3",
    tareas: [
      "Verificar si hay acumulación de productos vencidos en la zona posterior",
      "Registrar tipo de producto vencido (cárnicos, lácteos, frutas)",
      "Registrar peso aproximado de desechos generados",
      "Evaluar si el vencimiento fue por temperatura inadecuada o rotación deficiente",
      "Tomar evidencia fotográfica del estado de los productos",
    ],
    observaciones: "",
  },
]);

const marcarFinalizada = () => {
  alert("Orden marcada como finalizada ✅");
};

const guardar = () => {
  alert("Datos guardados correctamente 💾");
};
</script>

<template>
  <div class="layout">
    <!-- Barra lateral -->
    <aside class="sidebar">
      <nav class="menu">
        <button><Home :size="22" /></button>
        <button><ClipboardList :size="22" /></button>
        <button><Thermometer :size="22" /></button>
        <button><BarChart3 :size="22" /></button>
      </nav>

      <div class="settings">
        <button><Settings :size="22" /></button>
      </div>
    </aside>

    <!-- Contenido principal -->
    <main class="main">
      <header class="header">
        <h2>Ejecución</h2>
        <div class="order-select">
          <label>Orden de Trabajo:</label>
          <select>
            <option>Orden de Trabajo - OTO1</option>
          </select>
        </div>
      </header>

      <h3 class="frame-title">Frame 204</h3>

      <!-- Tarjetas de frigoríficos -->
      <div class="fridge-container">
        <div v-for="f in frigorificos" :key="f.id" class="fridge-card">
          <h4>{{ f.nombre }}</h4>

          <h5>Tareas:</h5>
          <ul>
            <li v-for="(t, i) in f.tareas" :key="i">
              <input type="checkbox" /> {{ t }}
            </li>
          </ul>

          <div class="observaciones">
            <label>Observaciones:</label>
            <textarea v-model="f.observaciones" placeholder="Texto"></textarea>
          </div>

          <div class="multimedia">
            <label>Contenido Multimedia</label>
            <button class="upload-btn">📎 Subir Archivo</button>
          </div>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="actions">
        <button class="finalizar" @click="marcarFinalizada">Marcar como Finalizada</button>
        <button class="guardar" @click="guardar">Guardar</button>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* --- Layout general --- */
.layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f8f9fb;
}

/* --- Sidebar --- */
.sidebar {
  width: 70px;
  background-color: #009639;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.menu button,
.settings button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  transition: transform 0.2s, color 0.2s;
}

.menu button:hover,
.settings button:hover {
  transform: scale(1.15);
  color: #d9ffd9;
}

/* --- Main --- */
.main {
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #222;
}

.order-select {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.order-select select {
  padding: 0.3rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.frame-title {
  color: #666;
  margin-top: 1rem;
  margin-bottom: 1.2rem;
}

/* --- Frigoríficos --- */
.fridge-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.fridge-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.fridge-card h4 {
  text-align: center;
  background-color: #f0f1ff;
  color: #222;
  font-weight: 600;
  border-radius: 6px;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
}

.fridge-card h5 {
  font-weight: 500;
  color: #555;
  margin-bottom: 0.5rem;
}

.fridge-card ul {
  list-style: none;
  padding-left: 0;
  margin-bottom: 1rem;
}

.fridge-card li {
  margin-bottom: 0.4rem;
  color: #333;
}

.fridge-card input[type="checkbox"] {
  margin-right: 0.5rem;
}

/* Observaciones */
.observaciones label {
  font-weight: 500;
  color: #444;
}

.observaciones textarea {
  width: 100%;
  height: 60px;
  margin-top: 0.3rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
}

/* Multimedia */
.multimedia {
  margin-top: 1rem;
}

.upload-btn {
  margin-top: 0.3rem;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

.upload-btn:hover {
  background-color: #eaeaea;
}

/* --- Botones finales --- */
.actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.finalizar {
  background-color: #e0e0e0;
  border: none;
  padding: 0.9rem 2rem;
  border-radius: 20px;
  cursor: pointer;
}

.guardar {
  background-color: #009639;
  color: white;
  border: none;
  padding: 0.9rem 2.5rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
}

.guardar:hover {
  background-color: #007f2d;
}
</style>