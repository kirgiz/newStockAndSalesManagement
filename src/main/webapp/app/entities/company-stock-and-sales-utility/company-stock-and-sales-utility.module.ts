import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from '../../shared';
import {
    CompanyStockAndSalesUtilityService,
    CompanyStockAndSalesUtilityPopupService,
    CompanyStockAndSalesUtilityComponent,
    CompanyStockAndSalesUtilityDetailComponent,
    CompanyStockAndSalesUtilityDialogComponent,
    CompanyStockAndSalesUtilityPopupComponent,
    CompanyStockAndSalesUtilityDeletePopupComponent,
    CompanyStockAndSalesUtilityDeleteDialogComponent,
    companyRoute,
    companyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...companyRoute,
    ...companyPopupRoute,
];

@NgModule({
    imports: [
        StockAndSalesManagementSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CompanyStockAndSalesUtilityComponent,
        CompanyStockAndSalesUtilityDetailComponent,
        CompanyStockAndSalesUtilityDialogComponent,
        CompanyStockAndSalesUtilityDeleteDialogComponent,
        CompanyStockAndSalesUtilityPopupComponent,
        CompanyStockAndSalesUtilityDeletePopupComponent,
    ],
    entryComponents: [
        CompanyStockAndSalesUtilityComponent,
        CompanyStockAndSalesUtilityDialogComponent,
        CompanyStockAndSalesUtilityPopupComponent,
        CompanyStockAndSalesUtilityDeleteDialogComponent,
        CompanyStockAndSalesUtilityDeletePopupComponent,
    ],
    providers: [
        CompanyStockAndSalesUtilityService,
        CompanyStockAndSalesUtilityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementCompanyStockAndSalesUtilityModule {}
