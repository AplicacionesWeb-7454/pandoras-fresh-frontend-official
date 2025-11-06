<script setup>
import { useI18n } from "vue-i18n";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import useInventoryStore from "../../application/inventory.store.js";
import { useBoxInventoryStore } from "../../application/box-inventory.store.js";
import ProductList from "./product-list.vue";

const { t } = useI18n();
const router = useRouter();
const store = useInventoryStore();
const boxInventoryStore = useBoxInventoryStore();

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

const {
  inventories,
  boxes,
  inventoriesCount,
  boxesCount,
  overallUtilization,
  fetchInventories
} = boxInventoryStore;

const loading = ref(false);
const activeTab = ref(0); // 0 for simple, 1 for advanced

onMounted(async () => {
  if (!productsLoaded) {
    loading.value = true;
    await Promise.all([fetchProducts(), fetchInventory(), fetchInventories()]);
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

// Computed properties for advanced inventory metrics
const advancedDashboardStats = computed(() => [
  {
    title: 'Total Inventories',
    value: inventoriesCount,
    icon: 'pi pi-building',
    color: 'text-primary',
    bgColor: 'bg-blue-50',
    description: 'Inventory locations'
  },
  {
    title: 'Total Boxes',
    value: boxesCount,
    icon: 'pi pi-box',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    description: 'Storage boxes'
  },
  {
    title: 'Overall Utilization',
    value: `${overallUtilization.toFixed(1)}%`,
    icon: 'pi pi-chart-pie',
    color: overallUtilization > 90 ? 'text-red-500' : overallUtilization > 75 ? 'text-orange-500' : 'text-green-500',
    bgColor: overallUtilization > 90 ? 'bg-red-50' : overallUtilization > 75 ? 'bg-orange-50' : 'bg-green-50',
    description: 'Storage capacity used'
  },
  {
    title: 'Active Products',
    value: products.length,
    icon: 'pi pi-shopping-bag',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    description: 'Total product instances'
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

// Navigation functions
const navigateToProducts = () => {
  router.push({ name: 'inventory-products' });
};

const navigateToNewProduct = () => {
  router.push({ name: 'inventory-product-new' });
};

const navigateToInventories = () => {
  router.push({ name: 'inventory-management-list' });
};

const navigateToNewInventory = () => {
  router.push({ name: 'inventory-management-new' });
};

const navigateToProductRegistration = () => {
  router.push({ name: 'product-registration' });
};

const viewInventory = (inventoryId) => {
  router.push({ name: 'inventory-management-detail', params: { id: inventoryId } });
};

const viewBox = (boxId) => {
  router.push({ name: 'box-detail', params: { id: boxId } });
};

const refreshData = async () => {
  loading.value = true;
  await Promise.all([
    fetchProducts(),
    fetchInventory(),
    fetchInventories()
  ]);
  loading.value = false;
};

// Get recent inventories (last 3)
const recentInventories = computed(() => {
  return inventories.slice(0, 3);
});

// Get recent boxes (last 4)
const recentBoxes = computed(() => {
  return boxes.slice(0, 4);
});
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
      </div>
    </div>

    <!-- Tabs for Simple vs Advanced Inventory -->
    <pv-card class="mb-4">
      <template #content>
        <pv-tab-view v-model:activeIndex="activeTab">
          <pv-tab-panel header="Simple Inventory">
            <!-- Simple Inventory Content -->
            <div class="simple-inventory">
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
                          <pv-card class="action-card cursor-pointer" @click="navigateToInventories">
                            <template #content>
                              <div class="text-center p-3">
                                <i class="pi pi-building text-4xl text-orange-500 mb-2"></i>
                                <div class="font-bold">Advanced Inventory</div>
                                <div class="text-sm text-600">Box-based management</div>
                              </div>
                            </template>
                          </pv-card>
                        </div>
                        <div class="col-12 md:col-6">
                          <pv-card class="action-card">
                            <template #content>
                              <div class="text-center p-3">
                                <i class="pi pi-file-export text-4xl text-cyan-500 mb-2"></i>
                                <div class="font-bold">Export Report</div>
                                <div class="text-sm text-600">Download inventory data</div>
                              </div>
                            </template>
                          </pv-card>
                        </div>
                      </div>
                    </template>
                  </pv-card>
                </div>

                <!-- Products Expiring Soon -->
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
                      <ProductList
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
          </pv-tab-panel>

          <pv-tab-panel header="Advanced Inventory">
            <!-- Advanced Inventory Content -->
            <div class="advanced-inventory">
              <!-- Advanced Key Metrics -->
              <div class="grid mb-4">
                <div
                    v-for="stat in advancedDashboardStats"
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
                <!-- Recent Inventories -->
                <div class="col-12 lg:col-6">
                  <pv-card>
                    <template #header>
                      <div class="flex justify-content-between align-items-center">
                        <h2 class="m-0">Recent Inventories</h2>
                        <pv-button
                            label="Create New"
                            icon="pi pi-plus"
                            text
                            @click="navigateToNewInventory" />
                      </div>
                    </template>
                    <template #content>
                      <div v-if="recentInventories.length > 0">
                        <div
                            v-for="inv in recentInventories"
                            :key="inv.id"
                            class="inventory-item mb-3 p-3 border-round cursor-pointer"
                            @click="viewInventory(inv.id)">
                          <div class="flex justify-content-between align-items-center">
                            <div>
                              <h4 class="m-0 mb-1">{{ inv.name }}</h4>
                              <p class="text-600 m-0 text-sm">{{ inv.location }}</p>
                            </div>
                            <pv-badge :value="inv.boxes ? inv.boxes.length : 0" severity="info" />
                          </div>
                          <p class="text-500 text-sm mt-2">{{ inv.description }}</p>
                        </div>
                      </div>
                      <div v-else class="text-center py-4">
                        <i class="pi pi-inbox text-4xl text-400 mb-2"></i>
                        <p class="text-600 m-0">No inventories created yet</p>
                        <pv-button
                            label="Create First Inventory"
                            icon="pi pi-plus"
                            class="mt-3"
                            @click="navigateToNewInventory" />
                      </div>
                    </template>
                  </pv-card>
                </div>

                <!-- Recent Boxes -->
                <div class="col-12 lg:col-6">
                  <pv-card>
                    <template #header>
                      <div class="flex justify-content-between align-items-center">
                        <h2 class="m-0">Recent Boxes</h2>
                        <pv-button
                            label="Register Product"
                            icon="pi pi-plus"
                            text
                            @click="navigateToProductRegistration" />
                      </div>
                    </template>
                    <template #content>
                      <div v-if="recentBoxes.length > 0">
                        <div
                            v-for="box in recentBoxes"
                            :key="box.id"
                            class="box-item mb-3 p-3 border-round cursor-pointer"
                            @click="viewBox(box.id)">
                          <div class="flex justify-content-between align-items-center mb-2">
                            <h4 class="m-0">{{ box.name }}</h4>
                            <pv-badge
                                :value="`${box.currentOccupancy}/${box.capacity}`"
                                :severity="box.currentOccupancy / box.capacity > 0.9 ? 'danger' : box.currentOccupancy / box.capacity > 0.7 ? 'warning' : 'success'" />
                          </div>
                          <div class="flex justify-content-between text-sm">
                            <span class="text-500">Location:</span>
                            <span class="font-medium">{{ box.location }}</span>
                          </div>
                          <pv-progress-bar
                              :value="(box.currentOccupancy / box.capacity) * 100"
                              :show-value="false"
                              class="mt-2" />
                        </div>
                      </div>
                      <div v-else class="text-center py-4">
                        <i class="pi pi-box text-4xl text-400 mb-2"></i>
                        <p class="text-600 m-0">No boxes available</p>
                        <p class="text-500 text-sm mt-1">Create an inventory first to add boxes</p>
                      </div>
                    </template>
                  </pv-card>
                </div>

                <!-- Advanced Quick Actions -->
                <div class="col-12">
                  <pv-card>
                    <template #header>
                      <h2 class="m-0">Advanced Management</h2>
                    </template>
                    <template #content>
                      <div class="grid">
                        <div class="col-12 md:col-4">
                          <pv-card class="action-card cursor-pointer" @click="navigateToInventories">
                            <template #content>
                              <div class="text-center p-4">
                                <i class="pi pi-building text-4xl text-primary mb-3"></i>
                                <div class="font-bold text-lg">Manage Inventories</div>
                                <div class="text-sm text-600 mt-2">View and organize all inventory locations</div>
                              </div>
                            </template>
                          </pv-card>
                        </div>
                        <div class="col-12 md:col-4">
                          <pv-card class="action-card cursor-pointer" @click="navigateToNewInventory">
                            <template #content>
                              <div class="text-center p-4">
                                <i class="pi pi-plus-circle text-4xl text-green-500 mb-3"></i>
                                <div class="font-bold text-lg">Create Inventory</div>
                                <div class="text-sm text-600 mt-2">Set up new storage location</div>
                              </div>
                            </template>
                          </pv-card>
                        </div>
                        <div class="col-12 md:col-4">
                          <pv-card class="action-card cursor-pointer" @click="navigateToProductRegistration">
                            <template #content>
                              <div class="text-center p-4">
                                <i class="pi pi-shopping-bag text-4xl text-orange-500 mb-3"></i>
                                <div class="font-bold text-lg">Register Products</div>
                                <div class="text-sm text-600 mt-2">Add products to specific boxes</div>
                              </div>
                            </template>
                          </pv-card>
                        </div>
                      </div>
                    </template>
                  </pv-card>
                </div>
              </div>
            </div>
          </pv-tab-panel>
        </pv-tab-view>
      </template>
    </pv-card>
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
  height: 100%;
}

.action-card:hover {
  transform: translateY(-2px);
  border-color: #1cb4d4;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.category-item:last-child {
  margin-bottom: 0;
}

.inventory-item, .box-item {
  transition: all 0.2s ease;
  border: 1px solid #e5e7eb;
}

.inventory-item:hover, .box-item:hover {
  background-color: #f9fafb;
  border-color: #1cb4d4;
  transform: translateY(-1px);
}

:deep(.p-progressbar) {
  height: 0.5rem;
}

:deep(.p-tabview) {
  background: transparent;
}

:deep(.p-tabview-panels) {
  padding: 0;
  background: transparent;
}
</style>