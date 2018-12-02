import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from 'app/shared';
import {
    MaterialhistoryStockAndSalesUtilityDetailComponent,
    MaterialhistoryStockAndSalesUtilityUpdateComponent,
    MaterialhistoryStockAndSalesUtilityDeletePopupComponent,
    MaterialhistoryStockAndSalesUtilityDeleteDialogComponent,
    MaterialhistoryStockAndSalesUtilityDialogComponent,
    materialhistoryRoute,
    MaterialhistoryStockAndSalesUtilityResolvePagingParams,
    materialSearchRoute,
    MaterialSearchStockAndSalesUtilityResolvePagingParams,
    materialSearchPopupRoute,
    MaterialSearchStockAndSalesUtilityPopupService,
    MaterialSearchStockAndSalesUtilityDialogComponent,
    MaterialSearchStockAndSalesUtilityPopupComponent,
    MaterialhistoryStockAndSalesUtilityService,
    MaterialhistoryStockAndSalesUtilityComponent
} from './';
import { MaterialSearchStockAndSalesUtilityComponent } from './material-search-stock-and-sales-utility.component';
import { MaterialhistoryStockAndSalesUtilityPopupComponent } from '../materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility-dialog.component';
import { materialhistoryPopupRoute } from '../materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility.route';
import { MaterialhistoryStockAndSalesUtilityPopupService } from '../materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility-popup.service';

const ENTITY_STATES = [...materialhistoryRoute, ...materialhistoryPopupRoute, ...materialSearchRoute, ...materialSearchPopupRoute];

@NgModule({
    imports: [StockAndSalesManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MaterialhistoryStockAndSalesUtilityComponent,
        MaterialhistoryStockAndSalesUtilityDetailComponent,
        MaterialhistoryStockAndSalesUtilityDialogComponent,
        MaterialhistoryStockAndSalesUtilityUpdateComponent,
        MaterialhistoryStockAndSalesUtilityDeleteDialogComponent,
        MaterialhistoryStockAndSalesUtilityPopupComponent,
        MaterialSearchStockAndSalesUtilityComponent,
        MaterialSearchStockAndSalesUtilityDialogComponent,
        MaterialSearchStockAndSalesUtilityPopupComponent,
        MaterialhistoryStockAndSalesUtilityDeletePopupComponent
    ],
    entryComponents: [
        MaterialhistoryStockAndSalesUtilityComponent,
        MaterialhistoryStockAndSalesUtilityUpdateComponent,
        MaterialhistoryStockAndSalesUtilityDeleteDialogComponent,
        MaterialhistoryStockAndSalesUtilityDeletePopupComponent,
        MaterialSearchStockAndSalesUtilityComponent,
        MaterialSearchStockAndSalesUtilityDialogComponent,
        MaterialSearchStockAndSalesUtilityPopupComponent,
        MaterialhistoryStockAndSalesUtilityDialogComponent,
        MaterialhistoryStockAndSalesUtilityDeleteDialogComponent,
        MaterialhistoryStockAndSalesUtilityDeletePopupComponent
    ],
    providers: [
        MaterialhistoryStockAndSalesUtilityService,
        MaterialhistoryStockAndSalesUtilityPopupService,
        MaterialhistoryStockAndSalesUtilityResolvePagingParams,
        MaterialSearchStockAndSalesUtilityResolvePagingParams,
        MaterialSearchStockAndSalesUtilityPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementMaterialhistoryStockAndSalesUtilityModule {}
