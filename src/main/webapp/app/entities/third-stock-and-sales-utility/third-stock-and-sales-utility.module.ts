import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from 'app/shared';
import {
    ThirdStockAndSalesUtilityComponent,
    ThirdStockAndSalesUtilityDetailComponent,
    ThirdStockAndSalesUtilityUpdateComponent,
    ThirdStockAndSalesUtilityDeletePopupComponent,
    ThirdStockAndSalesUtilityDeleteDialogComponent,
    thirdRoute,
    thirdPopupRoute
} from './';

const ENTITY_STATES = [...thirdRoute, ...thirdPopupRoute];

@NgModule({
    imports: [StockAndSalesManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ThirdStockAndSalesUtilityComponent,
        ThirdStockAndSalesUtilityDetailComponent,
        ThirdStockAndSalesUtilityUpdateComponent,
        ThirdStockAndSalesUtilityDeleteDialogComponent,
        ThirdStockAndSalesUtilityDeletePopupComponent
    ],
    entryComponents: [
        ThirdStockAndSalesUtilityComponent,
        ThirdStockAndSalesUtilityUpdateComponent,
        ThirdStockAndSalesUtilityDeleteDialogComponent,
        ThirdStockAndSalesUtilityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementThirdStockAndSalesUtilityModule {}
