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
    MaterialSearchStockAndSalesUtilityResolvePagingParams,
    materialSearchPopupRoute,
    MaterialSearchStockAndSalesUtilityPopupService,
    MaterialSearchStockAndSalesUtilityDialogComponent,
    MaterialSearchStockAndSalesUtilityPopupComponent
} from './';
import { MaterialSearchStockAndSalesUtilityComponent } from './material-search-stock-and-sales-utility.component';

const ENTITY_STATES = [
    ...materialhistoryRoute,
    ...materialhistoryPopupRoute,
    ...materialSearchRoute,
    ...materialSearchPopupRoute,
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
        MaterialSearchStockAndSalesUtilityDialogComponent,
        MaterialSearchStockAndSalesUtilityPopupComponent,
    ],
    entryComponents: [
        MaterialhistoryStockAndSalesUtilityComponent,
        MaterialhistoryStockAndSalesUtilityDialogComponent,
        MaterialhistoryStockAndSalesUtilityPopupComponent,
        MaterialhistoryStockAndSalesUtilityDeleteDialogComponent,
        MaterialhistoryStockAndSalesUtilityDeletePopupComponent,
        MaterialSearchStockAndSalesUtilityComponent,
        MaterialSearchStockAndSalesUtilityDialogComponent,
        MaterialSearchStockAndSalesUtilityPopupComponent,
    ],
    providers: [
        MaterialhistoryStockAndSalesUtilityService,
        MaterialhistoryStockAndSalesUtilityPopupService,
        MaterialhistoryStockAndSalesUtilityResolvePagingParams,
        MaterialSearchStockAndSalesUtilityResolvePagingParams,
        MaterialSearchStockAndSalesUtilityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementMaterialhistoryStockAndSalesUtilityModule {}
