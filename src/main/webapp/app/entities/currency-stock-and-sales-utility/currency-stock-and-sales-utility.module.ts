import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from 'app/shared';
import {
    CurrencyStockAndSalesUtilityComponent,
    CurrencyStockAndSalesUtilityDetailComponent,
    CurrencyStockAndSalesUtilityUpdateComponent,
    CurrencyStockAndSalesUtilityDeletePopupComponent,
    CurrencyStockAndSalesUtilityDeleteDialogComponent,
    currencyRoute,
    currencyPopupRoute
} from './';

const ENTITY_STATES = [...currencyRoute, ...currencyPopupRoute];

@NgModule({
    imports: [StockAndSalesManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CurrencyStockAndSalesUtilityComponent,
        CurrencyStockAndSalesUtilityDetailComponent,
        CurrencyStockAndSalesUtilityUpdateComponent,
        CurrencyStockAndSalesUtilityDeleteDialogComponent,
        CurrencyStockAndSalesUtilityDeletePopupComponent
    ],
    entryComponents: [
        CurrencyStockAndSalesUtilityComponent,
        CurrencyStockAndSalesUtilityUpdateComponent,
        CurrencyStockAndSalesUtilityDeleteDialogComponent,
        CurrencyStockAndSalesUtilityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementCurrencyStockAndSalesUtilityModule {}
