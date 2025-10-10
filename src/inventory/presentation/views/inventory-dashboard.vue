<script setup>
import { useI18n } from "vue-i18n";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import useInventoryStore from "../../application/inventory.store.js";
import ProductList from "./product-list.vue";

const { t } = useI18n();
const router = useRouter();
const store = useInventoryStore();

const {
  products,
  productsLoaded,
  inventory,
  expiringProducts,
  lowStockProducts,
  expiredProducts,
  fetchProducts,
  fetchInventory
} = store;

const loading = ref(false);

onMounted(async () => {
  if (!productsLoaded) {
    loading.value = true;
    await Promise.all([fetchProducts(), fetchInventory()]);
    loading.value = false;
  }
});

// Computed properties for dashboard metrics
const dashboardStats = computed(() => [
  {
    title: 'Total Products',
    value: products.length,
    icon: 'pi pi-box',
    color: 'text-primary',
    bgColor: 'bg-blue-50',
    description: 'Products in inventory'
  },
  {
    title: 'Expiring Soon',
    value: expiringProducts.length,
    icon: 'pi pi-clock',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    description: 'Expiring in next 3 days'
  },
  {
    title: 'Low Stock',
    value: lowStockProducts.length,
    icon: 'pi pi-exclamation-triangle',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    description: 'Quantity below 10'
  },
  {
    title: 'Expired',
    value: expiredProducts.length,
    icon: 'pi pi-times-circle',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    description: 'Past expiration date'
  }
]);

const categoryDistribution = computed(() => {
  const distribution = {};
  products.forEach(product => {
    distribution[product.category] = (distribution[product.category] || 0) + 1;
  });
  return Object.entries(distribution).map(([category, count]) => ({
    category,
    count,
    percentage: ((count / products.length) * 100).toFixed(1)
  }));
});

const recentProducts = computed(() => {
  return [...products]
      .sort((a, b) => new Date(b.expirationDate) - new Date(a.expirationDate))
      .slice(0, 6);
});

const navigateToProducts = () => {
  router.push({ name: 'inventory-products' });
};

const navigateToNewProduct = () => {
  router.push({ name: 'inventory-product-new' });
};

const refreshData = async () => {
  loading.value = true;
  await Promise.all([fetchProducts(), fetchInventory()]);
  loading.value = false;
};
</script>

<template>
  <div class="inventory-dashboard">
    <!-- Header -->
    <div class="flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="mb-1">Inventory Dashboard</h1>
        <p class="text-color-secondary m-0">Overview of your inventory status and key metrics</p>
      </div>
      <div class="flex gap-2">
        <pv-button
            icon="pi pi-refresh"
            :loading="loading"
            severity="secondary"
            @click="refreshData"
            v-tooltip="'Refresh data'" />
        <pv-button
            label="Add Product"
            icon="pi pi-plus"
            @click="navigateToNewProduct" />
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="grid mb-4">
      <div
          v-for="stat in dashboardStats"
          :key="stat.title"
          class="col-12 md:col-6 lg:col-3">
        <pv-card class="stat-card" :class="stat.bgColor">
          <template #content>
            <div class="flex justify-content-between align-items-center">
              <div>
                <div class="text-2xl font-bold" :class="stat.color">{{ stat.value }}</div>
                <div class="text-900 font-medium mb-2">{{ stat.title }}</div>
                <div class="text-sm text-600">{{ stat.description }}</div>
              </div>
              <i :class="[stat.icon, 'text-3xl', stat.color]"></i>
            </div>
          </template>
        </pv-card>
      </div>
    </div>

    <div class="grid">
      <!-- Category Distribution -->
      <div class="col-12 lg:col-6">
        <pv-card>
          <template #header>
            <div class="flex justify-content-between align-items-center">
              <h2 class="m-0">Products by Category</h2>
              <pv-badge :value="categoryDistribution.length" />
            </div>
          </template>
          <template #content>
            <div v-if="categoryDistribution.length > 0">
              <div
                  v-for="item in categoryDistribution"
                  :key="item.category"
                  class="category-item mb-3">
                <div class="flex justify-content-between align-items-center mb-1">
                  <span class="font-medium">{{ item.category }}</span>
                  <span class="text-600">{{ item.count }} ({{ item.percentage }}%)</span>
                </div>
                <pv-progress-bar
                    :value="item.percentage"
                    :show-value="false"
                    class="h-2rem" />
              </div>
            </div>
            <div v-else class="text-center py-4">
              <i class="pi pi-chart-bar text-4xl text-400 mb-2"></i>
              <p class="text-600 m-0">No category data available</p>
            </div>
          </template>
        </pv-card>
      </div>

      <!-- Quick Actions -->
      <div class="col-12 lg:col-6">
        <pv-card>
          <template #header>
            <h2 class="m-0">Quick Actions</h2>
          </template>
          <template #content>
            <div class="grid">
              <div class="col-12 md:col-6">
                <pv-card class="action-card cursor-pointer" @click="navigateToProducts">
                  <template #content>
                    <div class="text-center p-3">
                      <i class="pi pi-list text-4xl text-primary mb-2"></i>
                      <div class="font-bold">View All Products</div>
                      <div class="text-sm text-600">Browse complete inventory</div>
                    </div>
                  </template>
                </pv-card>
              </div>
              <div class="col-12 md:col-6">
                <pv-card class="action-card cursor-pointer" @click="navigateToNewProduct">
                  <template #content>
                    <div class="text-center p-3">
                      <i class="pi pi-plus-circle text-4xl text-green-500 mb-2"></i>
                      <div class="font-bold">Add Product</div>
                      <div class="text-sm text-600">Create new inventory item</div>
                    </div>
                  </template>
                </pv-card>
              </div>
              <div class="col-12 md:col-6">
                <pv-card class="action-card">
                  <template #content>
                    <div class="text-center p-3">
                      <i class="pi pi-file-export text-4xl text-orange-500 mb-2"></i>
                      <div class="font-bold">Export Report</div>
                      <div class="text-sm text-600">Download inventory data</div>
                    </div>
                  </template>
                </pv-card>
              </div>
              <div class="col-12 md:col-6">
                <pv-card class="action-card">
                  <template #content>
                    <div class="text-center p-3">
                      <i class="pi pi-chart-line text-4xl text-cyan-500 mb-2"></i>
                      <div class="font-bold">Analytics</div>
                      <div class="text-sm text-600">View trends & insights</div>
                    </div>
                  </template>
                </pv-card>
              </div>
            </div>
          </template>
        </pv-card>
      </div>

      <!-- Recent Products / Expiring Soon -->
      <div class="col-12">
        <pv-card>
          <template #header>
            <div class="flex justify-content-between align-items-center">
              <h2 class="m-0">Products Expiring Soon</h2>
              <pv-button
                  label="View All"
                  text
                  @click="navigateToProducts" />
            </div>
          </template>
          <template #content>
            <ProductGrid
                :products="expiringProducts.slice(0, 8)"
                :loading="loading"
                size="small"
                :show-actions="false" />

            <div v-if="expiringProducts.length === 0" class="text-center py-4">
              <i class="pi pi-check-circle text-4xl text-green-500 mb-2"></i>
              <p class="text-600 m-0">No products expiring soon. Great job!</p>
            </div>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inventory-dashboard {
  padding: 1rem;
}

.stat-card {
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.action-card {
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.action-card:hover {
  transform: translateY(-2px);
  border-color: #1cb4d4;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.category-item:last-child {
  margin-bottom: 0;
}

:deep(.p-progressbar) {
  height: 0.5rem;
}
</style>