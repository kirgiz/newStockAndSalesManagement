import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from 'app/shared';
import {
    CivilityStockAndSalesUtilityComponent,
    CivilityStockAndSalesUtilityDetailComponent,
    CivilityStockAndSalesUtilityUpdateComponent,
    CivilityStockAndSalesUtilityDeletePopupComponent,
    CivilityStockAndSalesUtilityDeleteDialogComponent,
    civilityRoute,
    civilityPopupRoute
} from './';

const ENTITY_STATES = [...civilityRoute, ...civilityPopupRoute];

@NgModule({
    imports: [StockAndSalesManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CivilityStockAndSalesUtilityComponent,
        CivilityStockAndSalesUtilityDetailComponent,
        CivilityStockAndSalesUtilityUpdateComponent,
        CivilityStockAndSalesUtilityDeleteDialogComponent,
        CivilityStockAndSalesUtilityDeletePopupComponent
    ],
    entryComponents: [
        CivilityStockAndSalesUtilityComponent,
        CivilityStockAndSalesUtilityUpdateComponent,
        CivilityStockAndSalesUtilityDeleteDialogComponent,
        CivilityStockAndSalesUtilityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementCivilityStockAndSalesUtilityModule {}
