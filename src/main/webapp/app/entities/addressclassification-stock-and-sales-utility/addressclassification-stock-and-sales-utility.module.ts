import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from 'app/shared';
import {
    AddressclassificationStockAndSalesUtilityComponent,
    AddressclassificationStockAndSalesUtilityDetailComponent,
    AddressclassificationStockAndSalesUtilityUpdateComponent,
    AddressclassificationStockAndSalesUtilityDeletePopupComponent,
    AddressclassificationStockAndSalesUtilityDeleteDialogComponent,
    addressclassificationRoute,
    addressclassificationPopupRoute
} from './';

const ENTITY_STATES = [...addressclassificationRoute, ...addressclassificationPopupRoute];

@NgModule({
    imports: [StockAndSalesManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AddressclassificationStockAndSalesUtilityComponent,
        AddressclassificationStockAndSalesUtilityDetailComponent,
        AddressclassificationStockAndSalesUtilityUpdateComponent,
        AddressclassificationStockAndSalesUtilityDeleteDialogComponent,
        AddressclassificationStockAndSalesUtilityDeletePopupComponent
    ],
    entryComponents: [
        AddressclassificationStockAndSalesUtilityComponent,
        AddressclassificationStockAndSalesUtilityUpdateComponent,
        AddressclassificationStockAndSalesUtilityDeleteDialogComponent,
        AddressclassificationStockAndSalesUtilityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementAddressclassificationStockAndSalesUtilityModule {}
