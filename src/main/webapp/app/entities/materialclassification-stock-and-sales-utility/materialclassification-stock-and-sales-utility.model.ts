import { BaseEntity } from './../../shared';

export class MaterialclassificationStockAndSalesUtility implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public comments?: string,
        public materialCategories?: BaseEntity[],
        public materialCats?: BaseEntity[],
        public materialCategoryDashboards?: BaseEntity[],
    ) {
    }
}
