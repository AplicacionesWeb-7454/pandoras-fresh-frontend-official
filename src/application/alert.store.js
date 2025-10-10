import { ref } from "vue";
import { Alert } from "../../../notificaciones/src/Domain/Model/alert.entity.js";

export const useAlertStore = () => {
    const alerts = ref([
        new Alert({
            id: 1,
            title: "Frigorífico 1 – Productos vencidos",
            description: "Detectados 3 productos próximos a vencer.",
            status: "active",
            createdAt: new Date(),
        }),
        new Alert({
            id: 2,
            title: "Frigorífico 2 – Retiro incompleto",
            description: "Faltan evidencias fotográficas del retiro.",
            status: "pending",
            createdAt: new Date(),
        }),
    ]);

    const markAsResolved = (id) => {
        const alert = alerts.value.find(a => a.id === id);
        if (alert) alert.status = "resolved";
    };

    return { alerts, markAsResolved };
};