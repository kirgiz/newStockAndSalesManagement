import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IMaterialhistoryStockAndSalesUtility } from 'app/shared/model/materialhistory-stock-and-sales-utility.model';
import { MaterialhistoryStockAndSalesUtilityService } from './materialhistory-stock-and-sales-utility.service';
import { IMaterialStockAndSalesUtility } from 'app/shared/model/material-stock-and-sales-utility.model';
import { MaterialStockAndSalesUtilityService } from 'app/entities/material-stock-and-sales-utility';
import { ITransferclassificationStockAndSalesUtility } from 'app/shared/model/transferclassification-stock-and-sales-utility.model';
import { TransferclassificationStockAndSalesUtilityService } from 'app/entities/transferclassification-stock-and-sales-utility';
import { IThirdStockAndSalesUtility } from 'app/shared/model/third-stock-and-sales-utility.model';
import { ThirdStockAndSalesUtilityService } from 'app/entities/third-stock-and-sales-utility';
import { IMaterialclassificationStockAndSalesUtility } from 'app/shared/model/materialclassification-stock-and-sales-utility.model';
import { MaterialclassificationStockAndSalesUtilityService } from 'app/entities/materialclassification-stock-and-sales-utility';

@Component({
    selector: 'jhi-materialhistory-stock-and-sales-utility-update',
    templateUrl: './materialhistory-stock-and-sales-utility-update.component.html'
})
export class MaterialhistoryStockAndSalesUtilityUpdateComponent implements OnInit {
    materialhistory: IMaterialhistoryStockAndSalesUtility;
    isSaving: boolean;

    materials: IMaterialStockAndSalesUtility[];

    transferclassifications: ITransferclassificationStockAndSalesUtility[];

    thirds: IThirdStockAndSalesUtility[];

    materialclassifications: IMaterialclassificationStockAndSalesUtility[];
    creationDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private materialhistoryService: MaterialhistoryStockAndSalesUtilityService,
        private materialService: MaterialStockAndSalesUtilityService,
        private transferclassificationService: TransferclassificationStockAndSalesUtilityService,
        private thirdService: ThirdStockAndSalesUtilityService,
        private materialclassificationService: MaterialclassificationStockAndSalesUtilityService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ materialhistory }) => {
            this.materialhistory = materialhistory;
            console.log('this.materialhistory');
            console.log(this.materialhistory);
        });
        this.materialService.query().subscribe(
            (res: HttpResponse<IMaterialStockAndSalesUtility[]>) => {
                this.materials = res.body;
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
                console.log('this.materialclassifications');
                console.log(this.materialclassifications);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.materialhistory.id !== undefined) {
            this.subscribeToSaveResponse(this.materialhistoryService.update(this.materialhistory));
        } else {
            this.subscribeToSaveResponse(this.materialhistoryService.create(this.materialhistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMaterialhistoryStockAndSalesUtility>>) {
        result.subscribe(
            (res: HttpResponse<IMaterialhistoryStockAndSalesUtility>) => this.onSaveSuccess(),
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

    trackMaterialById(index: number, item: IMaterialStockAndSalesUtility) {
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
