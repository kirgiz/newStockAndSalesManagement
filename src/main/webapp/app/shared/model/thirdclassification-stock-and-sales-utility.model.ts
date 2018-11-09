import { IThirdStockAndSalesUtility } from 'app/shared/model/third-stock-and-sales-utility.model';

export interface IThirdclassificationStockAndSalesUtility {
    id?: number;
    code?: string;
    name?: string;
    comments?: string;
    thirdCategories?: IThirdStockAndSalesUtility[];
}

export class ThirdclassificationStockAndSalesUtility implements IThirdclassificationStockAndSalesUtility {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public comments?: string,
        public thirdCategories?: IThirdStockAndSalesUtility[]
    ) {}
}
