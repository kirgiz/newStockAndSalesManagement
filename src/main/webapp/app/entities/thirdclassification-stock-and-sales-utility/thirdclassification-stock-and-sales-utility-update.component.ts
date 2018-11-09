import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IThirdclassificationStockAndSalesUtility } from 'app/shared/model/thirdclassification-stock-and-sales-utility.model';
import { ThirdclassificationStockAndSalesUtilityService } from './thirdclassification-stock-and-sales-utility.service';

@Component({
    selector: 'jhi-thirdclassification-stock-and-sales-utility-update',
    templateUrl: './thirdclassification-stock-and-sales-utility-update.component.html'
})
export class ThirdclassificationStockAndSalesUtilityUpdateComponent implements OnInit {
    thirdclassification: IThirdclassificationStockAndSalesUtility;
    isSaving: boolean;

    constructor(
        private thirdclassificationService: ThirdclassificationStockAndSalesUtilityService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ thirdclassification }) => {
            this.thirdclassification = thirdclassification;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.thirdclassification.id !== undefined) {
            this.subscribeToSaveResponse(this.thirdclassificationService.update(this.thirdclassification));
        } else {
            this.subscribeToSaveResponse(this.thirdclassificationService.create(this.thirdclassification));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IThirdclassificationStockAndSalesUtility>>) {
        result.subscribe(
            (res: HttpResponse<IThirdclassificationStockAndSalesUtility>) => this.onSaveSuccess(),
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
