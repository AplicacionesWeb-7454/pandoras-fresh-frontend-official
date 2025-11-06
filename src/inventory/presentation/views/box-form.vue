<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBoxInventoryStore } from '../../application/box-inventory.store.js';

const route = useRoute();
const router = useRouter();
const store = useBoxInventoryStore();

const { updateBox, loading } = store;

const form = ref({
  name: '',
  capacity: 10,
  location: '',
  storageConditions: {
    temperature: null,
    humidity: null,
    type: 'dry'
  }
});

onMounted(() => {
  // In a real app, you'd fetch the box data here
  // For now, we'll set default values
});

const saveBox = async () => {
  try {
    await updateBox(route.params.id, form.value);
    router.go(-1); // Go back to previous page
  } catch (error) {
    console.error('Failed to save box:', error);
  }
};

const cancel = () => {
  router.go(-1);
};
</script>

<template>
  <div class="box-form">
    <div class="flex align-items-center gap-2 mb-4">
      <pv-button
          icon="pi pi-arrow-left"
          text
          rounded
          @click="cancel" />
      <h1 class="m-0">Edit Box</h1>
    </div>

    <pv-card>
      <template #content>
        <form @submit.prevent="saveBox" class="p-fluid">
          <div class="grid">
            <div class="col-12 md:col-6">
              <div class="field">
                <label for="name">Box Name *</label>
                <pv-input-text
                    id="name"
                    v-model="form.name"
                    required
                    placeholder="Enter box name"
                    class="w-full" />
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <label for="capacity">Capacity *</label>
                <pv-input-number
                    id="capacity"
                    v-model="form.capacity"
                    :min="1"
                    required
                    class="w-full" />
              </div>
            </div>

            <div class="col-12">
              <div class="field">
                <label for="location">Location</label>
                <pv-input-text
                    id="location"
                    v-model="form.location"
                    placeholder="Enter box location"
                    class="w-full" />
              </div>
            </div>

            <div class="col-12">
              <h3>Storage Conditions</h3>
            </div>

            <div class="col-12 md:col-4">
              <div class="field">
                <label for="temperature">Temperature (°C)</label>
                <pv-input-number
                    id="temperature"
                    v-model="form.storageConditions.temperature"
                    :min="-50"
                    :max="50"
                    suffix="°C"
                    class="w-full" />
              </div>
            </div>

            <div class="col-12 md:col-4">
              <div class="field">
                <label for="humidity">Humidity (%)</label>
                <pv-input-number
                    id="humidity"
                    v-model="form.storageConditions.humidity"
                    :min="0"
                    :max="100"
                    suffix="%"
                    class="w-full" />
              </div>
            </div>

            <div class="col-12 md:col-4">
              <div class="field">
                <label for="type">Storage Type</label>
                <pv-select
                    id="type"
                    v-model="form.storageConditions.type"
                    :options="['dry', 'refrigerated', 'frozen', 'crisper']"
                    placeholder="Select storage type"
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
                label="Update"
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
.box-form {
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