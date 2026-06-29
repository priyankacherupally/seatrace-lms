import { DashboardSummaryDto } from './dto/dashboard-summary.dto';
export declare class DashboardService {
    getSummary(): DashboardSummaryDto;
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
