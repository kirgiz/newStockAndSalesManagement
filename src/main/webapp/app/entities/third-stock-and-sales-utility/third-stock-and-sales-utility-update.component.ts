import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IThirdStockAndSalesUtility } from 'app/shared/model/third-stock-and-sales-utility.model';
import { ThirdStockAndSalesUtilityService } from './third-stock-and-sales-utility.service';
import { IAddressStockAndSalesUtility } from 'app/shared/model/address-stock-and-sales-utility.model';
import { AddressStockAndSalesUtilityService } from 'app/entities/address-stock-and-sales-utility';
import { IThirdclassificationStockAndSalesUtility } from 'app/shared/model/thirdclassification-stock-and-sales-utility.model';
import { ThirdclassificationStockAndSalesUtilityService } from 'app/entities/thirdclassification-stock-and-sales-utility';
import { ICivilityStockAndSalesUtility } from 'app/shared/model/civility-stock-and-sales-utility.model';
import { CivilityStockAndSalesUtilityService } from 'app/entities/civility-stock-and-sales-utility';

@Component({
    selector: 'jhi-third-stock-and-sales-utility-update',
    templateUrl: './third-stock-and-sales-utility-update.component.html'
})
export class ThirdStockAndSalesUtilityUpdateComponent implements OnInit {
    third: IThirdStockAndSalesUtility;
    isSaving: boolean;

    addresses: IAddressStockAndSalesUtility[];

    thirdclassifications: IThirdclassificationStockAndSalesUtility[];

    civilities: ICivilityStockAndSalesUtility[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private thirdService: ThirdStockAndSalesUtilityService,
        private addressService: AddressStockAndSalesUtilityService,
        private thirdclassificationService: ThirdclassificationStockAndSalesUtilityService,
        private civilityService: CivilityStockAndSalesUtilityService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ third }) => {
            this.third = third;
        });
        this.addressService.query().subscribe(
            (res: HttpResponse<IAddressStockAndSalesUtility[]>) => {
                this.addresses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.thirdclassificationService.query().subscribe(
            (res: HttpResponse<IThirdclassificationStockAndSalesUtility[]>) => {
                this.thirdclassifications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.civilityService.query().subscribe(
            (res: HttpResponse<ICivilityStockAndSalesUtility[]>) => {
                this.civilities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.third.id !== undefined) {
            this.subscribeToSaveResponse(this.thirdService.update(this.third));
        } else {
            this.subscribeToSaveResponse(this.thirdService.create(this.third));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IThirdStockAndSalesUtility>>) {
        result.subscribe(
            (res: HttpResponse<IThirdStockAndSalesUtility>) => this.onSaveSuccess(),
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

    trackAddressById(index: number, item: IAddressStockAndSalesUtility) {
        return item.id;
    }

    trackThirdclassificationById(index: number, item: IThirdclassificationStockAndSalesUtility) {
        return item.id;
    }

    trackCivilityById(index: number, item: ICivilityStockAndSalesUtility) {
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
