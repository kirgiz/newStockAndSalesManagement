import { BaseEntity } from '../../shared/model/base-entity.model';

export class MaterialhistoryStockAndSalesUtility implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public creationDate?: any,
        public price?: number,
        public comments?: string,
        public userMod?: number,
        public itemTransfereds?: BaseEntity[],
        public transferClassifId?: number,
        public warehousefromId?: number,
        public warehousetoId?: number,
        public materialclassificationId?: number
    ) {}
}
