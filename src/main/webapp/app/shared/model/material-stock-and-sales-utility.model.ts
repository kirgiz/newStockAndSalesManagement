import { Moment } from 'moment';

export interface IMaterialStockAndSalesUtility {
    id?: number;
    code?: string;
    description?: string;
    creationDate?: Moment;
    comments?: string;
    currentLocation?: number;
    materialTypeDefName?: string;
    materialTypeDefId?: number;
    lotIdentifierCode?: string;
    lotIdentifierId?: number;
    materialTypeCatName?: string;
    materialTypeCatId?: number;
}

export class MaterialStockAndSalesUtility implements IMaterialStockAndSalesUtility {
    constructor(
        public id?: number,
        public code?: string,
        public description?: string,
        public creationDate?: Moment,
        public comments?: string,
        public currentLocation?: number,
        public materialTypeDefName?: string,
        public materialTypeDefId?: number,
        public lotIdentifierCode?: string,
        public lotIdentifierId?: number,
        public materialTypeCatName?: string,
        public materialTypeCatId?: number
    ) {}
}
