import { Alert } from "../../../notificaciones/src/Domain/Model/alert.entity.js";

export const AlertAssembler = {
    toEntity(dto) {
        return new Alert({
            id: dto.id,
            title: dto.title,
            description: dto.description,
            status: dto.status,
            createdAt: dto.createdAt || new Date(),
        });
    },
};