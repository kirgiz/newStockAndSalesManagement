import { Moment } from 'moment';
import { IThirdStockAndSalesUtility } from 'app/shared/model/third-stock-and-sales-utility.model';

export interface IAddressStockAndSalesUtility {
    id?: number;
    description?: string;
    line1?: string;
    line2?: string;
    line3?: string;
    line4?: string;
    zipCode?: string;
    state?: string;
    validFrom?: Moment;
    validTo?: Moment;
    comments?: string;
    addressClassifName?: string;
    addressClassifId?: number;
    countryAddressName?: string;
    countryAddressId?: number;
    thirdaddresses?: IThirdStockAndSalesUtility[];
}

export class AddressStockAndSalesUtility implements IAddressStockAndSalesUtility {
    constructor(
        public id?: number,
        public description?: string,
        public line1?: string,
        public line2?: string,
        public line3?: string,
        public line4?: string,
        public zipCode?: string,
        public state?: string,
        public validFrom?: Moment,
        public validTo?: Moment,
        public comments?: string,
        public addressClassifName?: string,
        public addressClassifId?: number,
        public countryAddressName?: string,
        public countryAddressId?: number,
        public thirdaddresses?: IThirdStockAndSalesUtility[]
    ) {}
}
