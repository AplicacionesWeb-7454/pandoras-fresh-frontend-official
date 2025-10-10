<template>
  <div class="waste-report">
    <div class="page-header">
      <h1>Food Waste Analytics</h1>
      <div class="header-actions">
        <button @click="generateExport" class="btn btn-primary">
          Export Report
        </button>
        <button @click="scheduleReport" class="btn btn-secondary">
          Schedule Weekly Report
        </button>
      </div>
    </div>

    <!-- KPIs Principales -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-value">{{ formatCurrency(totalWasteCost) }}</div>
        <div class="kpi-label">Total Waste Cost</div>
        <div class="kpi-trend" :class="wasteTrend">
          {{ wastePercentageChange }}% vs last period
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-value">{{ totalWasteKg }} kg</div>
        <div class="kpi-label">Food Waste</div>
        <div class="kpi-trend" :class="wasteTrend">
          {{ wastePercentageChange }}% vs last period
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-value">{{ potentialSavings }}%</div>
        <div class="kpi-label">Potential Savings</div>
        <div class="kpi-subtext">Through better inventory management</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-value">{{ carbonFootprint }} kg CO₂</div>
        <div class="kpi-label">Carbon Footprint</div>
        <div class="kpi-subtext">From food waste</div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="filters-section">
      <div class="filter-group">
        <label>Time Period</label>
        <select v-model="filters.timeRange" @change="loadWasteData">
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Location</label>
        <select v-model="filters.location" @change="loadWasteData">
          <option value="all">All Locations</option>
          <option value="main_kitchen">Main Kitchen</option>
          <option value="storage_cold">Cold Storage</option>
          <option value="storage_dry">Dry Storage</option>
          <option value="prep_area">Preparation Area</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Product Category</label>
        <select v-model="filters.category" @change="loadWasteData">
          <option value="all">All Categories</option>
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="meat">Meat & Poultry</option>
          <option value="seafood">Seafood</option>
          <option value="bakery">Bakery</option>
        </select>
      </div>
    </div>

    <!-- Gráficos y Análisis -->
    <div class="analytics-grid">
      <div class="chart-card">
        <h3>Waste by Category</h3>
        <div class="chart-container">
          <canvas ref="wasteByCategoryChart"></canvas>
        </div>
      </div>

      <div class="chart-card">
        <h3>Waste Trend</h3>
        <div class="chart-container">
          <canvas ref="wasteTrendChart"></canvas>
        </div>
      </div>

      <div class="chart-card">
        <h3>Top Wasted Products</h3>
        <div class="top-products-list">
          <div
              v-for="product in topWastedProducts"
              :key="product.id"
              class="product-item"
          >
            <span class="product-name">{{ product.name }}</span>
            <span class="waste-amount">{{ product.wasteAmount }} kg</span>
            <span class="waste-cost">{{ formatCurrency(product.cost) }}</span>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <h3>Expiry Date Risk</h3>
        <div class="risk-assessment">
          <div class="risk-item high-risk">
            <span class="risk-label">High Risk (1-2 days)</span>
            <span class="risk-count">{{ highRiskItems }} items</span>
          </div>
          <div class="risk-item medium-risk">
            <span class="risk-label">Medium Risk (3-5 days)</span>
            <span class="risk-count">{{ mediumRiskItems }} items</span>
          </div>
          <div class="risk-item low-risk">
            <span class="risk-label">Low Risk (6+ days)</span>
            <span class="risk-count">{{ lowRiskItems }} items</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla de Detalles -->
    <div class="details-section">
      <h3>Waste Details</h3>
      <div class="table-container">
        <table class="waste-details-table">
          <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity Wasted</th>
            <th>Cost</th>
            <th>Reason</th>
            <th>Date</th>
            <th>Location</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in wasteDetails" :key="item.id">
            <td>{{ item.productName }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.quantity }} {{ item.unit }}</td>
            <td>{{ formatCurrency(item.cost) }}</td>
            <td>
                <span class="reason-badge" :class="item.reason">
                  {{ item.reason }}
                </span>
            </td>
            <td>{{ formatDate(item.date) }}</td>
            <td>{{ item.location }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Recomendaciones -->
    <div class="recommendations-section">
      <h3>Waste Reduction Recommendations</h3>
      <div class="recommendations-grid">
        <div class="recommendation-card">
          <div class="rec-icon">📦</div>
          <h4>Inventory Optimization</h4>
          <p>Reduce overstocking of {{ topWastedProducts[0]?.name }} by 30% based on consumption patterns</p>
        </div>

        <div class="recommendation-card">
          <div class="rec-icon">🌡️</div>
          <h4>Temperature Control</h4>
          <p>Adjust cold storage settings to maintain optimal temperature ranges</p>
        </div>

        <div class="recommendation-card">
          <div class="rec-icon">🔄</div>
          <h4>First-Expired-First-Out</h4>
          <p>Implement FEFO system to prioritize items nearing expiration</p>
        </div>

        <div class="recommendation-card">
          <div class="rec-icon">📊</div>
          <h4>Portion Control</h4>
          <p>Adjust portion sizes based on historical waste data</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'WasteReport',
  setup() {
    const filters = ref({
      timeRange: 'last30days',
      location: 'all',
      category: 'all'
    });

    const wasteData = ref({
      summary: {
        totalCost: 0,
        totalWeight: 0,
        itemsCount: 0,
        trend: 0
      },
      byCategory: [],
      trends: [],
      details: []
    });

    const loading = ref(false);

    // Computed properties
    const totalWasteCost = computed(() => wasteData.value.summary.totalCost);
    const totalWasteKg = computed(() => wasteData.value.summary.totalWeight);
    const wastePercentageChange = computed(() => wasteData.value.summary.trend);
    const wasteTrend = computed(() => wasteData.value.summary.trend >= 0 ? 'negative' : 'positive');

    const potentialSavings = computed(() => {
      const savings = Math.max(0, (wasteData.value.summary.trend / 100) * 25);
      return Math.min(savings, 40); // Cap at 40%
    });

    const carbonFootprint = computed(() => {
      // Estimate: 2.5 kg CO₂ per kg of food waste
      return Math.round(totalWasteKg.value * 2.5);
    });

    const topWastedProducts = computed(() => {
      return wasteData.value.details
          .slice(0, 5)
          .map(item => ({
            id: item.id,
            name: item.productName,
            wasteAmount: item.quantity,
            cost: item.cost
          }));
    });

    const highRiskItems = computed(() =>
        wasteData.value.details.filter(item => item.expiryRisk === 'high').length
    );

    const mediumRiskItems = computed(() =>
        wasteData.value.details.filter(item => item.expiryRisk === 'medium').length
    );

    const lowRiskItems = computed(() =>
        wasteData.value.details.filter(item => item.expiryRisk === 'low').length
    );

    const wasteDetails = computed(() => wasteData.value.details);

    // Methods
    const loadWasteData = async () => {
      loading.value = true;
      try {
        // Simular carga de datos para Pandora's Fresh
        await new Promise(resolve => setTimeout(resolve, 1000));

        wasteData.value = {
          summary: {
            totalCost: 2450.75,
            totalWeight: 156.8,
            itemsCount: 89,
            trend: 12.5
          },
          byCategory: [
            { category: 'produce', amount: 45.2, cost: 850.50 },
            { category: 'dairy', amount: 32.1, cost: 420.75 },
            { category: 'meat', amount: 28.5, cost: 780.30 },
            { category: 'seafood', amount: 25.8, cost: 285.60 },
            { category: 'bakery', amount: 25.2, cost: 113.60 }
          ],
          trends: [
            { date: '2024-01-01', amount: 12.5, cost: 195.00 },
            { date: '2024-01-02', amount: 15.2, cost: 238.00 },
            { date: '2024-01-03', amount: 8.7, cost: 136.00 },
            // ... más datos
          ],
          details: [
            {
              id: 1,
              productName: 'Organic Tomatoes',
              category: 'produce',
              quantity: 8.5,
              unit: 'kg',
              cost: 42.50,
              reason: 'spoilage',
              date: '2024-01-15',
              location: 'main_kitchen',
              expiryRisk: 'high'
            },
            // ... más items
          ]
        };

        renderCharts();
      } catch (error) {
        console.error('Error loading waste data:', error);
      } finally {
        loading.value = false;
      }
    };

    const renderCharts = () => {
      renderWasteByCategoryChart();
      renderWasteTrendChart();
    };

    const renderWasteByCategoryChart = () => {
      const ctx = document.getElementById('wasteByCategoryChart');
      if (!ctx) return;

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: wasteData.value.byCategory.map(item => item.category),
          datasets: [{
            data: wasteData.value.byCategory.map(item => item.amount),
            backgroundColor: [
              '#4CAF50', '#2196F3', '#FF9800', '#F44336', '#9C27B0'
            ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    };

    const renderWasteTrendChart = () => {
      const ctx = document.getElementById('wasteTrendChart');
      if (!ctx) return;

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: wasteData.value.trends.map(item => item.date),
          datasets: [{
            label: 'Waste Amount (kg)',
            data: wasteData.value.trends.map(item => item.amount),
            borderColor: '#FF6B6B',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    };

    const generateExport = () => {
      // Lógica para generar exportación
      console.log('Generating waste report export...');
    };

    const scheduleReport = () => {
      // Lógica para programar reporte
      console.log('Scheduling waste report...');
    };

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };

    onMounted(() => {
      loadWasteData();
    });

    return {
      filters,
      loading,
      totalWasteCost,
      totalWasteKg,
      wastePercentageChange,
      wasteTrend,
      potentialSavings,
      carbonFootprint,
      topWastedProducts,
      highRiskItems,
      mediumRiskItems,
      lowRiskItems,
      wasteDetails,
      loadWasteData,
      generateExport,
      scheduleReport,
      formatCurrency,
      formatDate
    };
  }
};
</script>

<style scoped>
.waste-report {
  padding: 20px;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.kpi-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.kpi-value {
  font-size: 2em;
  font-weight: bold;
  color: #2c3e50;
}

.kpi-label {
  color: #7f8c8d;
  margin: 8px 0;
}

.kpi-trend.positive {
  color: #27ae60;
}

.kpi-trend.negative {
  color: #e74c3c;
}

.kpi-subtext {
  font-size: 0.8em;
  color: #95a5a6;
}

.filters-section {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filter-group label {
  font-weight: 500;
  color: #2c3e50;
}

.filter-group select {
  padding: 8px 12px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  min-width: 150px;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.chart-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chart-card h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #2c3e50;
}

.chart-container {
  height: 250px;
}

.top-products-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #ecf0f1;
}

.product-name {
  flex: 1;
  font-weight: 500;
}

.waste-amount, .waste-cost {
  font-size: 0.9em;
  color: #7f8c8d;
  margin-left: 10px;
}

.risk-assessment {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.risk-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  color: white;
}

.risk-item.high-risk {
  background: #e74c3c;
}

.risk-item.medium-risk {
  background: #f39c12;
}

.risk-item.low-risk {
  background: #27ae60;
}

.details-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.table-container {
  overflow-x: auto;
}

.waste-details-table {
  width: 100%;
  border-collapse: collapse;
}

.waste-details-table th,
.waste-details-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ecf0f1;
}

.waste-details-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

.reason-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 500;
}

.reason-badge.spoilage {
  background: #ffeaa7;
  color: #e17055;
}

.reason-badge.overproduction {
  background: #fab1a0;
  color: #d63031;
}

.reason-badge.expired {
  background: #fd79a8;
  color: #a29bfe;
}

.recommendations-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.recommendation-card {
  padding: 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  text-align: center;
}

.rec-icon {
  font-size: 2em;
  margin-bottom: 10px;
}

.recommendation-card h4 {
  margin: 10px 0;
  color: #2c3e50;
}

.recommendation-card p {
  color: #7f8c8d;
  font-size: 0.9em;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .filters-section {
    flex-direction: column;
  }

  .analytics-grid {
    grid-template-columns: 1fr;
  }

  .kpi-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>