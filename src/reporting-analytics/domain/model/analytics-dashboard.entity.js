export class AnalyticsDashboardEntity {
    constructor({
                    id = null,
                    title = '',
                    widgets = [],
                    layout = {},
                    dataSources = [],
                    refreshInterval = 300,
                    createdAt = new Date()
                } = {}) {
        this._id = id;
        this._title = title;
        this._widgets = widgets;
        this._layout = layout;
        this._dataSources = dataSources;
        this._refreshInterval = refreshInterval;
        this._createdAt = createdAt;
    }

    // Getters
    get id() { return this._id; }
    get title() { return this._title; }
    get widgets() { return this._widgets; }
    get layout() { return this._layout; }
    get dataSources() { return this._dataSources; }
    get refreshInterval() { return this._refreshInterval; }
    get createdAt() { return this._createdAt; }

    // Business methods
    addWidget(widgetConfig) {
        const widget = {
            id: `widget-${Date.now()}`,
            type: widgetConfig.type,
            title: widgetConfig.title,
            data: widgetConfig.data,
            config: widgetConfig.config,
            createdAt: new Date()
        };
        this._widgets.push(widget);
        return widget.id;
    }

    updateWidgetData(widgetId, newData) {
        const widget = this._widgets.find(w => w.id === widgetId);
        if (widget) {
            widget.data = newData;
            widget.updatedAt = new Date();
        }
    }

    getWidgetsByType(type) {
        return this._widgets.filter(widget => widget.type === type);
    }

    toJSON() {
        return {
            id: this._id,
            title: this._title,
            widgets: this._widgets,
            layout: this._layout,
            dataSources: this._dataSources,
            refreshInterval: this._refreshInterval,
            createdAt: this._createdAt
        };
    }
}