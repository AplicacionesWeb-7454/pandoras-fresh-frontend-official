import { ref, computed } from 'vue';
import { ReportEntity } from '../domain/model/report.entity.js';
import { AnalyticsDashboardEntity } from '../domain/model/analytics-dashboard.entity.js';

export class ReportingStore {
    constructor(repository) {
        this.repository = repository;

        // Reactive state
        this.currentReport = ref(null);
        this.dashboard = ref(null);
        this.products = ref([]);
        this.loading = ref(false);
    }

    // Report methods
    async generateInventoryReport() {
        this.loading.value = true;

        try {
            const report = new ReportEntity({
                name: 'Reporte de Inventario General',
                type: 'inventory'
            });

            report.calculateMetrics(this.products.value);
            this.currentReport.value = report;

            await this.repository.saveReport(report);
            return report;
        } finally {
            this.loading.value = false;
        }
    }

    async generateWasteReport() {
        this.loading.value = true;

        try {
            const report = new ReportEntity({
                name: 'Reporte de Desperdicios',
                type: 'waste'
            });

            // Filtros específicos para desperdicios
            const wasteProducts = this.products.value.filter(product =>
                new Date(product.expiryDate) < new Date() ||
                this._isExpiringSoon(product.expiryDate)
            );

            report.calculateMetrics(wasteProducts);
            this.currentReport.value = report;

            await this.repository.saveReport(report);
            return report;
        } finally {
            this.loading.value = false;
        }
    }

    // Product management
    setProducts(products) {
        this.products.value = products;
    }

    addProduct(productData) {
        const newProduct = {
            id: Date.now(),
            ...productData,
            registeredDate: new Date().toISOString().split('T')[0]
        };
        this.products.value.push(newProduct);
        this._updateReports();
    }

    deleteProduct(productId) {
        this.products.value = this.products.value.filter(p => p.id !== productId);
        this._updateReports();
    }

    // Dashboard methods
    async initializeDashboard() {
        const dashboard = new AnalyticsDashboardEntity({
            title: 'Dashboard Principal',
            widgets: [
                {
                    id: 'metrics-overview',
                    type: 'metrics',
                    title: 'Resumen de Métricas',
                    data: this._getMetricsData(),
                    config: { refresh: 300 }
                }
            ]
        });

        this.dashboard.value = dashboard;
        await this.repository.saveDashboard(dashboard);
    }

    // Computed properties
    get reportMetrics() {
        return computed(() => {
            if (!this.currentReport.value) return null;
            return this.currentReport.value.metrics;
        });
    }

    get inventoryStatus() {
        return computed(() => {
            const expired = this.products.value.filter(p =>
                new Date(p.expiryDate) < new Date()
            ).length;

            const total = this.products.value.length;
            if (expired === 0) return 'A';
            if (expired <= total * 0.1) return 'B';
            if (expired <= total * 0.2) return 'C';
            return 'D';
        });
    }

    // Private methods
    _updateReports() {
        if (this.currentReport.value) {
            this.currentReport.value.calculateMetrics(this.products.value);
        }
    }

    _isExpiringSoon(expiryDate) {
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
        const expiry = new Date(expiryDate);
        return expiry <= threeDaysFromNow && expiry >= new Date();
    }

    _getMetricsData() {
        const totalProducts = this.products.value.reduce((sum, p) => sum + p.quantity, 0);
        const expired = this.products.value.filter(p => new Date(p.expiryDate) < new Date()).length;
        const expiringSoon = this.products.value.filter(p => this._isExpiringSoon(p.expiryDate)).length;
        const available = this.products.value.filter(p =>
            new Date(p.expiryDate) > new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        ).length;

        return {
            totalProducts: totalProducts.toFixed(1),
            expired,
            expiringSoon,
            available,
            availablePercent: Math.round((available / this.products.value.length) * 100),
            expiredPercent: ((expired / this.products.value.length) * 100).toFixed(1)
        };
    }
}