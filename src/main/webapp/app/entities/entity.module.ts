import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { StockAndSalesManagementCompanyStockAndSalesUtilityModule } from './company-stock-and-sales-utility/company-stock-and-sales-utility.module';
import { StockAndSalesManagementCountryStockAndSalesUtilityModule } from './country-stock-and-sales-utility/country-stock-and-sales-utility.module';
import { StockAndSalesManagementCurrencyStockAndSalesUtilityModule } from './currency-stock-and-sales-utility/currency-stock-and-sales-utility.module';
import { StockAndSalesManagementForexratesStockAndSalesUtilityModule } from './forexrates-stock-and-sales-utility/forexrates-stock-and-sales-utility.module';
// prettier-ignore
import {
    StockAndSalesManagementThirdclassificationStockAndSalesUtilityModule
} from './thirdclassification-stock-and-sales-utility/thirdclassification-stock-and-sales-utility.module';
import { StockAndSalesManagementThirdStockAndSalesUtilityModule } from './third-stock-and-sales-utility/third-stock-and-sales-utility.module';
// prettier-ignore
import {
    StockAndSalesManagementAddressclassificationStockAndSalesUtilityModule
} from './addressclassification-stock-and-sales-utility/addressclassification-stock-and-sales-utility.module';
import { StockAndSalesManagementAddressStockAndSalesUtilityModule } from './address-stock-and-sales-utility/address-stock-and-sales-utility.module';
import { StockAndSalesManagementCivilityStockAndSalesUtilityModule } from './civility-stock-and-sales-utility/civility-stock-and-sales-utility.module';
// prettier-ignore
import {
    StockAndSalesManagementTransferclassificationStockAndSalesUtilityModule
} from './transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility.module';
// prettier-ignore
import {
    StockAndSalesManagementMaterialclassificationStockAndSalesUtilityModule
} from './materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility.module';
import { StockAndSalesManagementLotStockAndSalesUtilityModule } from './lot-stock-and-sales-utility/lot-stock-and-sales-utility.module';
import { StockAndSalesManagementMaterialStockAndSalesUtilityModule } from './material-stock-and-sales-utility/material-stock-and-sales-utility.module';
import { StockAndSalesManagementMaterialhistoryStockAndSalesUtilityModule } from './materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility.module';
import { StockAndSalesManagementDashboardStockAndSalesUtilityModule } from './dashboard-stock-and-sales-utility/dashboard-stock-and-sales-utility.module';
import { StockAndSalesManagementUserAuthorizedThirdModule } from './user-authorized-third/user-authorized-third.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        StockAndSalesManagementCompanyStockAndSalesUtilityModule,
        StockAndSalesManagementCountryStockAndSalesUtilityModule,
        StockAndSalesManagementCurrencyStockAndSalesUtilityModule,
        StockAndSalesManagementForexratesStockAndSalesUtilityModule,
        StockAndSalesManagementThirdclassificationStockAndSalesUtilityModule,
        StockAndSalesManagementThirdStockAndSalesUtilityModule,
        StockAndSalesManagementAddressclassificationStockAndSalesUtilityModule,
        StockAndSalesManagementAddressStockAndSalesUtilityModule,
        StockAndSalesManagementCivilityStockAndSalesUtilityModule,
        StockAndSalesManagementTransferclassificationStockAndSalesUtilityModule,
        StockAndSalesManagementMaterialclassificationStockAndSalesUtilityModule,
        StockAndSalesManagementLotStockAndSalesUtilityModule,
        StockAndSalesManagementMaterialStockAndSalesUtilityModule,
        StockAndSalesManagementMaterialhistoryStockAndSalesUtilityModule,
        StockAndSalesManagementDashboardStockAndSalesUtilityModule,
        StockAndSalesManagementUserAuthorizedThirdModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementEntityModule {}
