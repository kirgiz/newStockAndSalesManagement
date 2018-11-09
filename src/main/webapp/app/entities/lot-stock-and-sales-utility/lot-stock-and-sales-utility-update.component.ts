import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { ILotStockAndSalesUtility } from 'app/shared/model/lot-stock-and-sales-utility.model';
import { LotStockAndSalesUtilityService } from './lot-stock-and-sales-utility.service';
import { ICurrencyStockAndSalesUtility } from 'app/shared/model/currency-stock-and-sales-utility.model';
import { CurrencyStockAndSalesUtilityService } from 'app/entities/currency-stock-and-sales-utility';
import { IMaterialclassificationStockAndSalesUtility } from 'app/shared/model/materialclassification-stock-and-sales-utility.model';
import { MaterialclassificationStockAndSalesUtilityService } from 'app/entities/materialclassification-stock-and-sales-utility';

@Component({
    selector: 'jhi-lot-stock-and-sales-utility-update',
    templateUrl: './lot-stock-and-sales-utility-update.component.html'
})
export class LotStockAndSalesUtilityUpdateComponent implements OnInit {
    lot: ILotStockAndSalesUtility;
    isSaving: boolean;

    currencies: ICurrencyStockAndSalesUtility[];

    materialclassifications: IMaterialclassificationStockAndSalesUtility[];
    creationDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private lotService: LotStockAndSalesUtilityService,
        private currencyService: CurrencyStockAndSalesUtilityService,
        private materialclassificationService: MaterialclassificationStockAndSalesUtilityService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ lot }) => {
            this.lot = lot;
        });
        this.currencyService.query().subscribe(
            (res: HttpResponse<ICurrencyStockAndSalesUtility[]>) => {
                this.currencies = res.body;
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
        if (this.lot.id !== undefined) {
            this.subscribeToSaveResponse(this.lotService.update(this.lot));
        } else {
            this.subscribeToSaveResponse(this.lotService.create(this.lot));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILotStockAndSalesUtility>>) {
        result.subscribe(
            (res: HttpResponse<ILotStockAndSalesUtility>) => this.onSaveSuccess(),
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

    trackMaterialclassificationById(index: number, item: IMaterialclassificationStockAndSalesUtility) {
        return item.id;
    }
}
