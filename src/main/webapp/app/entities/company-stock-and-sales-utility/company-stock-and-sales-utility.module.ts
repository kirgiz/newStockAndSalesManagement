import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from 'app/shared';
import {
    CompanyStockAndSalesUtilityComponent,
    CompanyStockAndSalesUtilityDetailComponent,
    CompanyStockAndSalesUtilityUpdateComponent,
    CompanyStockAndSalesUtilityDeletePopupComponent,
    CompanyStockAndSalesUtilityDeleteDialogComponent,
    companyRoute,
    companyPopupRoute
} from './';

const ENTITY_STATES = [...companyRoute, ...companyPopupRoute];

@NgModule({
    imports: [StockAndSalesManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompanyStockAndSalesUtilityComponent,
        CompanyStockAndSalesUtilityDetailComponent,
        CompanyStockAndSalesUtilityUpdateComponent,
        CompanyStockAndSalesUtilityDeleteDialogComponent,
        CompanyStockAndSalesUtilityDeletePopupComponent
    ],
    entryComponents: [
        CompanyStockAndSalesUtilityComponent,
        CompanyStockAndSalesUtilityUpdateComponent,
        CompanyStockAndSalesUtilityDeleteDialogComponent,
        CompanyStockAndSalesUtilityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementCompanyStockAndSalesUtilityModule {}
