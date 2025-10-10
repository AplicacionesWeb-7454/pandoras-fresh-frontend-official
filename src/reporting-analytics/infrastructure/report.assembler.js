import { ReportEntity } from '../domain/model/report.entity.js';

export class ReportAssembler {
    static toDTO(reportEntity) {
        if (!(reportEntity instanceof ReportEntity)) {
            throw new Error('ReportAssembler.toDTO requires a ReportEntity instance');
        }

        const data = reportEntity.toJSON();

        return {
            ...data,
            generatedAt: data.generatedAt.toISOString(),
            // Transformaciones adicionales para la UI
            displayName: this._getDisplayName(data.name),
            statusColor: this._getStatusColor(data.status)
        };
    }

    static toEntity(reportData) {
        const entityData = {
            ...reportData,
            generatedAt: new Date(reportData.generatedAt)
        };

        return new ReportEntity(entityData);
    }

    static _getDisplayName(name) {
        const names = {
            'inventory': 'Inventario General',
            'waste': 'Desperdicios',
            'quality': 'Control de Calidad'
        };
        return names[name] || name;
    }

    static _getStatusColor(status) {
        const colors = {
            'active': '#4CAF50',
            'pending': '#FF9800',
            'completed': '#2196F3'
        };
        return colors[status] || '#666';
    }
}