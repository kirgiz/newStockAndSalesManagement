import { Moment } from 'moment';
import { IMaterialStockAndSalesUtility } from 'app/shared/model/material-stock-and-sales-utility.model';

export interface IMaterialhistoryStockAndSalesUtility {
    id?: number;
    code?: string;
    creationDate?: Moment;
    price?: number;
    comments?: string;
    itemTransfereds?: IMaterialStockAndSalesUtility[];
    transferClassifName?: string;
    transferClassifId?: number;
    warehousefromName?: string;
    warehousefromId?: number;
    warehousetoName?: string;
    warehousetoId?: number;
    materialclassificationDescription?: string;
    materialclassificationId?: number;
}

export class MaterialhistoryStockAndSalesUtility implements IMaterialhistoryStockAndSalesUtility {
    constructor(
        public id?: number,
        public code?: string,
        public creationDate?: Moment,
        public price?: number,
        public comments?: string,
        public itemTransfereds?: IMaterialStockAndSalesUtility[],
        public transferClassifName?: string,
        public transferClassifId?: number,
        public warehousefromName?: string,
        public warehousefromId?: number,
        public warehousetoName?: string,
        public warehousetoId?: number,
        public materialclassificationDescription?: string,
        public materialclassificationId?: number
    ) {}
}
