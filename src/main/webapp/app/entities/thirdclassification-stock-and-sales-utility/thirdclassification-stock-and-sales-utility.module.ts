import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from 'app/shared';
import {
    ThirdclassificationStockAndSalesUtilityComponent,
    ThirdclassificationStockAndSalesUtilityDetailComponent,
    ThirdclassificationStockAndSalesUtilityUpdateComponent,
    ThirdclassificationStockAndSalesUtilityDeletePopupComponent,
    ThirdclassificationStockAndSalesUtilityDeleteDialogComponent,
    thirdclassificationRoute,
    thirdclassificationPopupRoute
} from './';

const ENTITY_STATES = [...thirdclassificationRoute, ...thirdclassificationPopupRoute];

@NgModule({
    imports: [StockAndSalesManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ThirdclassificationStockAndSalesUtilityComponent,
        ThirdclassificationStockAndSalesUtilityDetailComponent,
        ThirdclassificationStockAndSalesUtilityUpdateComponent,
        ThirdclassificationStockAndSalesUtilityDeleteDialogComponent,
        ThirdclassificationStockAndSalesUtilityDeletePopupComponent
    ],
    entryComponents: [
        ThirdclassificationStockAndSalesUtilityComponent,
        ThirdclassificationStockAndSalesUtilityUpdateComponent,
        ThirdclassificationStockAndSalesUtilityDeleteDialogComponent,
        ThirdclassificationStockAndSalesUtilityDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementThirdclassificationStockAndSalesUtilityModule {}
