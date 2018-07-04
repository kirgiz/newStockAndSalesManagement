import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MaterialclassificationStockAndSalesUtility } from './materialclassification-stock-and-sales-utility.model';
import { MaterialclassificationStockAndSalesUtilityPopupService } from './materialclassification-stock-and-sales-utility-popup.service';
import { MaterialclassificationStockAndSalesUtilityService } from './materialclassification-stock-and-sales-utility.service';

@Component({
    selector: 'jhi-materialclassification-stock-and-sales-utility-dialog',
    templateUrl: './materialclassification-stock-and-sales-utility-dialog.component.html'
})
export class MaterialclassificationStockAndSalesUtilityDialogComponent implements OnInit {

    materialclassification: MaterialclassificationStockAndSalesUtility;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private materialclassificationService: MaterialclassificationStockAndSalesUtilityService,
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
        if (this.materialclassification.id !== undefined) {
            this.subscribeToSaveResponse(
                this.materialclassificationService.update(this.materialclassification));
        } else {
            this.subscribeToSaveResponse(
                this.materialclassificationService.create(this.materialclassification));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MaterialclassificationStockAndSalesUtility>>) {
        result.subscribe((res: HttpResponse<MaterialclassificationStockAndSalesUtility>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MaterialclassificationStockAndSalesUtility) {
        this.eventManager.broadcast({ name: 'materialclassificationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-materialclassification-stock-and-sales-utility-popup',
    template: ''
})
export class MaterialclassificationStockAndSalesUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private materialclassificationPopupService: MaterialclassificationStockAndSalesUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.materialclassificationPopupService
                    .open(MaterialclassificationStockAndSalesUtilityDialogComponent as Component, params['id']);
            } else {
                this.materialclassificationPopupService
                    .open(MaterialclassificationStockAndSalesUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
