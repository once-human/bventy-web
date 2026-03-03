import { api } from "../api";
import { VendorProfile } from "./vendor";

export const adminService = {
    getVendors: async (status?: string): Promise<VendorProfile[]> => {
        const response = await api.get<VendorProfile[]>("/admin/vendors", {
            params: { status },
        });
        return response.data;
    },
    approveVendor: async (id: string): Promise<void> => {
        await api.patch(`/admin/vendors/${id}/approve`);
    },
    rejectVendor: async (id: string): Promise<void> => {
        await api.patch(`/admin/vendors/${id}/reject`);
    },
    getMetricsOverview: async (): Promise<any> => {
        const response = await api.get("/admin/metrics/overview");
        return response.data;
    },
    getMetricsGrowth: async (): Promise<any> => {
        const response = await api.get("/admin/metrics/growth");
        return response.data;
    },
    getMetricsMarketplace: async (): Promise<any> => {
        const response = await api.get("/admin/metrics/marketplace");
        return response.data;
    },
    getUsers: async (): Promise<any[]> => {
        const response = await api.get("/admin/users");
        return response.data;
    },
    updateUserRole: async (id: string, role: string): Promise<void> => {
        await api.patch(`/admin/users/${id}/role`, { role });
    },
    getEmailTemplates: async (): Promise<any[]> => {
        const response = await api.get("/admin/email/templates");
        return response.data;
    },
    updateEmailTemplate: async (key: string, data: any): Promise<void> => {
        await api.put(`/admin/email/templates/${key}`, data);
    },
    getPlatformSettings: async (): Promise<any> => {
        const response = await api.get("/admin/email/settings");
        return response.data;
    },
    updatePlatformSetting: async (key: string, value: string): Promise<void> => {
        await api.put("/admin/email/settings", { key, value });
    },
    deleteUser: async (id: string): Promise<void> => {
        await api.delete(`/admin/users/${id}`);
    },
    getEmailLogs: async (): Promise<any[]> => {
        const response = await api.get("/admin/email/logs");
        return response.data;
    },
};
