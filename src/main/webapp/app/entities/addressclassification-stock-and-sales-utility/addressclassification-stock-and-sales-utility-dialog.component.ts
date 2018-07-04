import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AddressclassificationStockAndSalesUtility } from './addressclassification-stock-and-sales-utility.model';
import { AddressclassificationStockAndSalesUtilityPopupService } from './addressclassification-stock-and-sales-utility-popup.service';
import { AddressclassificationStockAndSalesUtilityService } from './addressclassification-stock-and-sales-utility.service';

@Component({
    selector: 'jhi-addressclassification-stock-and-sales-utility-dialog',
    templateUrl: './addressclassification-stock-and-sales-utility-dialog.component.html'
})
export class AddressclassificationStockAndSalesUtilityDialogComponent implements OnInit {

    addressclassification: AddressclassificationStockAndSalesUtility;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private addressclassificationService: AddressclassificationStockAndSalesUtilityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.addressclassification.id !== undefined) {
            this.subscribeToSaveResponse(
                this.addressclassificationService.update(this.addressclassification));
        } else {
            this.subscribeToSaveResponse(
                this.addressclassificationService.create(this.addressclassification));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AddressclassificationStockAndSalesUtility>>) {
        result.subscribe((res: HttpResponse<AddressclassificationStockAndSalesUtility>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AddressclassificationStockAndSalesUtility) {
        this.eventManager.broadcast({ name: 'addressclassificationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-addressclassification-stock-and-sales-utility-popup',
    template: ''
})
export class AddressclassificationStockAndSalesUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressclassificationPopupService: AddressclassificationStockAndSalesUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.addressclassificationPopupService
                    .open(AddressclassificationStockAndSalesUtilityDialogComponent as Component, params['id']);
            } else {
                this.addressclassificationPopupService
                    .open(AddressclassificationStockAndSalesUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
