import { IMaterialhistoryStockAndSalesUtility } from 'app/shared/model/materialhistory-stock-and-sales-utility.model';
import { IDashboardStockAndSalesUtility } from 'app/shared/model/dashboard-stock-and-sales-utility.model';

export interface ITransferclassificationStockAndSalesUtility {
    id?: number;
    code?: string;
    name?: string;
    isOutgoingTransfer?: boolean;
    isIncomingTransfer?: boolean;
    isInternalTransfer?: boolean;
    comments?: string;
    materialhistoryCategories?: IMaterialhistoryStockAndSalesUtility[];
    transferDashboards?: IDashboardStockAndSalesUtility[];
}

export class TransferclassificationStockAndSalesUtility implements ITransferclassificationStockAndSalesUtility {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public isOutgoingTransfer?: boolean,
        public isIncomingTransfer?: boolean,
        public isInternalTransfer?: boolean,
        public comments?: string,
        public materialhistoryCategories?: IMaterialhistoryStockAndSalesUtility[],
        public transferDashboards?: IDashboardStockAndSalesUtility[]
    ) {
        this.isOutgoingTransfer = this.isOutgoingTransfer || false;
        this.isIncomingTransfer = this.isIncomingTransfer || false;
        this.isInternalTransfer = this.isInternalTransfer || false;
    }
}
