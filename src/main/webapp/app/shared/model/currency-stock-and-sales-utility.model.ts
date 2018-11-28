import { ICompanyStockAndSalesUtility } from 'app/shared/model/company-stock-and-sales-utility.model';
import { IForexratesStockAndSalesUtility } from 'app/shared/model/forexrates-stock-and-sales-utility.model';
import { IDashboardStockAndSalesUtility } from 'app/shared/model/dashboard-stock-and-sales-utility.model';
import { ILotStockAndSalesUtility } from 'app/shared/model/lot-stock-and-sales-utility.model';

export interface ICurrencyStockAndSalesUtility {
    id?: number;
    isoCode?: string;
    name?: string;
    companyBaseCurrencies?: ICompanyStockAndSalesUtility[];
    currencyRates?: IForexratesStockAndSalesUtility[];
    currencyDashboards?: IDashboardStockAndSalesUtility[];
    lotBuyCurrencies?: ILotStockAndSalesUtility[];
}

export class CurrencyStockAndSalesUtility implements ICurrencyStockAndSalesUtility {
    constructor(
        public id?: number,
        public isoCode?: string,
        public name?: string,
        public companyBaseCurrencies?: ICompanyStockAndSalesUtility[],
        public currencyRates?: IForexratesStockAndSalesUtility[],
        public currencyDashboards?: IDashboardStockAndSalesUtility[],
        public lotBuyCurrencies?: ILotStockAndSalesUtility[]
    ) {}
}
