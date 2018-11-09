import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IForexratesStockAndSalesUtility } from 'app/shared/model/forexrates-stock-and-sales-utility.model';
import { ForexratesStockAndSalesUtilityService } from './forexrates-stock-and-sales-utility.service';

@Component({
    selector: 'jhi-forexrates-stock-and-sales-utility-delete-dialog',
    templateUrl: './forexrates-stock-and-sales-utility-delete-dialog.component.html'
})
export class ForexratesStockAndSalesUtilityDeleteDialogComponent {
    forexrates: IForexratesStockAndSalesUtility;

    constructor(
        private forexratesService: ForexratesStockAndSalesUtilityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.forexratesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'forexratesListModification',
                content: 'Deleted an forexrates'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-forexrates-stock-and-sales-utility-delete-popup',
    template: ''
})
export class ForexratesStockAndSalesUtilityDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ forexrates }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ForexratesStockAndSalesUtilityDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.forexrates = forexrates;
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
