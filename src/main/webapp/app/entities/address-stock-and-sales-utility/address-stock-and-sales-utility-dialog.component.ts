import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AddressStockAndSalesUtility } from './address-stock-and-sales-utility.model';
import { AddressStockAndSalesUtilityPopupService } from './address-stock-and-sales-utility-popup.service';
import { AddressStockAndSalesUtilityService } from './address-stock-and-sales-utility.service';
import { AddressclassificationStockAndSalesUtility, AddressclassificationStockAndSalesUtilityService } from '../addressclassification-stock-and-sales-utility';
import { CountryStockAndSalesUtility, CountryStockAndSalesUtilityService } from '../country-stock-and-sales-utility';
import { ThirdStockAndSalesUtility, ThirdStockAndSalesUtilityService } from '../third-stock-and-sales-utility';

@Component({
    selector: 'jhi-address-stock-and-sales-utility-dialog',
    templateUrl: './address-stock-and-sales-utility-dialog.component.html'
})
export class AddressStockAndSalesUtilityDialogComponent implements OnInit {

    address: AddressStockAndSalesUtility;
    isSaving: boolean;

    addressclassifications: AddressclassificationStockAndSalesUtility[];

    countries: CountryStockAndSalesUtility[];

    thirds: ThirdStockAndSalesUtility[];
    validFromDp: any;
    validToDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private addressService: AddressStockAndSalesUtilityService,
        private addressclassificationService: AddressclassificationStockAndSalesUtilityService,
        private countryService: CountryStockAndSalesUtilityService,
        private thirdService: ThirdStockAndSalesUtilityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.addressclassificationService.query()
            .subscribe((res: HttpResponse<AddressclassificationStockAndSalesUtility[]>) => { this.addressclassifications = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.countryService.query()
            .subscribe((res: HttpResponse<CountryStockAndSalesUtility[]>) => { this.countries = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.thirdService.query()
            .subscribe((res: HttpResponse<ThirdStockAndSalesUtility[]>) => { this.thirds = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.address.id !== undefined) {
            this.subscribeToSaveResponse(
                this.addressService.update(this.address));
        } else {
            this.subscribeToSaveResponse(
                this.addressService.create(this.address));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AddressStockAndSalesUtility>>) {
        result.subscribe((res: HttpResponse<AddressStockAndSalesUtility>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AddressStockAndSalesUtility) {
        this.eventManager.broadcast({ name: 'addressListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAddressclassificationById(index: number, item: AddressclassificationStockAndSalesUtility) {
        return item.id;
    }

    trackCountryById(index: number, item: CountryStockAndSalesUtility) {
        return item.id;
    }

    trackThirdById(index: number, item: ThirdStockAndSalesUtility) {
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

@Component({
    selector: 'jhi-address-stock-and-sales-utility-popup',
    template: ''
})
export class AddressStockAndSalesUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressPopupService: AddressStockAndSalesUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.addressPopupService
                    .open(AddressStockAndSalesUtilityDialogComponent as Component, params['id']);
            } else {
                this.addressPopupService
                    .open(AddressStockAndSalesUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
