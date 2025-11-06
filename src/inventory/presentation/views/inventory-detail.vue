<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBoxInventoryStore } from '../../application/box-inventory.store.js';

const route = useRoute();
const router = useRouter();
const store = useBoxInventoryStore();

const { currentInventory, boxes, loading, fetchInventory, createBox } = store;

const showCreateBox = ref(false);
const newBoxForm = ref({
  name: '',
  capacity: 10,
  location: '',
  storageConditions: {}
});

onMounted(() => {
  fetchInventory(route.params.id);
});

const handleCreateBox = async () => {
  try {
    await createBox({
      ...newBoxForm.value,
      inventoryId: route.params.id
    });
    showCreateBox.value = false;
    newBoxForm.value = { name: '', capacity: 10, location: '', storageConditions: {} };
  } catch (error) {
    console.error('Failed to create box:', error);
  }
};

const handleViewBox = (boxId) => {
  router.push({ name: 'box-detail', params: { id: boxId } });
};

const utilizationRate = computed(() => {
  if (!currentInventory.value || !boxes.value.length) return 0;
  const totalCapacity = boxes.value.reduce((sum, box) => sum + box.capacity, 0);
  const totalOccupancy = boxes.value.reduce((sum, box) => sum + box.currentOccupancy, 0);
  return totalCapacity > 0 ? (totalOccupancy / totalCapacity) * 100 : 0;
});
</script>

<template>
  <div class="inventory-detail">
    <div class="flex align-items-center gap-2 mb-4">
      <pv-button
          icon="pi pi-arrow-left"
          text
          rounded
          @click="router.push({ name: 'inventory-management-list' })" />
      <h1 class="m-0">{{ currentInventory?.name || 'Loading...' }}</h1>
    </div>

    <div v-if="loading" class="text-center py-4">
      <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
      <p class="mt-2">Loading inventory details...</p>
    </div>

    <div v-else-if="currentInventory">
      <!-- Inventory Overview -->
      <div class="grid mb-4">
        <div class="col-12 md:col-8">
          <pv-card>
            <template #content>
              <div class="grid">
                <div class="col-12 md:col-6">
                  <h4>Description</h4>
                  <p class="text-600">{{ currentInventory.description }}</p>
                </div>
                <div class="col-12 md:col-6">
                  <h4>Location</h4>
                  <p class="text-600">{{ currentInventory.location }}</p>
                </div>
                <div class="col-12 md:col-4">
                  <h4>Total Boxes</h4>
                  <p class="text-900 font-bold text-xl">{{ boxes.length }}</p>
                </div>
                <div class="col-12 md:col-4">
                  <h4>Utilization</h4>
                  <p class="text-900 font-bold text-xl">{{ utilizationRate.toFixed(1) }}%</p>
                </div>
                <div class="col-12 md:col-4">
                  <h4>Created</h4>
                  <p class="text-600">{{ new Date(currentInventory.createdAt).toLocaleDateString() }}</p>
                </div>
              </div>
            </template>
          </pv-card>
        </div>
        <div class="col-12 md:col-4">
          <pv-card class="h-full">
            <template #content>
              <div class="text-center p-4">
                <pv-button
                    label="Add New Box"
                    icon="pi pi-plus"
                    class="w-full mb-3"
                    @click="showCreateBox = true" />
                <pv-button
                    label="Edit Inventory"
                    icon="pi pi-pencil"
                    severity="secondary"
                    class="w-full"
                    @click="router.push({ name: 'inventory-management-edit', params: { id: currentInventory.id } })" />
              </div>
            </template>
          </pv-card>
        </div>
      </div>

      <!-- Boxes Grid -->
      <pv-card>
        <template #header>
          <h2 class="m-0">Boxes</h2>
        </template>
        <template #content>
          <div v-if="boxes.length === 0" class="text-center py-4">
            <i class="pi pi-box text-4xl text-400 mb-2"></i>
            <h3 class="text-900 font-medium mb-2">No Boxes Yet</h3>
            <p class="text-600 mb-4">Start by creating your first box in this inventory.</p>
            <pv-button
                label="Create First Box"
                icon="pi pi-plus"
                @click="showCreateBox = true" />
          </div>

          <div v-else class="grid">
            <div
                v-for="box in boxes"
                :key="box.id"
                class="col-12 md:col-6 lg:col-4">
              <pv-card class="box-card cursor-pointer" @click="handleViewBox(box.id)">
                <template #header>
                  <div class="flex justify-content-between align-items-center">
                    <h3 class="m-0 text-lg">{{ box.name }}</h3>
                    <pv-badge :value="box.currentOccupancy" />
                  </div>
                </template>
                <template #content>
                  <div class="mb-3">
                    <div class="flex justify-content-between text-sm mb-1">
                      <span class="text-500">Capacity:</span>
                      <span class="font-medium">{{ box.currentOccupancy }}/{{ box.capacity }}</span>
                    </div>
                    <pv-progress-bar
                        :value="(box.currentOccupancy / box.capacity) * 100"
                        :show-value="false"
                        :class="{
                                                'high-utilization': (box.currentOccupancy / box.capacity) > 0.9,
                                                'medium-utilization': (box.currentOccupancy / box.capacity) > 0.7 && (box.currentOccupancy / box.capacity) <= 0.9
                                            }" />
                  </div>
                  <div class="flex justify-content-between text-sm">
                    <span class="text-500">Location:</span>
                    <span class="font-medium">{{ box.location }}</span>
                  </div>
                  <div v-if="box.storageConditions.temperature" class="flex justify-content-between text-sm mt-1">
                    <span class="text-500">Temperature:</span>
                    <span class="font-medium">{{ box.storageConditions.temperature }}°C</span>
                  </div>
                </template>
              </pv-card>
            </div>
          </div>
        </template>
      </pv-card>
    </div>

    <!-- Create Box Dialog -->
    <pv-dialog v-model:visible="showCreateBox" header="Create New Box" :modal="true">
      <div class="p-fluid">
        <div class="field mb-3">
          <label for="boxName">Box Name</label>
          <pv-input-text id="boxName" v-model="newBoxForm.name" required />
        </div>
        <div class="field mb-3">
          <label for="boxCapacity">Capacity</label>
          <pv-input-number id="boxCapacity" v-model="newBoxForm.capacity" :min="1" required />
        </div>
        <div class="field mb-3">
          <label for="boxLocation">Location</label>
          <pv-input-text id="boxLocation" v-model="newBoxForm.location" />
        </div>
      </div>
      <template #footer>
        <pv-button label="Cancel" icon="pi pi-times" text @click="showCreateBox = false" />
        <pv-button label="Create" icon="pi pi-check" @click="handleCreateBox" />
      </template>
    </pv-dialog>
  </div>
</template>

<style scoped>
.inventory-detail {
  padding: 1rem;
}

.box-card {
  transition: all 0.3s ease;
  height: 100%;
}

.box-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:deep(.high-utilization .p-progressbar-value) {
  background-color: #f87171 !important;
}

:deep(.medium-utilization .p-progressbar-value) {
  background-color: #fbbf24 !important;
}
</style>