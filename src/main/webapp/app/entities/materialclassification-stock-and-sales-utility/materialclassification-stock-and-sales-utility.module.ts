import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from 'app/shared';
import {
    MaterialclassificationStockAndSalesUtilityComponent,
    MaterialclassificationStockAndSalesUtilityDetailComponent,
    MaterialclassificationStockAndSalesUtilityUpdateComponent,
    MaterialclassificationStockAndSalesUtilityDeletePopupComponent,
    MaterialclassificationStockAndSalesUtilityDeleteDialogComponent,
    materialclassificationRoute,
    materialclassificationPopupRoute
} from './';

const ENTITY_STATES = [...materialclassificationRoute, ...materialclassificationPopupRoute];

@NgModule({
    imports: [StockAndSalesManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MaterialclassificationStockAndSalesUtilityComponent,
        MaterialclassificationStockAndSalesUtilityDetailComponent,
        MaterialclassificationStockAndSalesUtilityUpdateComponent,
        MaterialclassificationStockAndSalesUtilityDeleteDialogComponent,
        MaterialclassificationStockAndSalesUtilityDeletePopupComponent
    ],
    entryComponents: [
        MaterialclassificationStockAndSalesUtilityComponent,
        MaterialclassificationStockAndSalesUtilityUpdateComponent,
        MaterialclassificationStockAndSalesUtilityDeleteDialogComponent,
        MaterialclassificationStockAndSalesUtilityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementMaterialclassificationStockAndSalesUtilityModule {}
