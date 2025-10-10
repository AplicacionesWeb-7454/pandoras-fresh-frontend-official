export const AlertAPI = {
    async fetchAlerts() {
        return [
            { id: 1, title: "Temperatura fuera de rango", description: "Frigorífico 3 excedió 10°C", status: "active" },
        ];
    },
};