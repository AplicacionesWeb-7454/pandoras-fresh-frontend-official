<script setup>
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ref, onMounted, computed } from "vue";
import useInventoryStore from "../../application/inventory.store.js";
import { Product } from "../../domain/model/product.entity.js";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const store = useInventoryStore();

const { errors, addProduct, updateProduct, getProductById } = store;

const form = ref({
  name: '',
  category: '',
  quantity: 0,
  expirationDate: '',
  optimalTemperature: null,
  optimalHumidity: null,
  barcode: ''
});

const loading = ref(false);
const isEdit = computed(() => !!route.params.id);
const pageTitle = computed(() => isEdit.value ? t('products.edit') : t('products.new'));

// Common product categories
const categories = ref([
  'Vegetables',
  'Fruits',
  'Dairy',
  'Meat',
  'Seafood',
  'Bakery',
  'Beverages',
  'Grains',
  'Canned Goods',
  'Frozen Foods',
  'Spices',
  'Oils'
]);

onMounted(() => {
  if (isEdit.value) {
    const product = getProductById(route.params.id);
    if (product) {
      form.value = {
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        expirationDate: product.expirationDate ? new Date(product.expirationDate).toISOString().split('T')[0] : '',
        optimalTemperature: product.optimalTemperature,
        optimalHumidity: product.optimalHumidity,
        barcode: product.barcode || ''
      };
    } else {
      router.push({ name: 'inventory-products' });
    }
  }
});

const saveProduct = async () => {
  loading.value = true;

  try {
    const productData = new Product({
      id: isEdit.value ? route.params.id : null,
      name: form.value.name,
      category: form.value.category,
      quantity: parseInt(form.value.quantity),
      expirationDate: form.value.expirationDate,
      optimalTemperature: form.value.optimalTemperature ? parseFloat(form.value.optimalTemperature) : null,
      optimalHumidity: form.value.optimalHumidity ? parseFloat(form.value.optimalHumidity) : null,
      barcode: form.value.barcode
    });

    if (isEdit.value) {
      await updateProduct(productData);
    } else {
      await addProduct(productData);
    }

    router.push({ name: 'inventory-products' });
  } catch (error) {
    console.error('Failed to save product:', error);
  } finally {
    loading.value = false;
  }
};

const cancel = () => {
  router.push({ name: 'inventory-products' });
};

const generateBarcode = () => {
  const randomBarcode = Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
  form.value.barcode = randomBarcode;
};
</script>

<template>
  <div class="product-form">
    <div class="flex align-items-center gap-2 mb-4">
      <pv-button
          icon="pi pi-arrow-left"
          text
          rounded
          @click="cancel"
          v-tooltip="t('common.back')" />
      <h1 class="m-0">{{ pageTitle }}</h1>
    </div>

    <pv-card>
      <template #content>
        <form @submit.prevent="saveProduct" class="p-fluid">
          <div class="grid">
            <!-- Basic Information -->
            <div class="col-12 md:col-8">
              <div class="grid">
                <div class="col-12">
                  <h3 class="mt-0 mb-3">{{ $t('products.basicInfo') }}</h3>
                </div>

                <div class="col-12 md:col-6">
                  <div class="field">
                    <label for="name">{{ $t('products.name') }} *</label>
                    <pv-input-text
                        id="name"
                        v-model="form.name"
                        required
                        :placeholder="$t('products.name')"
                        class="w-full" />
                  </div>
                </div>

                <div class="col-12 md:col-6">
                  <div class="field">
                    <label for="category">{{ $t('products.category') }} *</label>
                    <pv-select
                        id="category"
                        v-model="form.category"
                        :options="categories"
                        required
                        :placeholder="$t('products.category')"
                        class="w-full" />
                  </div>
                </div>

                <div class="col-12 md:col-6">
                  <div class="field">
                    <label for="quantity">{{ $t('products.quantity') }} *</label>
                    <pv-input-number
                        id="quantity"
                        v-model="form.quantity"
                        :min="0"
                        required
                        class="w-full" />
                  </div>
                </div>

                <div class="col-12 md:col-6">
                  <div class="field">
                    <label for="expirationDate">{{ $t('products.expirationDate') }} *</label>
                    <pv-calendar
                        id="expirationDate"
                        v-model="form.expirationDate"
                        required
                        date-format="yy-mm-dd"
                        class="w-full" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Information -->
            <div class="col-12 md:col-4">
              <div class="grid">
                <div class="col-12">
                  <h3 class="mt-0 mb-3">{{ $t('products.additionalInfo') }}</h3>
                </div>

                <div class="col-12">
                  <div class="field">
                    <label for="barcode">{{ $t('products.barcode') }}</label>
                    <div class="flex gap-2">
                      <pv-input-text
                          id="barcode"
                          v-model="form.barcode"
                          :placeholder="$t('products.barcode')"
                          class="flex-1" />
                      <pv-button
                          icon="pi pi-refresh"
                          severity="secondary"
                          @click="generateBarcode"
                          v-tooltip="$t('products.generateBarcode')" />
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="field">
                    <label for="optimalTemperature">{{ $t('products.optimalTemperature') }} (°C)</label>
                    <pv-input-number
                        id="optimalTemperature"
                        v-model="form.optimalTemperature"
                        :min="-50"
                        :max="50"
                        suffix="°C"
                        class="w-full" />
                  </div>
                </div>

                <div class="col-12">
                  <div class="field">
                    <label for="optimalHumidity">{{ $t('products.optimalHumidity') }} (%)</label>
                    <pv-input-number
                        id="optimalHumidity"
                        v-model="form.optimalHumidity"
                        :min="0"
                        :max="100"
                        suffix="%"
                        class="w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-content-end gap-2 mt-4 pt-3 border-top-1 surface-border">
            <pv-button
                :label="$t('products.cancel')"
                severity="secondary"
                icon="pi pi-times"
                @click="cancel" />
            <pv-button
                :label="isEdit ? $t('products.save') : $t('products.create')"
                :loading="loading"
                icon="pi pi-check"
                type="submit" />
          </div>
        </form>
      </template>
    </pv-card>

    <!-- Error Display -->
    <div v-if="errors.length" class="mt-3">
      <pv-message severity="error">
        <div v-for="error in errors" :key="error.message">
          {{ error.message }}
        </div>
      </pv-message>
    </div>
  </div>
</template>

<style scoped>
.product-form {
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