import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITransferclassificationStockAndSalesUtility } from 'app/shared/model/transferclassification-stock-and-sales-utility.model';
import { TransferclassificationStockAndSalesUtilityService } from './transferclassification-stock-and-sales-utility.service';

@Component({
    selector: 'jhi-transferclassification-stock-and-sales-utility-update',
    templateUrl: './transferclassification-stock-and-sales-utility-update.component.html'
})
export class TransferclassificationStockAndSalesUtilityUpdateComponent implements OnInit {
    transferclassification: ITransferclassificationStockAndSalesUtility;
    isSaving: boolean;

    constructor(
        private transferclassificationService: TransferclassificationStockAndSalesUtilityService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transferclassification }) => {
            this.transferclassification = transferclassification;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.transferclassification.id !== undefined) {
            this.subscribeToSaveResponse(this.transferclassificationService.update(this.transferclassification));
        } else {
            this.subscribeToSaveResponse(this.transferclassificationService.create(this.transferclassification));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITransferclassificationStockAndSalesUtility>>) {
        result.subscribe(
            (res: HttpResponse<ITransferclassificationStockAndSalesUtility>) => this.onSaveSuccess(),
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
