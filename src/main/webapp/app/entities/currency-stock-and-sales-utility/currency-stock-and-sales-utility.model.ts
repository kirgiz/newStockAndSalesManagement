import { BaseEntity } from './../../shared';

export class CurrencyStockAndSalesUtility implements BaseEntity {
    constructor(
        public id?: number,
        public isoCode?: string,
        public name?: string,
        public companyBaseCurrencies?: BaseEntity[],
        public currencyRates?: BaseEntity[],
        public currencyDashboards?: BaseEntity[],
        public lotBuyCurrencies?: BaseEntity[],
    ) {
    }
}
