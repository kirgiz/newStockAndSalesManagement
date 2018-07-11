import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NvD3Module } from 'ng2-nvd3';
import 'd3';
import 'nvd3';

import { StockAndSalesManagementSharedModule } from '../../shared';
import {
    DashboardStockAndSalesUtilityService,
    DashboardStockAndSalesUtilityPopupService,
    DashboardStockAndSalesUtilityComponent,
    DashboardStockAndSalesUtilityDetailComponent,
    DashboardStockAndSalesUtilityDialogComponent,
    DashboardStockAndSalesUtilityPopupComponent,
    DashboardStockAndSalesUtilityDeletePopupComponent,
    DashboardStockAndSalesUtilityDeleteDialogComponent,
    dashboardRoute,
    dashboardPopupRoute,
} from './';
import { MaterialStockAndSalesUtilityService } from '../material-stock-and-sales-utility';
import { LotStockAndSalesUtilityService } from '../lot-stock-and-sales-utility';
import { ForexratesStockAndSalesUtilityService } from '../forexrates-stock-and-sales-utility';
import { ThirdStockAndSalesUtilityService } from '../third-stock-and-sales-utility';
import { MaterialhistoryStockAndSalesUtilityService } from '../materialhistory-stock-and-sales-utility';

const ENTITY_STATES = [
    ...dashboardRoute,
    ...dashboardPopupRoute,
];

@NgModule({
    imports: [
        StockAndSalesManagementSharedModule,
        NvD3Module,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DashboardStockAndSalesUtilityComponent,
        DashboardStockAndSalesUtilityDetailComponent,
        DashboardStockAndSalesUtilityDialogComponent,
        DashboardStockAndSalesUtilityDeleteDialogComponent,
        DashboardStockAndSalesUtilityPopupComponent,
        DashboardStockAndSalesUtilityDeletePopupComponent,
    ],
    entryComponents: [
        DashboardStockAndSalesUtilityComponent,
        DashboardStockAndSalesUtilityDialogComponent,
        DashboardStockAndSalesUtilityPopupComponent,
        DashboardStockAndSalesUtilityDeleteDialogComponent,
        DashboardStockAndSalesUtilityDeletePopupComponent,
    ],
    providers: [
        DashboardStockAndSalesUtilityService,
        DashboardStockAndSalesUtilityPopupService,
        MaterialhistoryStockAndSalesUtilityService,
        ThirdStockAndSalesUtilityService,
        ForexratesStockAndSalesUtilityService,
        LotStockAndSalesUtilityService,
        MaterialStockAndSalesUtilityService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementDashboardStockAndSalesUtilityModule {}
