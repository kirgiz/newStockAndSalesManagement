import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAddressclassificationStockAndSalesUtility } from 'app/shared/model/addressclassification-stock-and-sales-utility.model';
import { AddressclassificationStockAndSalesUtilityService } from './addressclassification-stock-and-sales-utility.service';

@Component({
    selector: 'jhi-addressclassification-stock-and-sales-utility-update',
    templateUrl: './addressclassification-stock-and-sales-utility-update.component.html'
})
export class AddressclassificationStockAndSalesUtilityUpdateComponent implements OnInit {
    addressclassification: IAddressclassificationStockAndSalesUtility;
    isSaving: boolean;

    constructor(
        private addressclassificationService: AddressclassificationStockAndSalesUtilityService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ addressclassification }) => {
            this.addressclassification = addressclassification;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.addressclassification.id !== undefined) {
            this.subscribeToSaveResponse(this.addressclassificationService.update(this.addressclassification));
        } else {
            this.subscribeToSaveResponse(this.addressclassificationService.create(this.addressclassification));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAddressclassificationStockAndSalesUtility>>) {
        result.subscribe(
            (res: HttpResponse<IAddressclassificationStockAndSalesUtility>) => this.onSaveSuccess(),
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
