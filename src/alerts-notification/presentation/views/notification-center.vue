<script setup>
import { ref } from "vue";
import { Home, ClipboardList, Thermometer, BarChart3, Settings } from "lucide-vue-next";

const notificaciones = ref([
  { id: 1, mensaje: "Frigorífico 2 excedió 12°C", tipo: "Crítica", leida: false },
  { id: 2, mensaje: "Regla de temperatura actualizada", tipo: "Info", leida: true },
  { id: 3, mensaje: "Producto vencido retirado", tipo: "Aviso", leida: true },
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
        <h3>Centro de Notificaciones</h3>
        <button class="btn-primario">Marcar todas como leídas</button>
      </header>

      <section class="cards">
        <div
            v-for="n in notificaciones"
            :key="n.id"
            class="card"
            :class="{ leida: n.leida }"
        >
          <h4>{{ n.tipo }}</h4>
          <p>{{ n.mensaje }}</p>
          <span class="estado" :class="n.tipo.toLowerCase()">{{ n.tipo }}</span>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
@import "alert-styles.css";

.card.leida {
  opacity: 0.7;
}
.estado.crítica { background: #ffe6e6; color: #cc0000; }
.estado.aviso { background: #fff5e5; color: #cc7a00; }
.estado.info { background: #e6f0ff; color: #0047cc; }
</style>