import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IAddressStockAndSalesUtility } from 'app/shared/model/address-stock-and-sales-utility.model';
import { AddressStockAndSalesUtilityService } from './address-stock-and-sales-utility.service';
import { IAddressclassificationStockAndSalesUtility } from 'app/shared/model/addressclassification-stock-and-sales-utility.model';
import { AddressclassificationStockAndSalesUtilityService } from 'app/entities/addressclassification-stock-and-sales-utility';
import { ICountryStockAndSalesUtility } from 'app/shared/model/country-stock-and-sales-utility.model';
import { CountryStockAndSalesUtilityService } from 'app/entities/country-stock-and-sales-utility';
import { IThirdStockAndSalesUtility } from 'app/shared/model/third-stock-and-sales-utility.model';
import { ThirdStockAndSalesUtilityService } from 'app/entities/third-stock-and-sales-utility';

@Component({
    selector: 'jhi-address-stock-and-sales-utility-update',
    templateUrl: './address-stock-and-sales-utility-update.component.html'
})
export class AddressStockAndSalesUtilityUpdateComponent implements OnInit {
    address: IAddressStockAndSalesUtility;
    isSaving: boolean;

    addressclassifications: IAddressclassificationStockAndSalesUtility[];

    countries: ICountryStockAndSalesUtility[];

    thirds: IThirdStockAndSalesUtility[];
    validFromDp: any;
    validToDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private addressService: AddressStockAndSalesUtilityService,
        private addressclassificationService: AddressclassificationStockAndSalesUtilityService,
        private countryService: CountryStockAndSalesUtilityService,
        private thirdService: ThirdStockAndSalesUtilityService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ address }) => {
            this.address = address;
        });
        this.addressclassificationService.query().subscribe(
            (res: HttpResponse<IAddressclassificationStockAndSalesUtility[]>) => {
                this.addressclassifications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.countryService.query().subscribe(
            (res: HttpResponse<ICountryStockAndSalesUtility[]>) => {
                this.countries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.thirdService.query().subscribe(
            (res: HttpResponse<IThirdStockAndSalesUtility[]>) => {
                this.thirds = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.address.id !== undefined) {
            this.subscribeToSaveResponse(this.addressService.update(this.address));
        } else {
            this.subscribeToSaveResponse(this.addressService.create(this.address));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAddressStockAndSalesUtility>>) {
        result.subscribe(
            (res: HttpResponse<IAddressStockAndSalesUtility>) => this.onSaveSuccess(),
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

    trackAddressclassificationById(index: number, item: IAddressclassificationStockAndSalesUtility) {
        return item.id;
    }

    trackCountryById(index: number, item: ICountryStockAndSalesUtility) {
        return item.id;
    }

    trackThirdById(index: number, item: IThirdStockAndSalesUtility) {
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
