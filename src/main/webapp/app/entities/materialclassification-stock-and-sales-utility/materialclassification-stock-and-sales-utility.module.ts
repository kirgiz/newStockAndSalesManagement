import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from '../../shared';
import {
    MaterialclassificationStockAndSalesUtilityService,
    MaterialclassificationStockAndSalesUtilityPopupService,
    MaterialclassificationStockAndSalesUtilityComponent,
    MaterialclassificationStockAndSalesUtilityDetailComponent,
    MaterialclassificationStockAndSalesUtilityDialogComponent,
    MaterialclassificationStockAndSalesUtilityPopupComponent,
    MaterialclassificationStockAndSalesUtilityDeletePopupComponent,
    MaterialclassificationStockAndSalesUtilityDeleteDialogComponent,
    materialclassificationRoute,
    materialclassificationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...materialclassificationRoute,
    ...materialclassificationPopupRoute,
];

@NgModule({
    imports: [
        StockAndSalesManagementSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MaterialclassificationStockAndSalesUtilityComponent,
        MaterialclassificationStockAndSalesUtilityDetailComponent,
        MaterialclassificationStockAndSalesUtilityDialogComponent,
        MaterialclassificationStockAndSalesUtilityDeleteDialogComponent,
        MaterialclassificationStockAndSalesUtilityPopupComponent,
        MaterialclassificationStockAndSalesUtilityDeletePopupComponent,
    ],
    entryComponents: [
        MaterialclassificationStockAndSalesUtilityComponent,
        MaterialclassificationStockAndSalesUtilityDialogComponent,
        MaterialclassificationStockAndSalesUtilityPopupComponent,
        MaterialclassificationStockAndSalesUtilityDeleteDialogComponent,
        MaterialclassificationStockAndSalesUtilityDeletePopupComponent,
    ],
    providers: [
        MaterialclassificationStockAndSalesUtilityService,
        MaterialclassificationStockAndSalesUtilityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementMaterialclassificationStockAndSalesUtilityModule {}
