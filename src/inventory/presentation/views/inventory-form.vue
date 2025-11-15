<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBoxInventoryStore } from '../../application/box-inventory.store.js';

const route = useRoute();
const router = useRouter();
const store = useBoxInventoryStore();

const { createInventory, updateInventory, loading, errors } = store;

const isEdit = ref(false);
const form = ref({
  name: '',
  description: '',
  location: ''
});

const localError = ref('');

onMounted(() => {
  if (route.params.id) {
    isEdit.value = true;
    // In a real app, you'd fetch the inventory data here
  }
});

const saveInventory = async () => {
  console.log('Save inventory called', form.value); // Debug log

  // Basic validation
  if (!form.value.name.trim() || !form.value.location.trim()) {
    localError.value = 'Name and location are required';
    return;
  }

  try {
    localError.value = '';

    if (isEdit.value) {
      console.log('Updating inventory...'); // Debug log
      await updateInventory(route.params.id, form.value);
    } else {
      console.log('Creating inventory...'); // Debug log
      await createInventory(form.value);
    }

    console.log('Inventory saved successfully, navigating...'); // Debug log
    router.push({ name: 'inventory-management-list' });
  } catch (error) {
    console.error('Failed to save inventory:', error);
    localError.value = error.message || 'Failed to save inventory. Please try again.';
  }
};

const cancel = () => {
  router.push({ name: 'inventory-management-list' });
};
</script>

<template>
  <div class="inventory-form">
    <div class="flex align-items-center gap-2 mb-4">
      <pv-button
          icon="pi pi-arrow-left"
          text
          rounded
          @click="cancel" />
      <h1 class="m-0">{{ isEdit ? 'Edit Inventory' : 'Create Inventory' }}</h1>
    </div>

    <!-- Error Display -->
    <div v-if="localError" class="mb-4">
      <pv-message severity="error">
        {{ localError }}
      </pv-message>
    </div>

    <div v-if="errors.length" class="mb-4">
      <pv-message severity="error">
        <div v-for="error in errors" :key="error.message">
          {{ error.message }}
        </div>
      </pv-message>
    </div>

    <pv-card>
      <template #content>
        <form @submit.prevent="saveInventory" class="p-fluid">
          <div class="grid">
            <div class="col-12">
              <div class="field">
                <label for="name">Inventory Name *</label>
                <pv-input-text
                    id="name"
                    v-model="form.name"
                    required
                    placeholder="Enter inventory name"
                    class="w-full" />
              </div>
            </div>

            <div class="col-12">
              <div class="field">
                <label for="description">Description</label>
                <pv-textarea
                    id="description"
                    v-model="form.description"
                    rows="3"
                    placeholder="Enter inventory description"
                    class="w-full" />
              </div>
            </div>

            <div class="col-12">
              <div class="field">
                <label for="location">Location *</label>
                <pv-input-text
                    id="location"
                    v-model="form.location"
                    required
                    placeholder="Enter inventory location"
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
                :label="isEdit ? 'Update' : 'Create'"
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
.inventory-form {
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
</style>