import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from 'app/shared';
import {
    DashboardStockAndSalesUtilityComponent,
    DashboardStockAndSalesUtilityDetailComponent,
    DashboardStockAndSalesUtilityUpdateComponent,
    DashboardStockAndSalesUtilityDeletePopupComponent,
    DashboardStockAndSalesUtilityDeleteDialogComponent,
    dashboardRoute,
    dashboardPopupRoute
} from './';

const ENTITY_STATES = [...dashboardRoute, ...dashboardPopupRoute];

@NgModule({
    imports: [StockAndSalesManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DashboardStockAndSalesUtilityComponent,
        DashboardStockAndSalesUtilityDetailComponent,
        DashboardStockAndSalesUtilityUpdateComponent,
        DashboardStockAndSalesUtilityDeleteDialogComponent,
        DashboardStockAndSalesUtilityDeletePopupComponent
    ],
    entryComponents: [
        DashboardStockAndSalesUtilityComponent,
        DashboardStockAndSalesUtilityUpdateComponent,
        DashboardStockAndSalesUtilityDeleteDialogComponent,
        DashboardStockAndSalesUtilityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementDashboardStockAndSalesUtilityModule {}
