import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from 'app/shared';
import {
    CountryStockAndSalesUtilityComponent,
    CountryStockAndSalesUtilityDetailComponent,
    CountryStockAndSalesUtilityUpdateComponent,
    CountryStockAndSalesUtilityDeletePopupComponent,
    CountryStockAndSalesUtilityDeleteDialogComponent,
    countryRoute,
    countryPopupRoute
} from './';

const ENTITY_STATES = [...countryRoute, ...countryPopupRoute];

@NgModule({
    imports: [StockAndSalesManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CountryStockAndSalesUtilityComponent,
        CountryStockAndSalesUtilityDetailComponent,
        CountryStockAndSalesUtilityUpdateComponent,
        CountryStockAndSalesUtilityDeleteDialogComponent,
        CountryStockAndSalesUtilityDeletePopupComponent
    ],
    entryComponents: [
        CountryStockAndSalesUtilityComponent,
        CountryStockAndSalesUtilityUpdateComponent,
        CountryStockAndSalesUtilityDeleteDialogComponent,
        CountryStockAndSalesUtilityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementCountryStockAndSalesUtilityModule {}
