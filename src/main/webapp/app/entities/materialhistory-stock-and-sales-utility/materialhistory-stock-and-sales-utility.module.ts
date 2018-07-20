import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from '../../shared';
import {
    MaterialhistoryStockAndSalesUtilityService,
    MaterialhistoryStockAndSalesUtilityPopupService,
    MaterialhistoryStockAndSalesUtilityComponent,
    MaterialhistoryStockAndSalesUtilityDetailComponent,
    MaterialhistoryStockAndSalesUtilityDialogComponent,
    MaterialhistoryStockAndSalesUtilityPopupComponent,
    MaterialhistoryStockAndSalesUtilityDeletePopupComponent,
    MaterialhistoryStockAndSalesUtilityDeleteDialogComponent,
    materialhistoryRoute,
    materialhistoryPopupRoute,
    MaterialhistoryStockAndSalesUtilityResolvePagingParams,
    materialSearchRoute,
    MaterialSearchStockAndSalesUtilityResolvePagingParams
} from './';
import { MaterialSearchStockAndSalesUtilityComponent } from './material-search-stock-and-sales-utility.component';

const ENTITY_STATES = [
    ...materialhistoryRoute,
    ...materialhistoryPopupRoute,
    ...materialSearchRoute,
];

@NgModule({
    imports: [
        StockAndSalesManagementSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MaterialhistoryStockAndSalesUtilityComponent,
        MaterialhistoryStockAndSalesUtilityDetailComponent,
        MaterialhistoryStockAndSalesUtilityDialogComponent,
        MaterialhistoryStockAndSalesUtilityDeleteDialogComponent,
        MaterialhistoryStockAndSalesUtilityPopupComponent,
        MaterialhistoryStockAndSalesUtilityDeletePopupComponent,
        MaterialSearchStockAndSalesUtilityComponent,
    ],
    entryComponents: [
        MaterialhistoryStockAndSalesUtilityComponent,
        MaterialhistoryStockAndSalesUtilityDialogComponent,
        MaterialhistoryStockAndSalesUtilityPopupComponent,
        MaterialhistoryStockAndSalesUtilityDeleteDialogComponent,
        MaterialhistoryStockAndSalesUtilityDeletePopupComponent,
    ],
    providers: [
        MaterialhistoryStockAndSalesUtilityService,
        MaterialhistoryStockAndSalesUtilityPopupService,
        MaterialhistoryStockAndSalesUtilityResolvePagingParams,
        MaterialSearchStockAndSalesUtilityResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementMaterialhistoryStockAndSalesUtilityModule {}
