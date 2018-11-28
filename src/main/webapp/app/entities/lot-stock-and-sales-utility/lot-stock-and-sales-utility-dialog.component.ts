import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LotStockAndSalesUtility } from '../../shared/model/lot-stock-and-sales-utility.model';
import { LotStockAndSalesUtilityPopupService } from './lot-stock-and-sales-utility-popup.service';
import { LotStockAndSalesUtilityService } from './lot-stock-and-sales-utility.service';
import { CurrencyStockAndSalesUtilityService } from '../currency-stock-and-sales-utility';
import { CurrencyStockAndSalesUtility } from '../../shared/model/currency-stock-and-sales-utility.model';
import { MaterialclassificationStockAndSalesUtility } from '../../shared/model/materialclassification-stock-and-sales-utility.model';
import { MaterialclassificationStockAndSalesUtilityService } from '../materialclassification-stock-and-sales-utility';
import { MaterialStockAndSalesUtilityService } from '../material-stock-and-sales-utility';
import { MaterialStockAndSalesUtility } from '../../shared/model/material-stock-and-sales-utility.model';
import { ThirdStockAndSalesUtilityService } from '../third-stock-and-sales-utility/third-stock-and-sales-utility.service';
import { ThirdStockAndSalesUtility } from '../../shared/model/third-stock-and-sales-utility.model';

@Component({
    selector: 'jhi-lot-stock-and-sales-utility-dialog',
    templateUrl: './lot-stock-and-sales-utility-dialog.component.html'
})
export class LotStockAndSalesUtilityDialogComponent implements OnInit {
    createArticle: boolean = false;
    lot: LotStockAndSalesUtility;
    isSaving: boolean;

    currencies: CurrencyStockAndSalesUtility[];

    materialclassifications: MaterialclassificationStockAndSalesUtility[];
    creationDateDp: any;
    private defaultThird: ThirdStockAndSalesUtility;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private lotService: LotStockAndSalesUtilityService,
        private currencyService: CurrencyStockAndSalesUtilityService,
        private materialclassificationService: MaterialclassificationStockAndSalesUtilityService,
        private eventManager: JhiEventManager,
        private materialService: MaterialStockAndSalesUtilityService,
        private thirdService: ThirdStockAndSalesUtilityService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.currencyService.query().subscribe(
            (res: HttpResponse<CurrencyStockAndSalesUtility[]>) => {
                this.currencies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.materialclassificationService.query().subscribe(
            (res: HttpResponse<MaterialclassificationStockAndSalesUtility[]>) => {
                this.materialclassifications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.thirdService.query().subscribe((thirds: HttpResponse<ThirdStockAndSalesUtility[]>) => {
            const rThirds: ThirdStockAndSalesUtility[] = thirds.body;
            this.defaultThird = rThirds.filter(third => {
                return third.defaultWarehouse === true;
            })[0];
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lot.id !== undefined) {
            this.subscribeToSaveResponse(this.lotService.update(this.lot));
        } else {
            //  this.lot.creationDate = this.getCurrentDate();
            this.subscribeToSaveResponse(this.lotService.create(this.lot));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LotStockAndSalesUtility>>) {
        result.subscribe(
            (res: HttpResponse<LotStockAndSalesUtility>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: LotStockAndSalesUtility) {
        this.lot.id = result.id;
        this.eventManager.broadcast({
            name: 'lotListModification',
            content: 'OK'
        });
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
                            moment(), //this.getCurrentDate()
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
        this.activeModal.dismiss(result);
        this.createArticle = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCurrencyById(index: number, item: CurrencyStockAndSalesUtility) {
        return item.id;
    }

    trackMaterialclassificationById(index: number, item: MaterialclassificationStockAndSalesUtility) {
        return item.id;
    }

    private getCurrentDate(): { year: any; month: any; day: any } {
        const theDate = new Date(Date.now());
        const year1 = new Date(Date.now()).getFullYear();
        const month1 = new Date(Date.now()).getMonth() + 1;
        const day1 = new Date(Date.now()).getDate();
        return {
            year: year1,
            month: month1,
            day: day1
        };
    }

    createLotAndArticle() {
        this.createArticle = true;
        this.save();
    }
}

@Component({
    selector: 'jhi-lot-stock-and-sales-utility-popup',
    template: ''
})
export class LotStockAndSalesUtilityPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private lotPopupService: LotStockAndSalesUtilityPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.lotPopupService.open(LotStockAndSalesUtilityDialogComponent as Component, params['id']);
            } else {
                this.lotPopupService.open(LotStockAndSalesUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
