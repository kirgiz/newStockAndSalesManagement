export interface ICompanyStockAndSalesUtility {
    id?: number;
    code?: string;
    name?: string;
    comments?: string;
    baseCurrencyIsoCode?: string;
    baseCurrencyId?: number;
}

export class CompanyStockAndSalesUtility implements ICompanyStockAndSalesUtility {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public comments?: string,
        public baseCurrencyIsoCode?: string,
        public baseCurrencyId?: number
    ) {}
}
