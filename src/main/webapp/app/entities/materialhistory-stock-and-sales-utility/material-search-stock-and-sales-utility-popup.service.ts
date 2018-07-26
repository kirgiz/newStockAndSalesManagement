import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { MaterialhistoryStockAndSalesUtility } from './materialhistory-stock-and-sales-utility.model';
import { MaterialhistoryStockAndSalesUtilityService } from './materialhistory-stock-and-sales-utility.service';

@Injectable()
export class MaterialSearchStockAndSalesUtilityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private materialhistoryService: MaterialhistoryStockAndSalesUtilityService

    ) {
        this.ngbModalRef = null;
        console.log('zboub');
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.materialhistoryService.find(id)
                    .subscribe((materialhistoryResponse: HttpResponse<MaterialhistoryStockAndSalesUtility>) => {
                        const materialhistory: MaterialhistoryStockAndSalesUtility = materialhistoryResponse.body;
                        if (materialhistory.creationDate) {
                            materialhistory.creationDate = {
                                year: materialhistory.creationDate.getFullYear(),
                                month: materialhistory.creationDate.getMonth() + 1,
                                day: materialhistory.creationDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.materialSearchModalRef(component, materialhistory);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.materialSearchModalRef(component, new MaterialhistoryStockAndSalesUtility());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    materialSearchModalRef(component: Component, materialhistory: MaterialhistoryStockAndSalesUtility): NgbModalRef {
        console.log('zboub');
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.materialhistory = materialhistory;
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
