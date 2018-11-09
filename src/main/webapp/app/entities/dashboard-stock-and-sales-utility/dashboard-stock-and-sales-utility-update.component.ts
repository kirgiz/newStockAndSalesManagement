import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IDashboardStockAndSalesUtility } from 'app/shared/model/dashboard-stock-and-sales-utility.model';
import { DashboardStockAndSalesUtilityService } from './dashboard-stock-and-sales-utility.service';
import { ICurrencyStockAndSalesUtility } from 'app/shared/model/currency-stock-and-sales-utility.model';
import { CurrencyStockAndSalesUtilityService } from 'app/entities/currency-stock-and-sales-utility';
import { ITransferclassificationStockAndSalesUtility } from 'app/shared/model/transferclassification-stock-and-sales-utility.model';
import { TransferclassificationStockAndSalesUtilityService } from 'app/entities/transferclassification-stock-and-sales-utility';
import { IThirdStockAndSalesUtility } from 'app/shared/model/third-stock-and-sales-utility.model';
import { ThirdStockAndSalesUtilityService } from 'app/entities/third-stock-and-sales-utility';
import { IMaterialclassificationStockAndSalesUtility } from 'app/shared/model/materialclassification-stock-and-sales-utility.model';
import { MaterialclassificationStockAndSalesUtilityService } from 'app/entities/materialclassification-stock-and-sales-utility';

@Component({
    selector: 'jhi-dashboard-stock-and-sales-utility-update',
    templateUrl: './dashboard-stock-and-sales-utility-update.component.html'
})
export class DashboardStockAndSalesUtilityUpdateComponent implements OnInit {
    dashboard: IDashboardStockAndSalesUtility;
    isSaving: boolean;

    currencies: ICurrencyStockAndSalesUtility[];

    transferclassifications: ITransferclassificationStockAndSalesUtility[];

    thirds: IThirdStockAndSalesUtility[];

    materialclassifications: IMaterialclassificationStockAndSalesUtility[];
    transferDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private dashboardService: DashboardStockAndSalesUtilityService,
        private currencyService: CurrencyStockAndSalesUtilityService,
        private transferclassificationService: TransferclassificationStockAndSalesUtilityService,
        private thirdService: ThirdStockAndSalesUtilityService,
        private materialclassificationService: MaterialclassificationStockAndSalesUtilityService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dashboard }) => {
            this.dashboard = dashboard;
        });
        this.currencyService.query().subscribe(
            (res: HttpResponse<ICurrencyStockAndSalesUtility[]>) => {
                this.currencies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.transferclassificationService.query().subscribe(
            (res: HttpResponse<ITransferclassificationStockAndSalesUtility[]>) => {
                this.transferclassifications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.thirdService.query().subscribe(
            (res: HttpResponse<IThirdStockAndSalesUtility[]>) => {
                this.thirds = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.materialclassificationService.query().subscribe(
            (res: HttpResponse<IMaterialclassificationStockAndSalesUtility[]>) => {
                this.materialclassifications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.dashboard.id !== undefined) {
            this.subscribeToSaveResponse(this.dashboardService.update(this.dashboard));
        } else {
            this.subscribeToSaveResponse(this.dashboardService.create(this.dashboard));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDashboardStockAndSalesUtility>>) {
        result.subscribe(
            (res: HttpResponse<IDashboardStockAndSalesUtility>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCurrencyById(index: number, item: ICurrencyStockAndSalesUtility) {
        return item.id;
    }

    trackTransferclassificationById(index: number, item: ITransferclassificationStockAndSalesUtility) {
        return item.id;
    }

    trackThirdById(index: number, item: IThirdStockAndSalesUtility) {
        return item.id;
    }

    trackMaterialclassificationById(index: number, item: IMaterialclassificationStockAndSalesUtility) {
        return item.id;
    }
}
