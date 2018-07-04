import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MaterialhistoryStockAndSalesUtility } from './materialhistory-stock-and-sales-utility.model';
import { MaterialhistoryStockAndSalesUtilityPopupService } from './materialhistory-stock-and-sales-utility-popup.service';
import { MaterialhistoryStockAndSalesUtilityService } from './materialhistory-stock-and-sales-utility.service';
import { MaterialStockAndSalesUtility, MaterialStockAndSalesUtilityService } from '../material-stock-and-sales-utility';
import { TransferclassificationStockAndSalesUtility, TransferclassificationStockAndSalesUtilityService } from '../transferclassification-stock-and-sales-utility';
import { ThirdStockAndSalesUtility, ThirdStockAndSalesUtilityService } from '../third-stock-and-sales-utility';

@Component({
    selector: 'jhi-materialhistory-stock-and-sales-utility-dialog',
    templateUrl: './materialhistory-stock-and-sales-utility-dialog.component.html'
})
export class MaterialhistoryStockAndSalesUtilityDialogComponent implements OnInit {

    materialhistory: MaterialhistoryStockAndSalesUtility;
    isSaving: boolean;

    materials: MaterialStockAndSalesUtility[];

    transferclassifications: TransferclassificationStockAndSalesUtility[];

    thirds: ThirdStockAndSalesUtility[];
    creationDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private materialhistoryService: MaterialhistoryStockAndSalesUtilityService,
        private materialService: MaterialStockAndSalesUtilityService,
        private transferclassificationService: TransferclassificationStockAndSalesUtilityService,
        private thirdService: ThirdStockAndSalesUtilityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.materialService.query()
            .subscribe((res: HttpResponse<MaterialStockAndSalesUtility[]>) => { this.materials = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.transferclassificationService.query()
            .subscribe((res: HttpResponse<TransferclassificationStockAndSalesUtility[]>) => { this.transferclassifications = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.thirdService.query()
            .subscribe((res: HttpResponse<ThirdStockAndSalesUtility[]>) => { this.thirds = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.materialhistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.materialhistoryService.update(this.materialhistory));
        } else {
            this.subscribeToSaveResponse(
                this.materialhistoryService.create(this.materialhistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MaterialhistoryStockAndSalesUtility>>) {
        result.subscribe((res: HttpResponse<MaterialhistoryStockAndSalesUtility>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MaterialhistoryStockAndSalesUtility) {
        this.eventManager.broadcast({ name: 'materialhistoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMaterialById(index: number, item: MaterialStockAndSalesUtility) {
        return item.id;
    }

    trackTransferclassificationById(index: number, item: TransferclassificationStockAndSalesUtility) {
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
    selector: 'jhi-materialhistory-stock-and-sales-utility-popup',
    template: ''
})
export class MaterialhistoryStockAndSalesUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private materialhistoryPopupService: MaterialhistoryStockAndSalesUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.materialhistoryPopupService
                    .open(MaterialhistoryStockAndSalesUtilityDialogComponent as Component, params['id']);
            } else {
                this.materialhistoryPopupService
                    .open(MaterialhistoryStockAndSalesUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
