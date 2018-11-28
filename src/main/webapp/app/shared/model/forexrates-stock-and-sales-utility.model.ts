import { Moment } from 'moment';

export interface IForexratesStockAndSalesUtility {
    id?: number;
    rateDate?: Moment;
    straighRate?: number;
    rateForCurrencyIsoCode?: string;
    rateForCurrencyId?: number;
}

export class ForexratesStockAndSalesUtility implements IForexratesStockAndSalesUtility {
    constructor(
        public id?: number,
        public rateDate?: Moment,
        public straighRate?: number,
        public rateForCurrencyIsoCode?: string,
        public rateForCurrencyId?: number
    ) {}
}
