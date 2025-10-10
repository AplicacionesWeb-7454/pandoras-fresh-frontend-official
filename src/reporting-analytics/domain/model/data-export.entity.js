export class DataExportEntity {

    constructor({
                    id = null,
                    reportId = null,
                    format = 'csv',
                    filters = {},
                    status = 'pending',
                    fileUrl = null,
                    fileSize = null,
                    generatedBy = '',
                    createdAt = new Date(),
                    completedAt = null,
                    errorMessage = null
                } = {}) {
        this._id = id;
        this._reportId = reportId;
        this._format = format;
        this._filters = filters;
        this._status = status;
        this._fileUrl = fileUrl;
        this._fileSize = fileSize;
        this._generatedBy = generatedBy;
        this._createdAt = createdAt;
        this._completedAt = completedAt;
        this._errorMessage = errorMessage;
    }

    // Getters
    get id() { return this._id; }
    get reportId() { return this._reportId; }
    get format() { return this._format; }
    get filters() { return this._filters; }
    get status() { return this._status; }
    get fileUrl() { return this._fileUrl; }
    get fileSize() { return this._fileSize; }
    get generatedBy() { return this._generatedBy; }
    get createdAt() { return this._createdAt; }
    get completedAt() { return this._completedAt; }
    get errorMessage() { return this._errorMessage; }
    // Business logic methods
    markAsProcessing() {
        this._status = 'processing';
        this._updatedAt = new Date();
    }

    markAsCompleted(fileUrl, fileSize) {
        this._status = 'completed';
        this._fileUrl = fileUrl;
        this._fileSize = fileSize;
        this._completedAt = new Date();
    }

    markAsFailed(errorMessage) {
        this._status = 'failed';
        this._errorMessage = errorMessage;
        this._completedAt = new Date();
    }

    canDownload() {
        return this._status === 'completed' && this._fileUrl;
    }

    isExpired() {
        if (!this._completedAt) return false;
        const expirationTime = 24 * 60 * 60 * 1000; // 24 hours
        return (Date.now() - this._completedAt.getTime()) > expirationTime;
    }

    toJSON() {
        return {
            id: this._id,
            reportId: this._reportId,
            format: this._format,
            filters: this._filters,
            status: this._status,
            fileUrl: this._fileUrl,
            fileSize: this._fileSize,
            generatedBy: this._generatedBy,
            createdAt: this._createdAt,
            completedAt: this._completedAt,
            errorMessage: this._errorMessage
        };
    }
}