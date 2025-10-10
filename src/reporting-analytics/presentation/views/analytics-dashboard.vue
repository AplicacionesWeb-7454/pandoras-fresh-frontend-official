<template>
  <div class="analytics-dashboard">
    <!-- Header -->
    <div class="header-section">
      <h1 class="app-title">Pandora's Fresh</h1>
      <div class="date-section">
        <div class="month">{{ currentMonth }}</div>
        <div class="date-range">{{ dateRange }}</div>
      </div>
    </div>

    <!-- Métricas Principales -->
    <div class="metrics-grid">
      <div class="metric-item">
        <div class="metric-value">{{ productsStore.totalProducts.toFixed(1) }}</div>
        <div class="metric-label">total productos</div>
      </div>
      <div class="metric-item">
        <div class="metric-value">{{ productsStore.registeredThisWeek }}</div>
        <div class="metric-label">registrados esta semana</div>
      </div>
      <div class="metric-item">
        <div class="metric-value">{{ productsStore.expiringSoon }}</div>
        <div class="metric-label">proximos a caducar</div>
      </div>
      <div class="metric-item">
        <div class="metric-value">{{ productsStore.expired }}</div>
        <div class="metric-label">vencidos</div>
      </div>
      <div class="metric-item">
        <div class="metric-value">{{ productsStore.inventoryStatus }}</div>
        <div class="metric-label">estado general del inventario</div>
      </div>
    </div>

    <div class="divider"></div>

    <!-- Productos disponibles vs caducados -->
    <div class="availability-section">
      <div class="section-title">Productos disponibles</div>
      <div class="section-subtitle">Productos caducados</div>
      <div class="percentages-row">
        <div class="percentage-item">
          <div class="percentage-value">{{ productsStore.availablePercent }}%</div>
          <div class="percentage-label">Disponibles</div>
        </div>
        <div class="percentage-item">
          <div class="percentage-value">{{ productsStore.expiredPercent }}%</div>
          <div class="percentage-label">Caducados</div>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <!-- Por caducar y alerta -->
    <div class="status-section">
      <div class="section-title">Por caducar y alerta</div>
      <div class="status-list">
        <div class="status-item">
          <span class="status-dot available"></span>
          <span>Disponibles</span>
        </div>
        <div class="status-item">
          <span class="status-dot expiring"></span>
          <span>Por caducar</span>
        </div>
        <div class="status-item">
          <span class="status-dot alert"></span>
          <span>En condicion de alerta</span>
        </div>
      </div>
      <div class="status-counts">
        <div>{{ productsStore.statusBreakdown.available }}</div>
        <div>{{ productsStore.statusBreakdown.expiring }}</div>
        <div>{{ productsStore.statusBreakdown.alert }}</div>
      </div>
    </div>

    <div class="divider"></div>

    <!-- Alertas -->
    <div class="alerts-grid">
      <div class="alert-card">
        <div class="alert-title">Alerta de Calidad</div>
        <div class="alert-content">{{ productsStore.qualityAlert }}</div>
      </div>

      <div class="alert-card">
        <div class="alert-title">Por caducar</div>
        <div class="alert-subtitle">Productos por caducar en 3 o menos dias.</div>
        <div class="alert-list">
          <div v-for="product in productsStore.expiringProductsList"
               :key="product.id"
               class="alert-item">
            {{ product.name }} - {{ product.daysLeft }} dias
          </div>
        </div>
      </div>

      <div class="alert-card">
        <div class="alert-title">Condicion de alerta</div>
        <div class="alert-subtitle">Condicion inadecuada detectable</div>
        <div class="alert-list">
          <div v-for="condition in productsStore.alertConditionsList"
               :key="condition.id"
               class="alert-item">
            {{ condition.product }} - {{ condition.type }}
          </div>
        </div>
      </div>
    </div>

    <!-- Gestion de Productos -->
    <div class="management-section">
      <button class="action-btn add-btn" @click="showAddModal = true">
        Agregar Producto
      </button>
      <button class="action-btn delete-btn" @click="showDeleteModal = true">
        Eliminar Producto
      </button>
    </div>

    <!-- Modal Agregar Producto -->
    <div v-if="showAddModal" class="modal-overlay" @click="showAddModal = false">
      <div class="modal-content" @click.stop>
        <h3>Agregar Producto al Inventario</h3>
        <form @submit.prevent="addProduct" class="product-form">
          <div class="form-group">
            <label>Nombre del Producto:</label>
            <input v-model="newProduct.name" type="text" placeholder="Ej: Tomásic Cherry" required>
          </div>

          <div class="form-group">
            <label>Categoría:</label>
            <select v-model="newProduct.category" required>
              <option value="">Seleccione categoría</option>
              <option value="Frutas">Frutas</option>
              <option value="Lácteos">Lácteos</option>
              <option value="Cárnicos">Cárnicos</option>
              <option value="Verduras">Verduras</option>
            </select>
          </div>

          <div class="form-group">
            <label>Cantidad:</label>
            <input v-model.number="newProduct.quantity" type="number" placeholder="Número de unidades" required>
          </div>

          <div class="form-group">
            <label>Fecha de Caducidad:</label>
            <input v-model="newProduct.expiryDate" type="date" required>
            <small>Seleccione cuando caduca el producto</small>
          </div>

          <div class="form-group">
            <label>Temperatura (°C):</label>
            <input v-model.number="newProduct.temperature" type="number" step="0.1" placeholder="Ej: 4.5" required>
          </div>

          <div class="form-group">
            <label>Humedad (%):</label>
            <input v-model.number="newProduct.humidity" type="number" placeholder="Ej: 70" required>
          </div>

          <div class="form-actions">
            <button type="button" @click="showAddModal = false">Cancelar</button>
            <button type="submit">Agregar Producto</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Eliminar Producto -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="showDeleteModal = false">
      <div class="modal-content" @click.stop>
        <h3>Eliminar Producto del Inventario</h3>
        <div class="products-list">
          <div v-for="product in productsStore.products"
               :key="product.id"
               class="product-item">
            <div class="product-info">
              <strong>{{ product.name }}</strong>
              <span>{{ product.category }} - {{ product.quantity }} unidades</span>
              <small>Caduca: {{ formatDate(product.expiryDate) }}</small>
            </div>
            <button @click="deleteProduct(product.id)" class="delete-btn-small">
              Eliminar
            </button>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="showDeleteModal = false">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductsStore } from '../../../stores/products-store.js'
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'AnalyticsDashboard',
  setup() {
    const productsStore = useProductsStore()
    const showAddModal = ref(false)
    const showDeleteModal = ref(false)

    const newProduct = ref({
      name: '',
      category: '',
      quantity: 1,
      expiryDate: '',
      temperature: 4.0,
      humidity: 70
    })

    // Fecha actual
    const currentDate = ref(new Date())

    const currentMonth = computed(() => {
      return currentDate.value.toLocaleDateString('es-ES', { month: 'long' })
    })

    const dateRange = computed(() => {
      const today = currentDate.value
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      const formatDate = (date) => {
        return date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      }

      return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`
    })

    const addProduct = () => {
      productsStore.addProduct(newProduct.value)
      newProduct.value = {
        name: '',
        category: '',
        quantity: 1,
        expiryDate: '',
        temperature: 4.0,
        humidity: 70
      }
      showAddModal.value = false
    }

    const deleteProduct = (productId) => {
      productsStore.deleteProduct(productId)
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('es-ES')
    }

    // Actualizar fecha cada minuto
    onMounted(() => {
      setInterval(() => {
        currentDate.value = new Date()
      }, 60000)
    })

    return {
      productsStore,
      showAddModal,
      showDeleteModal,
      newProduct,
      currentMonth,
      dateRange,
      addProduct,
      deleteProduct,
      formatDate
    }
  }
}
</script>

<style scoped>
.analytics-dashboard {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background: white;
  font-family: Arial, sans-serif;
  color: #333;
  line-height: 1.4;
}

/* Header */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: #4CAF50;
  padding: 20px;
  border-radius: 8px;
  color: white;
}

.app-title {
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.date-section {
  text-align: right;
}

.month {
  font-size: 22px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
  text-transform: capitalize;
}

.date-range {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
}

/* Métricas Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.metric-item {
  text-align: center;
  padding: 20px 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #4CAF50;
  transition: all 0.3s ease;
}

.metric-item:hover {
  background: #e8f5e8;
  transform: translateY(-2px);
}

.metric-value {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
}

.metric-label {
  font-size: 12px;
  color: #666;
  text-transform: lowercase;
}

/* Divisor */
.divider {
  height: 2px;
  background: #4CAF50;
  margin: 30px 0;
  opacity: 0.3;
}

/* Sección de Disponibilidad */
.availability-section {
  margin-bottom: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
}

.section-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.percentages-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.percentage-item {
  text-align: center;
  padding: 15px;
  background: white;
  border-radius: 6px;
  border: 2px solid #4CAF50;
}

.percentage-value {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
}

.percentage-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

/* Sección de Estado */
.status-section {
  margin-bottom: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15px;
}

.status-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 15px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #333;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.status-dot.available {
  background: #4CAF50;
}

.status-dot.expiring {
  background: #FF9800;
}

.status-dot.alert {
  background: #F44336;
}

.status-counts {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 10px;
  padding-top: 15px;
  border-top: 1px solid #e0e0e0;
}

/* Alertas Grid */
.alerts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.alert-card {
  padding: 20px;
  border: 2px solid #4CAF50;
  border-radius: 8px;
  background: #f8f9fa;
}

.alert-title {
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 8px;
}

.alert-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.alert-content {
  font-size: 14px;
  color: #d32f2f;
  font-weight: 500;
}

.alert-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.alert-item {
  font-size: 14px;
  color: #333;
  padding: 8px 12px;
  background: white;
  border-radius: 4px;
  border-left: 3px solid #4CAF50;
}

/* Gestion de Productos */
.management-section {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.action-btn {
  padding: 15px 25px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.add-btn {
  background: #4CAF50;
  color: white;
}

.add-btn:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
}

.delete-btn {
  background: #f44336;
  color: white;
}

.delete-btn:hover {
  background: #da190b;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3);
}

/* Modales */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  border: 3px solid #4CAF50;
}

.modal-content h3 {
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #4CAF50;
  outline: none;
}

.form-group small {
  color: #666;
  font-size: 12px;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.form-actions button {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.form-actions button[type="button"] {
  background: #6c757d;
  color: white;
}

.form-actions button[type="submit"] {
  background: #4CAF50;
  color: white;
}

.products-list {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.product-info strong {
  color: #2c3e50;
}

.product-info span {
  color: #666;
  font-size: 14px;
}

.product-info small {
  color: #999;
  font-size: 12px;
}

.delete-btn-small {
  background: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
}

.modal-actions {
  text-align: center;
}

.modal-actions button {
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .date-section {
    text-align: center;
  }

  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .management-section {
    flex-direction: column;
    align-items: center;
  }

  .percentages-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .status-counts {
    justify-content: space-around;
  }

  .action-btn {
    width: 100%;
    max-width: 250px;
  }
}

@media (max-width: 480px) {
  .analytics-dashboard {
    padding: 15px;
  }

  .app-title {
    font-size: 24px;
  }

  .month {
    font-size: 20px;
  }

  .metric-value {
    font-size: 20px;
  }

  .header-section {
    padding: 15px;
  }
}
</style>