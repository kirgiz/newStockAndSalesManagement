import { Moment } from 'moment';
import { IMaterialStockAndSalesUtility } from 'app/shared/model/material-stock-and-sales-utility.model';

export interface ILotStockAndSalesUtility {
    id?: number;
    code?: string;
    description?: string;
    creationDate?: Moment;
    numberOfItems?: number;
    comments?: string;
    unitBuyPrice?: number;
    itemsGenerated?: boolean;
    materialLots?: IMaterialStockAndSalesUtility[];
    buycurrencylotIsoCode?: string;
    buycurrencylotId?: number;
    materialclassificationName?: string;
    materialclassificationId?: number;
}

export class LotStockAndSalesUtility implements ILotStockAndSalesUtility {
    constructor(
        public id?: number,
        public code?: string,
        public description?: string,
        public creationDate?: Moment,
        public numberOfItems?: number,
        public comments?: string,
        public unitBuyPrice?: number,
        public itemsGenerated?: boolean,
        public materialLots?: IMaterialStockAndSalesUtility[],
        public buycurrencylotIsoCode?: string,
        public buycurrencylotId?: number,
        public materialclassificationName?: string,
        public materialclassificationId?: number
    ) {
        this.itemsGenerated = this.itemsGenerated || false;
    }
}
