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
    MaterialStockAndSalesUtilityDialogComponent,
    MaterialStockAndSalesUtilityPopupComponent
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
        MaterialStockAndSalesUtilityDialogComponent,
        MaterialStockAndSalesUtilityPopupComponent
    ],
    entryComponents: [
        MaterialStockAndSalesUtilityComponent,
        MaterialStockAndSalesUtilityUpdateComponent,
        MaterialStockAndSalesUtilityDeleteDialogComponent,
        MaterialStockAndSalesUtilityDeletePopupComponent,
        MaterialStockAndSalesUtilityDialogComponent,
        MaterialStockAndSalesUtilityPopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementMaterialStockAndSalesUtilityModule {}
