<script setup>
import { ref, onMounted } from 'vue';
import { useBoxInventoryStore } from '../../application/box-inventory.store.js';
import useInventoryStore from '../../application/inventory.store.js';

const boxInventoryStore = useBoxInventoryStore();
const inventoryStore = useInventoryStore();

const activeTab = ref('simple'); // 'simple' or 'advanced'

onMounted(() => {
  // Load both systems
  inventoryStore.fetchProducts();
  boxInventoryStore.fetchInventories();
});
</script>

<template>
  <div class="inventory-management-bridge">
    <div class="tabs-header">
      <button
          :class="['tab-button', { active: activeTab === 'simple' }]"
          @click="activeTab = 'simple'"
      >
        Inventario Simple
      </button>
      <button
          :class="['tab-button', { active: activeTab === 'advanced' }]"
          @click="activeTab = 'advanced'"
      >
        Inventario con Cajas
      </button>
    </div>

    <div class="tab-content">
      <div v-if="activeTab === 'simple'">
        <!-- Your existing inventory components will work here -->
        <slot name="simple-inventory"></slot>
      </div>

      <div v-if="activeTab === 'advanced'">
        <!-- New box-based inventory components will go here -->
        <slot name="advanced-inventory"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inventory-management-bridge {
  width: 100%;
}

.tabs-header {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.2s ease;
}

.tab-button.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

.tab-button:hover:not(.active) {
  color: #374151;
  background-color: #f9fafb;
}
</style>