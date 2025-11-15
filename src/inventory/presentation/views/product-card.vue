<script setup>
import { useI18n } from "vue-i18n";
import { useConfirm } from "primevue";

const { t } = useI18n();
const confirm = useConfirm();

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  showActions: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
});

const emit = defineEmits(['edit', 'delete', 'view']);

const getExpirationStatus = (product) => {
  if (product.isExpired()) return { severity: 'danger', label: t('status.expired'), icon: 'pi pi-exclamation-circle' };
  if (product.isExpiringSoon()) return { severity: 'warning', label: t('status.expiringSoon'), icon: 'pi pi-clock' };
  return { severity: 'success', label: t('status.fresh'), icon: 'pi pi-check' };
};

const getStockStatus = (product) => {
  if (product.quantity === 0) return { severity: 'danger', label: t('status.outOfStock'), icon: 'pi pi-times' };
  if (product.quantity < 10) return { severity: 'warning', label: t('status.lowStock'), icon: 'pi pi-exclamation-triangle' };
  return { severity: 'success', label: t('status.inStock'), icon: 'pi pi-check' };
};

const getCategoryColor = (category) => {
  const colors = {
    'Vegetables': 'green',
    'Fruits': 'orange',
    'Dairy': 'blue',
    'Meat': 'red',
    'Seafood': 'purple',
    'Bakery': 'yellow',
    'Beverages': 'teal'
  };
  return colors[category] || 'gray';
};

const formatExpirationDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const handleEdit = () => {
  emit('edit', props.product.id);
};

const handleDelete = () => {
  confirm.require({
    message: t('products.confirm-delete', { name: props.product.name }),
    header: t('products.delete-header'),
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      emit('delete', props.product.id);
    },
  });
};

const handleView = () => {
  emit('view', props.product.id);
};
</script>

<template>
  <pv-card class="product-card" :class="[`product-card--${size}`]">
    <template #header>
      <div class="product-card__header">
        <div class="product-card__category-tag" :class="`category-${getCategoryColor(product.category)}`">
          {{ product.category }}
        </div>
        <div class="product-card__status">
          <pv-tag
              :severity="getExpirationStatus(product).severity"
              :icon="getExpirationStatus(product).icon"
              :value="getExpirationStatus(product).label"
              class="mr-1" />
          <pv-tag
              :severity="getStockStatus(product).severity"
              :icon="getStockStatus(product).icon"
              :value="getStockStatus(product).label" />
        </div>
      </div>
    </template>

    <template #content>
      <div class="product-card__content" @click="handleView">
        <div class="product-card__name">{{ product.name }}</div>

        <div class="product-card__details">
          <div class="product-card__detail">
            <i class="pi pi-box mr-2"></i>
            <span>{{ $t('products.quantity') }}: {{ product.quantity }}</span>
          </div>

          <div class="product-card__detail">
            <i class="pi pi-calendar mr-2"></i>
            <span>{{ $t('products.expirationDate') }}: {{ formatExpirationDate(product.expirationDate) }}</span>
          </div>

          <div v-if="product.optimalTemperature" class="product-card__detail">
            <i class="pi pi-thermometer mr-2"></i>
            <span>{{ $t('products.optimalTemperature') }}: {{ product.optimalTemperature }}°C</span>
          </div>

          <div v-if="product.barcode" class="product-card__detail">
            <i class="pi pi-barcode mr-2"></i>
            <span>{{ product.barcode }}</span>
          </div>
        </div>

        <div class="product-card__expiration-days">
          <span v-if="product.daysUntilExpiration !== null"
                :class="`days-${getExpirationStatus(product).severity}`">
            {{ product.daysUntilExpiration }} {{ $t('common.daysLeft') }}
          </span>
        </div>
      </div>
    </template>

    <template #footer v-if="showActions">
      <div class="product-card__footer">
        <pv-button
            icon="pi pi-eye"
            :label="$t('products.view')"
            text
            size="small"
            @click="handleView" />
        <pv-button
            icon="pi pi-pencil"
            :label="$t('products.edit')"
            text
            size="small"
            @click="handleEdit" />
        <pv-button
            icon="pi pi-trash"
            :label="$t('products.delete')"
            severity="danger"
            text
            size="small"
            @click="handleDelete" />
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.product-card {
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem 1rem 0;
}

.product-card__category-tag {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.category-green { background-color: #e8f5e8; color: #2e7d32; }
.category-orange { background-color: #fff3e0; color: #ef6c00; }
.category-blue { background-color: #e3f2fd; color: #1565c0; }
.category-red { background-color: #ffebee; color: #c62828; }
.category-purple { background-color: #f3e5f5; color: #7b1fa2; }
.category-yellow { background-color: #fffde7; color: #f9a825; }
.category-teal { background-color: #e0f2f1; color: #00695c; }
.category-gray { background-color: #f5f5f5; color: #616161; }

.product-card__status {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.product-card__content {
  padding: 1rem;
}

.product-card__name {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #333;
}

.product-card__details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.product-card__detail {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #666;
}

.product-card__expiration-days {
  text-align: center;
  padding: 0.5rem;
  border-radius: 4px;
  font-weight: 600;
  margin-top: 0.5rem;
}

.days-danger { background-color: #ffebee; color: #c62828; }
.days-warning { background-color: #fff3e0; color: #ef6c00; }
.days-success { background-color: #e8f5e8; color: #2e7d32; }

.product-card__footer {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  border-top: 1px solid #e5e7eb;
}

/* Size variants */
.product-card--small .product-card__name {
  font-size: 1rem;
}

.product-card--small .product-card__details {
  gap: 0.25rem;
}

.product-card--small .product-card__detail {
  font-size: 0.75rem;
}

.product-card--large .product-card__name {
  font-size: 1.25rem;
}

.product-card--large .product-card__details {
  gap: 0.75rem;
}

.product-card--large .product-card__detail {
  font-size: 1rem;
}
</style>