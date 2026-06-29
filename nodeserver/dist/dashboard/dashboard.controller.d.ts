import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getSummary(): import("./dto/dashboard-summary.dto").DashboardSummaryDto;
    getStats(): {
        key: string;
        label: string;
        value: number;
        suffix: string;
        accent: string;
    }[];
    getActivity(): {
        id: number;
        type: string;
        message: string;
    }[];
    getQuickLinks(): {
        key: string;
        label: string;
        primary: boolean;
    }[];
}
