import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from 'app/shared';
import {
    MaterialStockAndSalesUtilityComponent,
    MaterialStockAndSalesUtilityDetailComponent,
    MaterialStockAndSalesUtilityUpdateComponent,
    MaterialStockAndSalesUtilityDeletePopupComponent,
    MaterialStockAndSalesUtilityDeleteDialogComponent,
    materialRoute,
    materialPopupRoute
} from './';
import {
    MaterialStockAndSalesUtilityPopupComponent,
    MaterialStockAndSalesUtilityDialogComponent
} from './material-stock-and-sales-utility-dialog.component';

const ENTITY_STATES = [...materialRoute, ...materialPopupRoute];

@NgModule({
    imports: [StockAndSalesManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MaterialStockAndSalesUtilityComponent,
        MaterialStockAndSalesUtilityDetailComponent,
        MaterialStockAndSalesUtilityUpdateComponent,
        MaterialStockAndSalesUtilityDeleteDialogComponent,
        MaterialStockAndSalesUtilityDeletePopupComponent,
        MaterialStockAndSalesUtilityPopupComponent,
        MaterialStockAndSalesUtilityDialogComponent
    ],
    entryComponents: [
        MaterialStockAndSalesUtilityComponent,
        MaterialStockAndSalesUtilityUpdateComponent,
        MaterialStockAndSalesUtilityDeleteDialogComponent,
        MaterialStockAndSalesUtilityDeletePopupComponent,
        MaterialStockAndSalesUtilityPopupComponent,
        MaterialStockAndSalesUtilityDialogComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementMaterialStockAndSalesUtilityModule {}
