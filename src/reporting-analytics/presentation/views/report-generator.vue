<template>
  <div class="report-generator">
    <div class="page-header">
      <h1>{{ isEditMode ? 'Edit Report' : 'Create New Report' }}</h1>
      <div class="header-actions">
        <button
            @click="saveReport"
            :disabled="!isFormValid || saving"
            class="btn btn-primary"
        >
          {{ saving ? 'Saving...' : 'Save Report' }}
        </button>
        <button
            @click="previewReport"
            :disabled="!isFormValid || previewing"
            class="btn btn-secondary"
        >
          {{ previewing ? 'Generating...' : 'Preview' }}
        </button>
      </div>
    </div>

    <div v-if="error" class="alert alert-error">
      {{ error }}
    </div>

    <div class="report-form">
      <div class="form-section">
        <h2>Basic Information</h2>
        <div class="form-group">
          <label for="report-name">Report Name *</label>
          <input
              id="report-name"
              v-model="reportData.name"
              type="text"
              placeholder="Enter report name"
              :class="{ 'error': !reportData.name }"
          />
        </div>

        <div class="form-group">
          <label for="report-type">Report Type *</label>
          <select
              id="report-type"
              v-model="reportData.type"
              :class="{ 'error': !reportData.type }"
          >
            <option value="">Select report type</option>
            <option value="waste">Waste Report</option>
            <option value="inventory">Inventory Report</option>
            <option value="financial">Financial Report</option>
            <option value="performance">Performance Report</option>
          </select>
        </div>
      </div>

      <div class="form-section">
        <h2>Filters & Criteria</h2>
        <div class="filters-grid">
          <div class="form-group">
            <label for="date-range">Date Range</label>
            <select id="date-range" v-model="reportData.filters.dateRange">
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div class="form-group">
            <label for="location">Location</label>
            <select id="location" v-model="reportData.filters.location">
              <option value="all">All Locations</option>
              <option value="main">Main Facility</option>
              <option value="warehouse">Warehouse</option>
              <option value="retail">Retail Store</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-section">
        <h2>Columns & Fields</h2>
        <div class="columns-list">
          <div
              v-for="(column, index) in reportData.columns"
              :key="index"
              class="column-item"
          >
            <input
                v-model="column.name"
                placeholder="Column name"
            />
            <select v-model="column.type">
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="currency">Currency</option>
            </select>
            <button @click="removeColumn(index)" class="btn btn-danger btn-sm">
              Remove
            </button>
          </div>
          <button @click="addColumn" class="btn btn-outline">
            + Add Column
          </button>
        </div>
      </div>

      <div class="form-section">
        <h2>Schedule & Export</h2>
        <div class="form-group">
          <label for="export-format">Export Format</label>
          <select id="export-format" v-model="reportData.format">
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="csv">CSV</option>
          </select>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input
                type="checkbox"
                v-model="enableScheduling"
            />
            Enable Scheduled Reports
          </label>
        </div>

        <div v-if="enableScheduling" class="scheduling-options">
          <div class="form-group">
            <label for="schedule-frequency">Frequency</label>
            <select id="schedule-frequency" v-model="reportData.schedule.frequency">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <div v-if="showPreview" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Report Preview</h3>
          <button @click="showPreview = false" class="btn btn-close">×</button>
        </div>
        <div class="modal-body">
          <div v-if="previewData" class="preview-table">
            <table>
              <thead>
              <tr>
                <th v-for="column in reportData.columns" :key="column.name">
                  {{ column.name }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(row, index) in previewData.rows" :key="index">
                <td v-for="column in reportData.columns" :key="column.name">
                  {{ row[column.name] || 'Sample Data' }}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="loading">Generating preview...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'ReportGenerator',
  setup() {
    const route = useRoute();
    const reportId = route.params.id;
    const isEditMode = ref(!!reportId);

    const reportData = ref({
      name: '',
      type: '',
      filters: {
        dateRange: 'last7days',
        location: 'all'
      },
      columns: [],
      format: 'pdf',
      schedule: {
        frequency: 'daily',
        enabled: false
      }
    });

    const saving = ref(false);
    const previewing = ref(false);
    const error = ref(null);
    const showPreview = ref(false);
    const previewData = ref(null);
    const enableScheduling = ref(false);

    const isFormValid = computed(() => {
      return reportData.value.name.trim() !== '' &&
          reportData.value.type !== '' &&
          reportData.value.columns.length > 0;
    });

    const loadReport = async () => {
      if (!isEditMode.value) return;

      try {
        // TODO: Implement report loading logic
        console.log('Loading report:', reportId);
      } catch (err) {
        error.value = 'Failed to load report: ' + err.message;
      }
    };

    const saveReport = async () => {
      saving.value = true;
      error.value = null;

      try {
        // TODO: Implement save logic using ReportingStore
        console.log('Saving report:', reportData.value);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Show success message and redirect
        alert('Report saved successfully!');
      } catch (err) {
        error.value = 'Failed to save report: ' + err.message;
      } finally {
        saving.value = false;
      }
    };

    const previewReport = async () => {
      previewing.value = true;

      try {
        // TODO: Implement preview logic
        await new Promise(resolve => setTimeout(resolve, 1500));
        previewData.value = {
          rows: Array(5).fill().map((_, i) => ({ id: i + 1 }))
        };
        showPreview.value = true;
      } catch (err) {
        error.value = 'Failed to generate preview: ' + err.message;
      } finally {
        previewing.value = false;
      }
    };

    const addColumn = () => {
      reportData.value.columns.push({
        name: '',
        type: 'text'
      });
    };

    const removeColumn = (index) => {
      reportData.value.columns.splice(index, 1);
    };

    onMounted(() => {
      if (isEditMode.value) {
        loadReport();
      }
    });

    return {
      reportData,
      saving,
      previewing,
      error,
      showPreview,
      previewData,
      enableScheduling,
      isEditMode,
      isFormValid,
      saveReport,
      previewReport,
      addColumn,
      removeColumn
    };
  }
};
</script>

<style scoped>
.report-generator {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.form-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.form-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  font-size: 1.2em;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input.error,
.form-group select.error {
  border-color: #e74c3c;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.columns-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.column-item {
  display: flex;
  gap: 10px;
  align-items: center;
}

.column-item input,
.column-item select {
  flex: 1;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.scheduling-options {
  margin-top: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 4px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

.modal-body {
  padding: 20px;
}

.preview-table {
  overflow-x: auto;
}

.preview-table table {
  width: 100%;
  border-collapse: collapse;
}

.preview-table th,
.preview-table td {
  padding: 8px 12px;
  border: 1px solid #ddd;
  text-align: left