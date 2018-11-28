import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MaterialStockAndSalesUtility } from '../../shared/model/material-stock-and-sales-utility.model';
import { MaterialStockAndSalesUtilityPopupService } from './material-stock-and-sales-utility-popup.service';
import { MaterialStockAndSalesUtilityService } from './material-stock-and-sales-utility.service';
import { MaterialclassificationStockAndSalesUtilityService } from '../materialclassification-stock-and-sales-utility';
import { MaterialclassificationStockAndSalesUtility } from '../../shared/model/materialclassification-stock-and-sales-utility.model';
import { LotStockAndSalesUtility } from '../../shared/model/lot-stock-and-sales-utility.model';
import { LotStockAndSalesUtilityService } from '../lot-stock-and-sales-utility';
import * as moment from 'moment';

@Component({
    selector: 'jhi-material-stock-and-sales-utility-dialog',
    templateUrl: './material-stock-and-sales-utility-dialog.component.html'
})
export class MaterialStockAndSalesUtilityDialogComponent implements OnInit {
    material: MaterialStockAndSalesUtility;
    isSaving: boolean;

    materialclassifications: MaterialclassificationStockAndSalesUtility[];

    lots: LotStockAndSalesUtility[];
    creationDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private materialService: MaterialStockAndSalesUtilityService,
        private materialclassificationService: MaterialclassificationStockAndSalesUtilityService,
        private lotService: LotStockAndSalesUtilityService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.materialclassificationService.query().subscribe(
            (res: HttpResponse<MaterialclassificationStockAndSalesUtility[]>) => {
                this.materialclassifications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.lotService.query().subscribe(
            (res: HttpResponse<LotStockAndSalesUtility[]>) => {
                this.lots = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        const theDate = new Date(Date.now());
        const year1 = new Date(Date.now()).getFullYear();
        const month1 = new Date(Date.now()).getMonth() + 1;
        const day1 = new Date(Date.now()).getDate();
        const dd: { year: any; month: any; day: any } = {
            year: year1,
            month: month1,
            day: day1
        };
        this.material.creationDate = moment();
        this.isSaving = true;
        if (this.material.id !== undefined) {
            this.subscribeToSaveResponse(this.materialService.update(this.material));
        } else {
            this.subscribeToSaveResponse(this.materialService.create(this.material));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MaterialStockAndSalesUtility>>) {
        result.subscribe(
            (res: HttpResponse<MaterialStockAndSalesUtility>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: MaterialStockAndSalesUtility) {
        this.eventManager.broadcast({ name: 'materialListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMaterialclassificationById(index: number, item: MaterialclassificationStockAndSalesUtility) {
        return item.id;
    }

    trackLotById(index: number, item: LotStockAndSalesUtility) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-material-stock-and-sales-utility-popup',
    template: ''
})
export class MaterialStockAndSalesUtilityPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private materialPopupService: MaterialStockAndSalesUtilityPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.materialPopupService.open(MaterialStockAndSalesUtilityDialogComponent as Component, params['id']);
            } else {
                this.materialPopupService.open(MaterialStockAndSalesUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
