<script setup>
import ProductCard from './product-card.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  products: {
    type: Array,
    required: true,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'medium'
  },
  showActions: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['edit', 'delete', 'view']);

const handleEdit = (productId) => {
  emit('edit', productId);
};

const handleDelete = (productId) => {
  emit('delete', productId);
};

const handleView = (productId) => {
  emit('view', productId);
};
</script>

<template>
  <div class="product-grid">
    <div v-if="loading" class="grid">
      <div v-for="n in 6" :key="n" class="col-12 md:col-6 lg:col-4">
        <pv-card class="product-card product-card--skeleton">
          <template #header>
            <p-skeleton width="60%" height="1.5rem" />
          </template>
          <template #content>
            <p-skeleton width="100%" height="1rem" class="mb-2" />
            <p-skeleton width="80%" height="1rem" class="mb-2" />
            <p-skeleton width="60%" height="1rem" />
          </template>
        </pv-card>
      </div>
    </div>

    <div v-else class="grid">
      <div
          v-for="product in products"
          :key="product.id"
          class="col-12 md:col-6 lg:col-4 xl:col-3">
        <ProductCard
            :product="product"
            :size="size"
            :show-actions="showActions"
            @edit="handleEdit"
            @delete="handleDelete"
            @view="handleView" />
      </div>
    </div>

    <div v-if="!loading && products.length === 0" class="empty-state">
      <i class="pi pi-inbox empty-state__icon"></i>
      <h3 class="empty-state__title">{{ $t('products.noProducts') }}</h3>
      <p class="empty-state__description">{{ $t('products.getStarted') }}</p>
    </div>
  </div>
</template>

<style scoped>
.product-grid {
  min-height: 400px;
}

.product-card--skeleton {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
}

.empty-state__icon {
  font-size: 4rem;
  color: #e5e7eb;
  margin-bottom: 1rem;
}

.empty-state__title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.empty-state__description {
  font-size: 1rem;
  color: #666;
}
</style>