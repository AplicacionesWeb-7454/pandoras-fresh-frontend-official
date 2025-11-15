<script setup>
import { ref } from "vue";
import { Home, ClipboardList, Thermometer, BarChart3, Settings } from "lucide-vue-next";

const reglas = ref([
  { id: 1, nombre: "Temperatura > 10°C", accion: "Notificar al supervisor", estado: "Activa" },
  { id: 2, nombre: "Producto vencido detectado", accion: "Generar alerta crítica", estado: "Activa" },
  { id: 3, nombre: "Fallo de sensor", accion: "Enviar correo técnico", estado: "Inactiva" },
]);
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <nav class="menu">
        <button><Home :size="22" /></button>
        <button><ClipboardList :size="22" /></button>
        <button><Thermometer :size="22" /></button>
        <button><BarChart3 :size="22" /></button>
      </nav>
      <div class="settings"><button><Settings :size="22" /></button></div>
    </aside>

    <main class="main">
      <header class="header">
        <h3>Reglas de Alerta</h3>
        <button class="btn-primario">Nueva Regla</button>
      </header>

      <section class="cards">
        <div v-for="r in reglas" :key="r.id" class="card">
          <h4>{{ r.nombre }}</h4>
          <p><b>Acción:</b> {{ r.accion }}</p>
          <p><b>Estado:</b> {{ r.estado }}</p>
          <button class="btn-secundario">Editar</button>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
@import "alert-styles.css";
</style>
