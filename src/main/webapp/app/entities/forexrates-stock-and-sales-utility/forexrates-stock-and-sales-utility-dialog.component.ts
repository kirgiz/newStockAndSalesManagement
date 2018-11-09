import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ForexratesStockAndSalesUtility } from './forexrates-stock-and-sales-utility.model';
import { ForexratesStockAndSalesUtilityPopupService } from './forexrates-stock-and-sales-utility-popup.service';
import { ForexratesStockAndSalesUtilityService } from './forexrates-stock-and-sales-utility.service';
import { CurrencyStockAndSalesUtility, CurrencyStockAndSalesUtilityService } from '../currency-stock-and-sales-utility';

@Component({
    selector: 'jhi-forexrates-stock-and-sales-utility-dialog',
    templateUrl: './forexrates-stock-and-sales-utility-dialog.component.html'
})
export class ForexratesStockAndSalesUtilityDialogComponent implements OnInit {

    forexrates: ForexratesStockAndSalesUtility;
    isSaving: boolean;

    currencies: CurrencyStockAndSalesUtility[];
    rateDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private forexratesService: ForexratesStockAndSalesUtilityService,
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
        if (this.forexrates.id !== undefined) {
            this.subscribeToSaveResponse(
                this.forexratesService.update(this.forexrates));
        } else {
            this.subscribeToSaveResponse(
                this.forexratesService.create(this.forexrates));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ForexratesStockAndSalesUtility>>) {
        result.subscribe((res: HttpResponse<ForexratesStockAndSalesUtility>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ForexratesStockAndSalesUtility) {
        this.eventManager.broadcast({ name: 'forexratesListModification', content: 'OK'});
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
    selector: 'jhi-forexrates-stock-and-sales-utility-popup',
    template: ''
})
export class ForexratesStockAndSalesUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private forexratesPopupService: ForexratesStockAndSalesUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.forexratesPopupService
                    .open(ForexratesStockAndSalesUtilityDialogComponent as Component, params['id']);
            } else {
                this.forexratesPopupService
                    .open(ForexratesStockAndSalesUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
