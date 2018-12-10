import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from 'app/shared';
import {
    LotStockAndSalesUtilityComponent,
    LotStockAndSalesUtilityDetailComponent,
    LotStockAndSalesUtilityUpdateComponent,
    LotStockAndSalesUtilityDeletePopupComponent,
    LotStockAndSalesUtilityDeleteDialogComponent,
    lotRoute,
    lotPopupRoute
} from './';
import {
    LotStockAndSalesUtilityDialogComponent,
    LotStockAndSalesUtilityPopupComponent
} from './lot-stock-and-sales-utility-dialog.component';

const ENTITY_STATES = [...lotRoute, ...lotPopupRoute];

@NgModule({
    imports: [StockAndSalesManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LotStockAndSalesUtilityComponent,
        LotStockAndSalesUtilityDetailComponent,
        LotStockAndSalesUtilityUpdateComponent,
        LotStockAndSalesUtilityDeleteDialogComponent,
        LotStockAndSalesUtilityDeletePopupComponent,
        LotStockAndSalesUtilityDialogComponent,
        LotStockAndSalesUtilityPopupComponent
    ],
    entryComponents: [
        LotStockAndSalesUtilityComponent,
        LotStockAndSalesUtilityUpdateComponent,
        LotStockAndSalesUtilityDeleteDialogComponent,
        LotStockAndSalesUtilityDeletePopupComponent,
        LotStockAndSalesUtilityDialogComponent,
        LotStockAndSalesUtilityPopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementLotStockAndSalesUtilityModule {}
