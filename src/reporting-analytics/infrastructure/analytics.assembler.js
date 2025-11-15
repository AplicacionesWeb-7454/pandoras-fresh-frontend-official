import { AnalyticsDashboardEntity } from '../domain/model/analytics-dashboard.entity.js';

export class AnalyticsAssembler {
    static toDTO(dashboardEntity) {
        if (!(dashboardEntity instanceof AnalyticsDashboardEntity)) {
            throw new Error('AnalyticsAssembler.toDTO requires an AnalyticsDashboardEntity instance');
        }

        const data = dashboardEntity.toJSON();

        return {
            ...data,
            // Add any DTO-specific transformations here
            createdAt: data.createdAt.toISOString(),
            updatedAt: data.updatedAt.toISOString(),
            // Computed properties for the UI
            widgetCount: data.widgets.length,
            isShared: data.sharedWith.length > 0 || data.isPublic,
            refreshIntervalLabel: this._getRefreshIntervalLabel(data.refreshInterval)
        };
    }

    static toEntity(dashboardData) {
        // Transform API data to entity format
        const entityData = {
            ...dashboardData,
            createdAt: new Date(dashboardData.createdAt),
            updatedAt: new Date(dashboardData.updatedAt)
        };

        return new AnalyticsDashboardEntity(entityData);
    }

    static toEntityList(dashboardsData) {
        return dashboardsData.map(data => this.toEntity(data));
    }

    static toDTOList(dashboardEntities) {
        return dashboardEntities.map(entity => this.toDTO(entity));
    }

    static _getRefreshIntervalLabel(intervalInSeconds) {
        const intervals = {
            60: '1 minute',
            300: '5 minutes',
            600: '10 minutes',
            1800: '30 minutes',
            3600: '1 hour'
        };

        return intervals[intervalInSeconds] || `${intervalInSeconds} seconds`;
    }
}