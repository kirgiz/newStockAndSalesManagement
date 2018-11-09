import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILotStockAndSalesUtility } from 'app/shared/model/lot-stock-and-sales-utility.model';
import { LotStockAndSalesUtilityService } from './lot-stock-and-sales-utility.service';

@Component({
    selector: 'jhi-lot-stock-and-sales-utility-delete-dialog',
    templateUrl: './lot-stock-and-sales-utility-delete-dialog.component.html'
})
export class LotStockAndSalesUtilityDeleteDialogComponent {
    lot: ILotStockAndSalesUtility;

    constructor(
        private lotService: LotStockAndSalesUtilityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lotService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'lotListModification',
                content: 'Deleted an lot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lot-stock-and-sales-utility-delete-popup',
    template: ''
})
export class LotStockAndSalesUtilityDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ lot }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LotStockAndSalesUtilityDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.lot = lot;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
