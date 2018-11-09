import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { MaterialclassificationStockAndSalesUtility } from './materialclassification-stock-and-sales-utility.model';
import { MaterialclassificationStockAndSalesUtilityService } from './materialclassification-stock-and-sales-utility.service';

@Injectable()
export class MaterialclassificationStockAndSalesUtilityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private materialclassificationService: MaterialclassificationStockAndSalesUtilityService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.materialclassificationService.find(id)
                    .subscribe((materialclassificationResponse: HttpResponse<MaterialclassificationStockAndSalesUtility>) => {
                        const materialclassification: MaterialclassificationStockAndSalesUtility = materialclassificationResponse.body;
                        this.ngbModalRef = this.materialclassificationModalRef(component, materialclassification);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.materialclassificationModalRef(component, new MaterialclassificationStockAndSalesUtility());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    materialclassificationModalRef(component: Component, materialclassification: MaterialclassificationStockAndSalesUtility): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.materialclassification = materialclassification;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
