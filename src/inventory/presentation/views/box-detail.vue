<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBoxInventoryStore } from '../../application/box-inventory.store.js';

const route = useRoute();
const router = useRouter();
const store = useBoxInventoryStore();

const { currentBox, loading, fetchBox, addProductToBox } = store;

const showAddProduct = ref(false);
const newProductForm = ref({
  productTypeId: '',
  quantity: 1,
  expirationDate: ''
});

onMounted(() => {
  fetchBox(route.params.id);
});

const utilizationRate = computed(() => {
  if (!currentBox.value) return 0;
  return (currentBox.value.currentOccupancy / currentBox.value.capacity) * 100;
});

const handleAddProduct = async () => {
  try {
    await addProductToBox(route.params.id, newProductForm.value);
    showAddProduct.value = false;
    newProductForm.value = { productTypeId: '', quantity: 1, expirationDate: '' };
  } catch (error) {
    console.error('Failed to add product:', error);
  }
};
</script>

<template>
  <div class="box-detail">
    <div class="flex align-items-center gap-2 mb-4">
      <pv-button
          icon="pi pi-arrow-left"
          text
          rounded
          @click="router.go(-1)" />
      <h1 class="m-0">{{ currentBox?.name || 'Loading...' }}</h1>
    </div>

    <div v-if="loading" class="text-center py-4">
      <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
      <p class="mt-2">Loading box details...</p>
    </div>

    <div v-else-if="currentBox" class="grid">
      <!-- Box Overview -->
      <div class="col-12 lg:col-8">
        <pv-card>
          <template #header>
            <h2 class="m-0">Box Information</h2>
          </template>
          <template #content>
            <div class="grid">
              <div class="col-12 md:col-6">
                <h4>Capacity</h4>
                <p class="text-900 font-bold text-xl">
                  {{ currentBox.currentOccupancy }}/{{ currentBox.capacity }}
                  <span class="text-sm text-500">({{ utilizationRate.toFixed(1) }}%)</span>
                </p>
                <pv-progress-bar
                    :value="utilizationRate"
                    :class="{
                                        'high-utilization': utilizationRate > 90,
                                        'medium-utilization': utilizationRate > 75 && utilizationRate <= 90
                                    }" />
              </div>
              <div class="col-12 md:col-6">
                <h4>Location</h4>
                <p class="text-600">{{ currentBox.location }}</p>
              </div>
              <div v-if="currentBox.storageConditions" class="col-12">
                <h4>Storage Conditions</h4>
                <div class="grid">
                  <div v-if="currentBox.storageConditions.temperature" class="col-12 md:col-4">
                    <i class="pi pi-thermometer mr-2"></i>
                    Temperature: {{ currentBox.storageConditions.temperature }}°C
                  </div>
                  <div v-if="currentBox.storageConditions.humidity" class="col-12 md:col-4">
                    <i class="pi pi-cloud mr-2"></i>
                    Humidity: {{ currentBox.storageConditions.humidity }}%
                  </div>
                </div>
              </div>
            </div>
          </template>
        </pv-card>

        <!-- Product Instances -->
        <pv-card class="mt-4">
          <template #header>
            <div class="flex justify-content-between align-items-center">
              <h2 class="m-0">Products in this Box</h2>
              <pv-button
                  label="Add Product"
                  icon="pi pi-plus"
                  @click="showAddProduct = true" />
            </div>
          </template>
          <template #content>
            <div v-if="currentBox.productInstances.length === 0" class="text-center py-4">
              <i class="pi pi-inbox text-4xl text-400 mb-2"></i>
              <h3 class="text-900 font-medium mb-2">No Products</h3>
              <p class="text-600 mb-4">Add products to this box to get started.</p>
              <pv-button
                  label="Add First Product"
                  icon="pi pi-plus"
                  @click="showAddProduct = true" />
            </div>

            <div v-else class="grid">
              <div
                  v-for="product in currentBox.productInstances"
                  :key="product.id"
                  class="col-12 md:col-6">
                <pv-card class="product-instance-card">
                  <template #content>
                    <div class="flex justify-content-between align-items-start mb-2">
                      <h4 class="m-0">Product #{{ product.productTypeId }}</h4>
                      <pv-tag
                          :value="product.quantity"
                          severity="info"
                          class="ml-2" />
                    </div>
                    <div class="text-sm text-600 mb-2">
                      Expires: {{ new Date(product.expirationDate).toLocaleDateString() }}
                    </div>
                    <div class="text-sm">
                                            <span :class="{
                                                'text-green-500': product.daysUntilExpiration > 7,
                                                'text-orange-500': product.daysUntilExpiration <= 7 && product.daysUntilExpiration > 0,
                                                'text-red-500': product.daysUntilExpiration <= 0
                                            }">
                                                {{ product.daysUntilExpiration }} days left
                                            </span>
                    </div>
                  </template>
                </pv-card>
              </div>
            </div>
          </template>
        </pv-card>
      </div>

      <!-- Quick Actions -->
      <div class="col-12 lg:col-4">
        <pv-card>
          <template #header>
            <h3 class="m-0">Quick Actions</h3>
          </template>
          <template #content>
            <div class="flex flex-column gap-3">
              <pv-button
                  label="Add Product"
                  icon="pi pi-plus"
                  class="w-full"
                  @click="showAddProduct = true" />
              <pv-button
                  label="Edit Box"
                  icon="pi pi-pencil"
                  severity="secondary"
                  class="w-full" />
              <pv-button
                  label="View Inventory"
                  icon="pi pi-arrow-left"
                  severity="secondary"
                  class="w-full"
                  @click="router.go(-1)" />
            </div>
          </template>
        </pv-card>
      </div>
    </div>

    <!-- Add Product Dialog -->
    <pv-dialog v-model:visible="showAddProduct" header="Add Product to Box" :modal="true">
      <div class="p-fluid">
        <div class="field mb-3">
          <label for="productType">Product Type</label>
          <pv-input-text id="productType" v-model="newProductForm.productTypeId" required />
        </div>
        <div class="field mb-3">
          <label for="quantity">Quantity</label>
          <pv-input-number id="quantity" v-model="newProductForm.quantity" :min="1" required />
        </div>
        <div class="field mb-3">
          <label for="expirationDate">Expiration Date</label>
          <pv-calendar id="expirationDate" v-model="newProductForm.expirationDate" date-format="yy-mm-dd" />
        </div>
      </div>
      <template #footer>
        <pv-button label="Cancel" icon="pi pi-times" text @click="showAddProduct = false" />
        <pv-button label="Add" icon="pi pi-check" @click="handleAddProduct" />
      </template>
    </pv-dialog>
  </div>
</template>

<style scoped>
.box-detail {
  padding: 1rem;
}

.product-instance-card {
  transition: all 0.2s ease;
}

.product-instance-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:deep(.high-utilization .p-progressbar-value) {
  background-color: #f87171 !important;
}

:deep(.medium-utilization .p-progressbar-value) {
  background-color: #fbbf24 !important;
}
</style>