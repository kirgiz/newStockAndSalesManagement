import { IThirdStockAndSalesUtility } from 'app/shared/model/third-stock-and-sales-utility.model';

export interface ICivilityStockAndSalesUtility {
    id?: number;
    code?: string;
    name?: string;
    comments?: string;
    thirdCivilities?: IThirdStockAndSalesUtility[];
}

export class CivilityStockAndSalesUtility implements ICivilityStockAndSalesUtility {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public comments?: string,
        public thirdCivilities?: IThirdStockAndSalesUtility[]
    ) {}
}
