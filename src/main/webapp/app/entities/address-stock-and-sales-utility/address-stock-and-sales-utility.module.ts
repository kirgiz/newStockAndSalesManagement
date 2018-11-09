import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from 'app/shared';
import {
    AddressStockAndSalesUtilityComponent,
    AddressStockAndSalesUtilityDetailComponent,
    AddressStockAndSalesUtilityUpdateComponent,
    AddressStockAndSalesUtilityDeletePopupComponent,
    AddressStockAndSalesUtilityDeleteDialogComponent,
    addressRoute,
    addressPopupRoute
} from './';

const ENTITY_STATES = [...addressRoute, ...addressPopupRoute];

@NgModule({
    imports: [StockAndSalesManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AddressStockAndSalesUtilityComponent,
        AddressStockAndSalesUtilityDetailComponent,
        AddressStockAndSalesUtilityUpdateComponent,
        AddressStockAndSalesUtilityDeleteDialogComponent,
        AddressStockAndSalesUtilityDeletePopupComponent
    ],
    entryComponents: [
        AddressStockAndSalesUtilityComponent,
        AddressStockAndSalesUtilityUpdateComponent,
        AddressStockAndSalesUtilityDeleteDialogComponent,
        AddressStockAndSalesUtilityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementAddressStockAndSalesUtilityModule {}
