"use client";

import { useEffect, useState } from "react";
import { adminService } from "@bventy/services";
import { GrowthCharts, GrowthData } from "@bventy/ui";

export default function AdminOverviewPage() {
    const [growthData, setGrowthData] = useState<GrowthData | undefined>();
    const [loadingGrowth, setLoadingGrowth] = useState(true);

    useEffect(() => {
        const fetchAll = () => {
            adminService.getMetricsGrowth()
                .then(setGrowthData)
                .catch(console.error)
                .finally(() => setLoadingGrowth(false));
        };

        fetchAll();
    }, []);

    return (
        <div className="flex flex-col gap-8 pb-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Analytics Control Center</h1>
                <p className="text-muted-foreground mt-2">
                    Monitor platform performance and user growth.
                </p>
            </div>

            <div className="mt-0">
                <GrowthCharts data={growthData} loading={loadingGrowth} />
            </div>
        </div>
    );
}
