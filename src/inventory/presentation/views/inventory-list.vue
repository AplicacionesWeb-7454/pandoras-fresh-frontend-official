<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBoxInventoryStore } from '../../application/box-inventory.store.js';

const router = useRouter();
const store = useBoxInventoryStore();

const { inventories, loading, fetchInventories, deleteInventory } = store;

onMounted(() => {
  fetchInventories();
});

const handleCreateInventory = () => {
  router.push({ name: 'inventory-management-new' });
};

const handleViewInventory = (inventoryId) => {
  router.push({ name: 'inventory-management-detail', params: { id: inventoryId } });
};

const handleEditInventory = (inventoryId) => {
  router.push({ name: 'inventory-management-edit', params: { id: inventoryId } });
};

const handleDeleteInventory = async (inventoryId) => {
  if (confirm('Are you sure you want to delete this inventory? This action cannot be undone.')) {
    await deleteInventory(inventoryId);
  }
};
</script>

<template>
  <div class="inventory-list">
    <div class="flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="mb-1">Inventory Management</h1>
        <p class="text-color-secondary m-0">Manage your inventories and boxes</p>
      </div>
      <pv-button
          label="Create Inventory"
          icon="pi pi-plus"
          @click="handleCreateInventory" />
    </div>

    <pv-card>
      <template #content>
        <div v-if="loading" class="text-center py-4">
          <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
          <p class="mt-2">Loading inventories...</p>
        </div>

        <div v-else-if="inventories.length === 0" class="text-center py-4">
          <i class="pi pi-inbox text-4xl text-400 mb-2"></i>
          <h3 class="text-900 font-medium mb-2">No Inventories</h3>
          <p class="text-600 mb-4">Get started by creating your first inventory.</p>
          <pv-button
              label="Create First Inventory"
              icon="pi pi-plus"
              @click="handleCreateInventory" />
        </div>

        <div v-else class="grid">
          <div
              v-for="inventory in inventories"
              :key="inventory.id"
              class="col-12 md:col-6 lg:col-4">
            <pv-card class="inventory-card cursor-pointer" @click="handleViewInventory(inventory.id)">
              <template #header>
                <div class="flex justify-content-between align-items-center">
                  <h3 class="m-0 text-lg">{{ inventory.name }}</h3>
                  <pv-badge :value="inventory.boxes ? inventory.boxes.length : 0" severity="info" />
                </div>
              </template>
              <template #content>
                <p class="text-600 mb-3">{{ inventory.description }}</p>
                <div class="flex justify-content-between text-sm">
                  <span class="text-500">Location:</span>
                  <span class="font-medium">{{ inventory.location }}</span>
                </div>
                <div class="flex justify-content-between text-sm mt-2">
                  <span class="text-500">Created:</span>
                  <span class="font-medium">{{ new Date(inventory.createdAt).toLocaleDateString() }}</span>
                </div>
              </template>
              <template #footer>
                <div class="flex gap-2">
                  <pv-button
                      icon="pi pi-eye"
                      label="View"
                      text
                      size="small"
                      @click.stop="handleViewInventory(inventory.id)" />
                  <pv-button
                      icon="pi pi-pencil"
                      label="Edit"
                      text
                      size="small"
                      @click.stop="handleEditInventory(inventory.id)" />
                  <pv-button
                      icon="pi pi-trash"
                      label="Delete"
                      severity="danger"
                      text
                      size="small"
                      @click.stop="handleDeleteInventory(inventory.id)" />
                </div>
              </template>
            </pv-card>
          </div>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.inventory-list {
  padding: 1rem;
}

.inventory-card {
  transition: all 0.3s ease;
  height: 100%;
}

.inventory-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>