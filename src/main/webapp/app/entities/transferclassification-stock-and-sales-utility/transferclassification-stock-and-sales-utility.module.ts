import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from 'app/shared';
import {
    TransferclassificationStockAndSalesUtilityComponent,
    TransferclassificationStockAndSalesUtilityDetailComponent,
    TransferclassificationStockAndSalesUtilityUpdateComponent,
    TransferclassificationStockAndSalesUtilityDeletePopupComponent,
    TransferclassificationStockAndSalesUtilityDeleteDialogComponent,
    transferclassificationRoute,
    transferclassificationPopupRoute
} from './';

const ENTITY_STATES = [...transferclassificationRoute, ...transferclassificationPopupRoute];

@NgModule({
    imports: [StockAndSalesManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransferclassificationStockAndSalesUtilityComponent,
        TransferclassificationStockAndSalesUtilityDetailComponent,
        TransferclassificationStockAndSalesUtilityUpdateComponent,
        TransferclassificationStockAndSalesUtilityDeleteDialogComponent,
        TransferclassificationStockAndSalesUtilityDeletePopupComponent
    ],
    entryComponents: [
        TransferclassificationStockAndSalesUtilityComponent,
        TransferclassificationStockAndSalesUtilityUpdateComponent,
        TransferclassificationStockAndSalesUtilityDeleteDialogComponent,
        TransferclassificationStockAndSalesUtilityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementTransferclassificationStockAndSalesUtilityModule {}
