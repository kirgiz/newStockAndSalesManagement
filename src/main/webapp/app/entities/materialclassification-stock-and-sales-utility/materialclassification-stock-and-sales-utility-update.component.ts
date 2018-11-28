import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMaterialclassificationStockAndSalesUtility } from 'app/shared/model/materialclassification-stock-and-sales-utility.model';
import { MaterialclassificationStockAndSalesUtilityService } from './materialclassification-stock-and-sales-utility.service';

@Component({
    selector: 'jhi-materialclassification-stock-and-sales-utility-update',
    templateUrl: './materialclassification-stock-and-sales-utility-update.component.html'
})
export class MaterialclassificationStockAndSalesUtilityUpdateComponent implements OnInit {
    materialclassification: IMaterialclassificationStockAndSalesUtility;
    isSaving: boolean;

    constructor(
        private materialclassificationService: MaterialclassificationStockAndSalesUtilityService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ materialclassification }) => {
            this.materialclassification = materialclassification;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.materialclassification.id !== undefined) {
            this.subscribeToSaveResponse(this.materialclassificationService.update(this.materialclassification));
        } else {
            this.subscribeToSaveResponse(this.materialclassificationService.create(this.materialclassification));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMaterialclassificationStockAndSalesUtility>>) {
        result.subscribe(
            (res: HttpResponse<IMaterialclassificationStockAndSalesUtility>) => this.onSaveSuccess(),
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
}
