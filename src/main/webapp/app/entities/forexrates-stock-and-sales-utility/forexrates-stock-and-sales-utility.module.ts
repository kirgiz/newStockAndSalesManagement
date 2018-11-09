import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from 'app/shared';
import {
    ForexratesStockAndSalesUtilityComponent,
    ForexratesStockAndSalesUtilityDetailComponent,
    ForexratesStockAndSalesUtilityUpdateComponent,
    ForexratesStockAndSalesUtilityDeletePopupComponent,
    ForexratesStockAndSalesUtilityDeleteDialogComponent,
    forexratesRoute,
    forexratesPopupRoute
} from './';

const ENTITY_STATES = [...forexratesRoute, ...forexratesPopupRoute];

@NgModule({
    imports: [StockAndSalesManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ForexratesStockAndSalesUtilityComponent,
        ForexratesStockAndSalesUtilityDetailComponent,
        ForexratesStockAndSalesUtilityUpdateComponent,
        ForexratesStockAndSalesUtilityDeleteDialogComponent,
        ForexratesStockAndSalesUtilityDeletePopupComponent
    ],
    entryComponents: [
        ForexratesStockAndSalesUtilityComponent,
        ForexratesStockAndSalesUtilityUpdateComponent,
        ForexratesStockAndSalesUtilityDeleteDialogComponent,
        ForexratesStockAndSalesUtilityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementForexratesStockAndSalesUtilityModule {}
