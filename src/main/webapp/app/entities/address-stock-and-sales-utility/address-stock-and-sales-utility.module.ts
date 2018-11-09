import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from '../../shared';
import {
    AddressStockAndSalesUtilityService,
    AddressStockAndSalesUtilityPopupService,
    AddressStockAndSalesUtilityComponent,
    AddressStockAndSalesUtilityDetailComponent,
    AddressStockAndSalesUtilityDialogComponent,
    AddressStockAndSalesUtilityPopupComponent,
    AddressStockAndSalesUtilityDeletePopupComponent,
    AddressStockAndSalesUtilityDeleteDialogComponent,
    addressRoute,
    addressPopupRoute,
} from './';

const ENTITY_STATES = [
    ...addressRoute,
    ...addressPopupRoute,
];

@NgModule({
    imports: [
        StockAndSalesManagementSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AddressStockAndSalesUtilityComponent,
        AddressStockAndSalesUtilityDetailComponent,
        AddressStockAndSalesUtilityDialogComponent,
        AddressStockAndSalesUtilityDeleteDialogComponent,
        AddressStockAndSalesUtilityPopupComponent,
        AddressStockAndSalesUtilityDeletePopupComponent,
    ],
    entryComponents: [
        AddressStockAndSalesUtilityComponent,
        AddressStockAndSalesUtilityDialogComponent,
        AddressStockAndSalesUtilityPopupComponent,
        AddressStockAndSalesUtilityDeleteDialogComponent,
        AddressStockAndSalesUtilityDeletePopupComponent,
    ],
    providers: [
        AddressStockAndSalesUtilityService,
        AddressStockAndSalesUtilityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementAddressStockAndSalesUtilityModule {}
