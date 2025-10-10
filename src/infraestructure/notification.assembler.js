import { Notification } from "../../../notificaciones/src/Domain/Model/notification.entity.js";

export const NotificationAssembler = {
    toEntity(dto) {
        return new Notification({
            id: dto.id,
            message: dto.message,
            type: dto.type,
            read: dto.read,
            createdAt: dto.createdAt || new Date(),
        });
    },
};