import { ReportingRepositoryInterface } from '../domain/repository/reporting-repository.interface.js';

export class ReportingApi extends ReportingRepositoryInterface {
    constructor() {
        super();
        this.reports = new Map();
        this.dashboards = new Map();
    }

    async saveReport(report) {
        const reportData = report.toJSON ? report.toJSON() : report;
        this.reports.set(reportData.id || Date.now().toString(), reportData);
        return reportData;
    }

    async findReportById(id) {
        return this.reports.get(id);
    }

    async findAllReports() {
        return Array.from(this.reports.values());
    }

    async deleteReport(id) {
        this.reports.delete(id);
    }

    async saveDashboard(dashboard) {
        const dashboardData = dashboard.toJSON ? dashboard.toJSON() : dashboard;
        this.dashboards.set(dashboardData.id || 'default', dashboardData);
        return dashboardData;
    }

    async findDashboardById(id) {
        return this.dashboards.get(id);
    }

    async getDashboardData() {
        return Array.from(this.dashboards.values());
    }
}