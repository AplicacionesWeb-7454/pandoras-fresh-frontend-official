<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>Vincular nuevo sensor</h2>
      <form @submit.prevent="saveSensor">
        <label>Campo:</label>
        <input v-model="form.field" required />

        <label>Código:</label>
        <input v-model="form.code" required />

        <label>Observaciones:</label>
        <textarea v-model="form.notes" />

        <div class="actions">
          <button type="button" @click="showModal = false">Cancelar</button>
          <button type="submit">Guardar sensor</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { addSensor, showModal } from '../../application/sensor.store.js'

const form = reactive({
  field: '',
  code: '',
  notes: '',
  text: ''
})

function saveSensor() {
  addSensor(form)
  showModal.value = false
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3); /* fondo semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 400px;
  max-width: 90vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.modal h2 {
  margin: 0;
  font-size: 1.4rem;
  color: #2e7d32;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: 600;
  font-size: 0.95rem;
  color: #333;
}

input,
textarea,
select {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  width: 100%;
}

textarea {
  resize: vertical;
  min-height: 60px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.actions button {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  font-size: 0.95rem;
}

.actions .cancel-btn {
  background-color: #e57373;
  color: white;
}

.actions .save-btn {
  background-color: #4CAF50;
  color: white;
}

</style>