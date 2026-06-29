"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
let DashboardService = class DashboardService {
    getSummary() {
        return {
            title: 'Welcome',
            name: 'Priyanka',
        };
    }
    getStats() {
        return [
            {
                key: 'active',
                label: 'Active Sessions',
                value: 1284,
                suffix: 'live',
                accent: 'primary',
            },
            {
                key: 'velocity',
                label: 'Throughput',
                value: 97.4,
                suffix: '%',
                accent: 'success',
            },
            {
                key: 'growth',
                label: 'Weekly Growth',
                value: 12.6,
                suffix: '%',
                accent: 'warning',
            },
            {
                key: 'health',
                label: 'System Health',
                value: 99.98,
                suffix: '%',
                accent: 'info',
            },
        ];
    }
    getActivity() {
        return [
            {
                id: 1,
                type: 'success',
                message: 'New deployment shipped to production',
            },
            {
                id: 2,
                type: 'warn',
                message: 'Heavy load detected on api-gateway',
            },
            {
                id: 3,
                type: 'info',
                message: '12 new users joined this hour',
            },
            {
                id: 4,
                type: 'success',
                message: 'Nightly backups completed',
            },
        ];
    }
    getQuickLinks() {
        return [
            { key: 'reports', label: 'Open Reports', primary: true },
            { key: 'users', label: 'Manage Users', primary: false },
            { key: 'settings', label: 'Settings', primary: false },
        ];
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)()
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map