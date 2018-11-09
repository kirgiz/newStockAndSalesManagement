import { IAddressStockAndSalesUtility } from 'app/shared/model/address-stock-and-sales-utility.model';

export interface ICountryStockAndSalesUtility {
    id?: number;
    isoCode?: string;
    name?: string;
    addressCountries?: IAddressStockAndSalesUtility[];
}

export class CountryStockAndSalesUtility implements ICountryStockAndSalesUtility {
    constructor(
        public id?: number,
        public isoCode?: string,
        public name?: string,
        public addressCountries?: IAddressStockAndSalesUtility[]
    ) {}
}
