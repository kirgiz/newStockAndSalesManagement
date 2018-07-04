import { BaseEntity } from './../../shared';

export class MaterialStockAndSalesUtility implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public description?: string,
        public creationDate?: any,
        public comments?: string,
        public materialTypeDefId?: number,
        public lotIdentifierId?: number,
        public materialTypeCatId?: number,
    ) {
    }
}
