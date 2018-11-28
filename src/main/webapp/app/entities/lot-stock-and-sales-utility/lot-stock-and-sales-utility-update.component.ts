import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { ILotStockAndSalesUtility } from '../../shared/model/lot-stock-and-sales-utility.model';
import { LotStockAndSalesUtilityService } from './lot-stock-and-sales-utility.service';
import { ICurrencyStockAndSalesUtility } from '../../shared/model/currency-stock-and-sales-utility.model';
import { CurrencyStockAndSalesUtilityService } from '../currency-stock-and-sales-utility';
import { IMaterialclassificationStockAndSalesUtility } from 'app/shared/model/materialclassification-stock-and-sales-utility.model';
import { MaterialclassificationStockAndSalesUtilityService } from 'app/entities/materialclassification-stock-and-sales-utility';
import { IThirdStockAndSalesUtility } from '../../shared/model/third-stock-and-sales-utility.model';
import { ThirdStockAndSalesUtilityService } from '../third-stock-and-sales-utility';
import { MaterialStockAndSalesUtilityService } from '../material-stock-and-sales-utility';
import { IMaterialStockAndSalesUtility, MaterialStockAndSalesUtility } from '../../shared/model/material-stock-and-sales-utility.model';

@Component({
    selector: 'jhi-lot-stock-and-sales-utility-update',
    templateUrl: './lot-stock-and-sales-utility-update.component.html'
})
export class LotStockAndSalesUtilityUpdateComponent implements OnInit {
    defaultThird: IThirdStockAndSalesUtility;
    lot: ILotStockAndSalesUtility;
    isSaving: boolean;
    createArticle: boolean = false;
    currencies: ICurrencyStockAndSalesUtility[];

    materialclassifications: IMaterialclassificationStockAndSalesUtility[];
    creationDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private lotService: LotStockAndSalesUtilityService,
        private currencyService: CurrencyStockAndSalesUtilityService,
        private materialclassificationService: MaterialclassificationStockAndSalesUtilityService,
        private activatedRoute: ActivatedRoute,
        private thirdService: ThirdStockAndSalesUtilityService,
        private materialService: MaterialStockAndSalesUtilityService
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
        this.thirdService.query().subscribe((thirds: HttpResponse<IThirdStockAndSalesUtility[]>) => {
            const rThirds: IThirdStockAndSalesUtility[] = thirds.body;
            this.defaultThird = rThirds.filter(third => {
                return third.defaultWarehouse === true;
            })[0];
        });
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
            (res: HttpResponse<ILotStockAndSalesUtility>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: ILotStockAndSalesUtility) {
        this.lot.id = result.id;
        if (this.createArticle) {
            console.log('default lot');
            console.log(this.lot);
            for (let index = 0; index < this.lot.numberOfItems; index++) {
                this.materialService
                    .create(
                        new MaterialStockAndSalesUtility( //
                            null,
                            'A' + index,
                            this.lot.description + '_ARTICLE',
                            moment(),
                            null,
                            this.defaultThird.id,
                            null,
                            this.lot.materialclassificationId,
                            null,
                            this.lot.id,
                            null,
                            this.lot.materialclassificationId
                        )
                    )
                    .subscribe(rtr => {});
            }
        }

        this.isSaving = false;
        this.previousState();
    }
    /*  */
    createLotAndArticle() {
        this.createArticle = true;
        this.save();
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
