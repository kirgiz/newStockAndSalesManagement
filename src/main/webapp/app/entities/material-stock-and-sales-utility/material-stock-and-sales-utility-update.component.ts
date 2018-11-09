import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IMaterialStockAndSalesUtility } from 'app/shared/model/material-stock-and-sales-utility.model';
import { MaterialStockAndSalesUtilityService } from './material-stock-and-sales-utility.service';
import { IMaterialclassificationStockAndSalesUtility } from 'app/shared/model/materialclassification-stock-and-sales-utility.model';
import { MaterialclassificationStockAndSalesUtilityService } from 'app/entities/materialclassification-stock-and-sales-utility';
import { ILotStockAndSalesUtility } from 'app/shared/model/lot-stock-and-sales-utility.model';
import { LotStockAndSalesUtilityService } from 'app/entities/lot-stock-and-sales-utility';

@Component({
    selector: 'jhi-material-stock-and-sales-utility-update',
    templateUrl: './material-stock-and-sales-utility-update.component.html'
})
export class MaterialStockAndSalesUtilityUpdateComponent implements OnInit {
    material: IMaterialStockAndSalesUtility;
    isSaving: boolean;

    materialclassifications: IMaterialclassificationStockAndSalesUtility[];

    lots: ILotStockAndSalesUtility[];
    creationDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private materialService: MaterialStockAndSalesUtilityService,
        private materialclassificationService: MaterialclassificationStockAndSalesUtilityService,
        private lotService: LotStockAndSalesUtilityService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ material }) => {
            this.material = material;
        });
        this.materialclassificationService.query().subscribe(
            (res: HttpResponse<IMaterialclassificationStockAndSalesUtility[]>) => {
                this.materialclassifications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.lotService.query().subscribe(
            (res: HttpResponse<ILotStockAndSalesUtility[]>) => {
                this.lots = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.material.id !== undefined) {
            this.subscribeToSaveResponse(this.materialService.update(this.material));
        } else {
            this.subscribeToSaveResponse(this.materialService.create(this.material));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMaterialStockAndSalesUtility>>) {
        result.subscribe(
            (res: HttpResponse<IMaterialStockAndSalesUtility>) => this.onSaveSuccess(),
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

    trackMaterialclassificationById(index: number, item: IMaterialclassificationStockAndSalesUtility) {
        return item.id;
    }

    trackLotById(index: number, item: ILotStockAndSalesUtility) {
        return item.id;
    }
}
