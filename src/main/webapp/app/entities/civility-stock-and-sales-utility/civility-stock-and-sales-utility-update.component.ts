import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICivilityStockAndSalesUtility } from 'app/shared/model/civility-stock-and-sales-utility.model';
import { CivilityStockAndSalesUtilityService } from './civility-stock-and-sales-utility.service';

@Component({
    selector: 'jhi-civility-stock-and-sales-utility-update',
    templateUrl: './civility-stock-and-sales-utility-update.component.html'
})
export class CivilityStockAndSalesUtilityUpdateComponent implements OnInit {
    civility: ICivilityStockAndSalesUtility;
    isSaving: boolean;

    constructor(private civilityService: CivilityStockAndSalesUtilityService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ civility }) => {
            this.civility = civility;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.civility.id !== undefined) {
            this.subscribeToSaveResponse(this.civilityService.update(this.civility));
        } else {
            this.subscribeToSaveResponse(this.civilityService.create(this.civility));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICivilityStockAndSalesUtility>>) {
        result.subscribe(
            (res: HttpResponse<ICivilityStockAndSalesUtility>) => this.onSaveSuccess(),
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
