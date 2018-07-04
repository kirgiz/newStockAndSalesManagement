import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CompanyStockAndSalesUtility } from './company-stock-and-sales-utility.model';
import { CompanyStockAndSalesUtilityPopupService } from './company-stock-and-sales-utility-popup.service';
import { CompanyStockAndSalesUtilityService } from './company-stock-and-sales-utility.service';
import { CurrencyStockAndSalesUtility, CurrencyStockAndSalesUtilityService } from '../currency-stock-and-sales-utility';

@Component({
    selector: 'jhi-company-stock-and-sales-utility-dialog',
    templateUrl: './company-stock-and-sales-utility-dialog.component.html'
})
export class CompanyStockAndSalesUtilityDialogComponent implements OnInit {

    company: CompanyStockAndSalesUtility;
    isSaving: boolean;

    currencies: CurrencyStockAndSalesUtility[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private companyService: CompanyStockAndSalesUtilityService,
        private currencyService: CurrencyStockAndSalesUtilityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.currencyService.query()
            .subscribe((res: HttpResponse<CurrencyStockAndSalesUtility[]>) => { this.currencies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.company.id !== undefined) {
            this.subscribeToSaveResponse(
                this.companyService.update(this.company));
        } else {
            this.subscribeToSaveResponse(
                this.companyService.create(this.company));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CompanyStockAndSalesUtility>>) {
        result.subscribe((res: HttpResponse<CompanyStockAndSalesUtility>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CompanyStockAndSalesUtility) {
        this.eventManager.broadcast({ name: 'companyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCurrencyById(index: number, item: CurrencyStockAndSalesUtility) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-company-stock-and-sales-utility-popup',
    template: ''
})
export class CompanyStockAndSalesUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private companyPopupService: CompanyStockAndSalesUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.companyPopupService
                    .open(CompanyStockAndSalesUtilityDialogComponent as Component, params['id']);
            } else {
                this.companyPopupService
                    .open(CompanyStockAndSalesUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
