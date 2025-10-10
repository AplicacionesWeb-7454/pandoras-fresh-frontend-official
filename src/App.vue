<script setup lang="ts">
import { ref } from "vue";
import { Home, ClipboardList, Thermometer, BarChart3, Settings, Upload, FileImage } from "lucide-vue-next";

// Datos de los frigoríficos y sus tareas
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
    archivos: [],
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
    archivos: [],
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
    archivos: [],
  },
]);

// Función para manejar subida de archivos
const subirArchivo = (event: Event, frigorificoId: number) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (!files) return;

  const frigo = frigorificos.value.find((f) => f.id === frigorificoId);
  if (frigo) {
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      frigo.archivos.push({ nombre: file.name, url, tipo: file.type });
    });
  }

  target.value = ""; // Reinicia el input
};

const eliminarArchivo = (fId: number, nombreArchivo: string) => {
  const frigo = frigorificos.value.find((f) => f.id === fId);
  if (frigo) {
    frigo.archivos = frigo.archivos.filter((a) => a.nombre !== nombreArchivo);
  }
};

const guardar = () => alert("Datos guardados correctamente 💾");
const finalizar = () => alert("Orden marcada como finalizada ✅");
</script>

<template>
  <div class="layout">
    <!-- Sidebar -->
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
        <div class="order">
          <label>Orden de Trabajo:</label>
          <select>
            <option>Orden de Trabajo - OTO1</option>
          </select>
        </div>
      </header>

      <h3 class="subtitle">Frame 204</h3>

      <!-- Tarjetas -->
      <section class="fridge-grid">
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
            <textarea v-model="f.observaciones" placeholder="Escribe tus observaciones aquí..."></textarea>
          </div>

          <div class="multimedia">
            <label>Contenido Multimedia:</label>
            <div class="upload-area">
              <input
                  type="file"
                  :id="'file-' + f.id"
                  class="hidden-input"
                  multiple
                  accept="image/*,application/pdf"
                  @change="(e) => subirArchivo(e, f.id)"
              />
              <label :for="'file-' + f.id" class="upload-btn">
                <Upload :size="18" /> Subir Archivo
              </label>
            </div>

            <!-- Vista previa -->
            <div v-if="f.archivos.length" class="preview-grid">
              <div
                  v-for="(a, idx) in f.archivos"
                  :key="idx"
                  class="preview-item"
              >
                <template v-if="a.tipo.includes('image')">
                  <img :src="a.url" :alt="a.nombre" />
                </template>
                <template v-else>
                  <FileImage :size="32" />
                  <p>{{ a.nombre }}</p>
                </template>
                <button class="delete" @click="eliminarArchivo(f.id, a.nombre)">✖</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="actions">
        <button class="finalizar" @click="finalizar">Marcar como Finalizada</button>
        <button class="guardar" @click="guardar">Guardar</button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #f8f9fb;
}

/* Sidebar */
.sidebar {
  width: 70px;
  background: #009639;
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

/* Main */
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

.order {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.order select {
  border-radius: 6px;
  padding: 0.4rem 0.6rem;
}

.subtitle {
  margin-top: 1rem;
  color: #666;
}

/* Fridges */
.fridge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.fridge-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.fridge-card h4 {
  background: #f0f1ff;
  text-align: center;
  padding: 0.5rem;
  border-radius: 6px;
  color: #222;
  margin-bottom: 1rem;
}

.fridge-card ul {
  list-style: none;
  padding-left: 0;
}

.fridge-card li {
  margin-bottom: 0.5rem;
  color: #333;
}

.observaciones textarea {
  width: 100%;
  height: 60px;
  margin-top: 0.3rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
}

/* Upload */
.upload-area {
  margin-top: 0.4rem;
}

.hidden-input {
  display: none;
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.upload-btn:hover {
  background: #eaeaea;
}

/* Previews */
.preview-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.8rem;
}

.preview-item {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.4rem;
  background: #fafafa;
  width: 90px;
  text-align: center;
}

.preview-item img {
  width: 100%;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
}

.preview-item p {
  font-size: 0.8rem;
  margin-top: 0.3rem;
}

.preview-item .delete {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #ff5c5c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  cursor: pointer;
}

/* Botones finales */
.actions {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.finalizar {
  background: #dcdcdc;
  border: none;
  padding: 0.9rem 2rem;
  border-radius: 20px;
  cursor: pointer;
}

.guardar {
  background: #009639;
  color: white;
  border: none;
  padding: 0.9rem 2.5rem;
  border-radius: 20px;
  cursor: pointer;
}

.guardar:hover {
  background: #007f2d;
}
</style>