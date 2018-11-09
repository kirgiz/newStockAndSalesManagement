import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TransferclassificationStockAndSalesUtility } from './transferclassification-stock-and-sales-utility.model';
import { TransferclassificationStockAndSalesUtilityPopupService } from './transferclassification-stock-and-sales-utility-popup.service';
import { TransferclassificationStockAndSalesUtilityService } from './transferclassification-stock-and-sales-utility.service';

@Component({
    selector: 'jhi-transferclassification-stock-and-sales-utility-dialog',
    templateUrl: './transferclassification-stock-and-sales-utility-dialog.component.html'
})
export class TransferclassificationStockAndSalesUtilityDialogComponent implements OnInit {

    transferclassification: TransferclassificationStockAndSalesUtility;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private transferclassificationService: TransferclassificationStockAndSalesUtilityService,
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
        if (this.transferclassification.id !== undefined) {
            this.subscribeToSaveResponse(
                this.transferclassificationService.update(this.transferclassification));
        } else {
            this.subscribeToSaveResponse(
                this.transferclassificationService.create(this.transferclassification));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TransferclassificationStockAndSalesUtility>>) {
        result.subscribe((res: HttpResponse<TransferclassificationStockAndSalesUtility>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TransferclassificationStockAndSalesUtility) {
        this.eventManager.broadcast({ name: 'transferclassificationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-transferclassification-stock-and-sales-utility-popup',
    template: ''
})
export class TransferclassificationStockAndSalesUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transferclassificationPopupService: TransferclassificationStockAndSalesUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.transferclassificationPopupService
                    .open(TransferclassificationStockAndSalesUtilityDialogComponent as Component, params['id']);
            } else {
                this.transferclassificationPopupService
                    .open(TransferclassificationStockAndSalesUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
