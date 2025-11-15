<script setup>
import {useAlertStore} from "@/alerts-notification/application/alert.store.js";

const { alerts, markAsResolved } = useAlertStore();

const guardarCambios = () => {
  alert("Cambios guardados correctamente 💾");
};
</script>

<template>
  <div class="alert-management">
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
.alert-management {
  width: 100%;
  min-height: 100vh;
  background: #f8f9fb;
}

/* Main */
.main {
  width: 100%;
  padding: 2rem 3rem;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h3 {
  margin: 0;
  color: #2e7d32;
  font-size: 1.8rem;
}

.header select {
  padding: 0.6rem 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  font-size: 1rem;
}

.header select:hover {
  border-color: #4CAF50;
}

/* Cards */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}

.card h4 {
  color: #009639;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.card p {
  color: #666;
  margin: 0.5rem 0;
  line-height: 1.6;
}

.estado {
  display: inline-block;
  margin-top: 0.8rem;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  text-transform: capitalize;
}

.estado.active {
  background: #ffebeb;
  color: #b30000;
}

.estado.pending {
  background: #fff4e5;
  color: #cc7a00;
}

.estado.resolved {
  background: #e6ffed;
  color: #008f3f;
}

.card button {
  margin-top: 1rem;
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.card button:hover {
  background: #45a049;
}

/* Footer acciones */
.acciones {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

.btn-primario {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.9rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primario:hover {
  background: #45a049;
}

.btn-secundario {
  border: 1px solid #ccc;
  background: white;
  color: #666;
  padding: 0.9rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-secundario:hover {
  background: #f5f5f5;
  border-color: #999;
}

/* Responsive */
@media (max-width: 768px) {
  .main {
    padding: 1.5rem;
  }

  .cards {
    grid-template-columns: 1fr;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .acciones {
    flex-direction: column;
  }
}
</style>