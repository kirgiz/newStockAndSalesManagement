import { IAddressStockAndSalesUtility } from 'app/shared/model/address-stock-and-sales-utility.model';

export interface IAddressclassificationStockAndSalesUtility {
    id?: number;
    code?: string;
    name?: string;
    comments?: string;
    addressCategories?: IAddressStockAndSalesUtility[];
}

export class AddressclassificationStockAndSalesUtility implements IAddressclassificationStockAndSalesUtility {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public comments?: string,
        public addressCategories?: IAddressStockAndSalesUtility[]
    ) {}
}
