import { Moment } from 'moment';

export interface IDashboardStockAndSalesUtility {
    id?: number;
    transferDate?: Moment;
    profitAndLoss?: number;
    numberOfItems?: number;
    currencyForDashboardName?: string;
    currencyForDashboardId?: number;
    transferForDashboardName?: string;
    transferForDashboardId?: number;
    warehouseOutgName?: string;
    warehouseOutgId?: number;
    materialTypeDefDashboardCode?: string;
    materialTypeDefDashboardId?: number;
}

export class DashboardStockAndSalesUtility implements IDashboardStockAndSalesUtility {
    constructor(
        public id?: number,
        public transferDate?: Moment,
        public profitAndLoss?: number,
        public numberOfItems?: number,
        public currencyForDashboardName?: string,
        public currencyForDashboardId?: number,
        public transferForDashboardName?: string,
        public transferForDashboardId?: number,
        public warehouseOutgName?: string,
        public warehouseOutgId?: number,
        public materialTypeDefDashboardCode?: string,
        public materialTypeDefDashboardId?: number
    ) {}
}
