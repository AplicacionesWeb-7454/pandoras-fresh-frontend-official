<script setup>
//import { useAlertStore } from "../../../../alert-notification/src/application/alert.store.js";
import {useAlertStore} from "@/alerts-notification/application/alert.store.js";
import { Home, ClipboardList, Thermometer, BarChart3, Settings } from "lucide-vue-next";

const { alerts, markAsResolved } = useAlertStore();

const guardarCambios = () => {
  alert("Cambios guardados correctamente 💾");
};
</script>

<template>
  <div class="layout">
    <!-- Sidebar verde -->
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
        <h3>Gestión de Alertas</h3>
        <select>
          <option>Ver todas</option>
          <option>Activas</option>
          <option>Resueltas</option>
        </select>
      </header>

      <section class="cards">
        <div
            v-for="alert in alerts"
            :key="alert.id"
            class="card"
        >
          <h4>{{ alert.title }}</h4>
          <p>{{ alert.description }}</p>
          <span class="estado" :class="alert.status">{{ alert.status }}</span>
          <button @click="markAsResolved(alert.id)">Resolver</button>
        </div>
      </section>

      <footer class="acciones">
        <button class="btn-secundario">Marcar como Finalizada</button>
        <button class="btn-primario" @click="guardarCambios">Guardar</button>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #f8f9fb;
  overflow: hidden;
}

/* Sidebar verde */
.sidebar {
  width: 80px;
  background: #009639;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  position: fixed;
  top: 0; bottom: 0; left: 0;
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
  transform: scale(1.1);
  color: #dfffe0;
}

.settings { margin-bottom: 1rem; }

/* Main */
.main {
  flex: 1;
  margin-left: 80px;
  width: calc(100vw - 80px);
  padding: 2rem 3rem;
  overflow-y: auto;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header select {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

/* Cards */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 1.5rem;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}

.card h4 {
  color: #009639;
}

.estado {
  display: inline-block;
  margin-top: 0.8rem;
  font-size: 0.9rem;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  text-transform: capitalize;
}

.estado.active { background: #ffebeb; color: #b30000; }
.estado.pending { background: #fff4e5; color: #cc7a00; }
.estado.resolved { background: #e6ffed; color: #008f3f; }

.card button {
  margin-top: 1rem;
  background: #009639;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
}

/* Footer acciones */
.acciones {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-primario {
  background: #009639;
  color: white;
  border: none;
  padding: 0.9rem 2rem;
  border-radius: 8px;
  cursor: pointer;
}

.btn-secundario {
  border: 1px solid #ccc;
  background: white;
  padding: 0.9rem 2rem;
  border-radius: 8px;
  cursor: pointer;
}
</style>