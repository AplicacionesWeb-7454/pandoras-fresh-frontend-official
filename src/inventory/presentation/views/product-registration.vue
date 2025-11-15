<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBoxInventoryStore } from '../../application/box-inventory.store.js';

const router = useRouter();
const store = useBoxInventoryStore();

const { inventories, boxes, addProductToBox, loading, fetchInventories } = store;

const form = ref({
  productTypeId: '',
  productName: '',
  quantity: 1,
  expirationDate: '',
  boxId: '',
  inventoryId: ''
});

onMounted(async () => {
  await fetchInventories();
});

const saveProduct = async () => {
  try {
    await addProductToBox(form.value.boxId, {
      productTypeId: form.value.productTypeId,
      quantity: form.value.quantity,
      expirationDate: form.value.expirationDate
    });
    router.push({ name: 'box-detail', params: { id: form.value.boxId } });
  } catch (error) {
    console.error('Failed to register product:', error);
  }
};

const cancel = () => {
  router.push({ name: 'inventory-management-list' });
};

// Filter boxes based on selected inventory
const filteredBoxes = ref([]);
const onInventoryChange = () => {
  if (form.value.inventoryId) {
    filteredBoxes.value = boxes.value.filter(box => box.inventoryId == form.value.inventoryId);
  } else {
    filteredBoxes.value = [];
  }
  form.value.boxId = '';
};
</script>

<template>
  <div class="product-registration">
    <div class="flex align-items-center gap-2 mb-4">
      <pv-button
          icon="pi pi-arrow-left"
          text
          rounded
          @click="cancel" />
      <h1 class="m-0">Register Product</h1>
    </div>

    <pv-card>
      <template #content>
        <form @submit.prevent="saveProduct" class="p-fluid">
          <div class="grid">
            <div class="col-12">
              <h3 class="mt-0 mb-3">Product Information</h3>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <label for="productTypeId">Product Type ID *</label>
                <pv-input-text
                    id="productTypeId"
                    v-model="form.productTypeId"
                    required
                    placeholder="Enter product type ID"
                    class="w-full" />
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <label for="productName">Product Name</label>
                <pv-input-text
                    id="productName"
                    v-model="form.productName"
                    placeholder="Enter product name"
                    class="w-full" />
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <label for="quantity">Quantity *</label>
                <pv-input-number
                    id="quantity"
                    v-model="form.quantity"
                    :min="1"
                    required
                    class="w-full" />
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <label for="expirationDate">Expiration Date *</label>
                <pv-calendar
                    id="expirationDate"
                    v-model="form.expirationDate"
                    required
                    date-format="yy-mm-dd"
                    class="w-full" />
              </div>
            </div>

            <div class="col-12">
              <h3 class="mt-4 mb-3">Storage Location</h3>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <label for="inventoryId">Inventory</label>
                <pv-select
                    id="inventoryId"
                    v-model="form.inventoryId"
                    :options="inventories"
                    option-label="name"
                    option-value="id"
                    placeholder="Select inventory"
                    @change="onInventoryChange"
                    class="w-full" />
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <label for="boxId">Box *</label>
                <pv-select
                    id="boxId"
                    v-model="form.boxId"
                    :options="filteredBoxes"
                    option-label="name"
                    option-value="id"
                    required
                    placeholder="Select box"
                    class="w-full" />
              </div>
            </div>
          </div>

          <div class="flex justify-content-end gap-2 mt-4 pt-3 border-top-1 surface-border">
            <pv-button
                label="Cancel"
                severity="secondary"
                icon="pi pi-times"
                @click="cancel" />
            <pv-button
                label="Register Product"
                :loading="loading"
                icon="pi pi-check"
                type="submit" />
          </div>
        </form>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.product-registration {
  padding: 1rem;
}

.field {
  margin-bottom: 1.5rem;
}

.field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}

:deep(.p-calendar) {
  width: 100%;
}
</style>