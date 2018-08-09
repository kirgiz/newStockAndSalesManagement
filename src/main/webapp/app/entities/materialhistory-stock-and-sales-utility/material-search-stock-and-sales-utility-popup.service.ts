import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { MaterialStockAndSalesUtility } from '../material-stock-and-sales-utility/material-stock-and-sales-utility.model';
import { MaterialStockAndSalesUtilityService } from '../material-stock-and-sales-utility/material-stock-and-sales-utility.service';
import { MaterialSearchStockAndSalesUtilityResolvePagingParams} from './';

@Injectable()
export class MaterialSearchStockAndSalesUtilityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private materialService: MaterialStockAndSalesUtilityService

    ) {
        this.ngbModalRef = null;
        console.log('zboub');
    }

    open(component: Component //, id?: number | any
    ): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            /*if (id) {
                this.materialService.find(id)
                    .subscribe((materialResponse: HttpResponse<MaterialStockAndSalesUtility>) => {
                        const material: MaterialStockAndSalesUtility = materialResponse.body;
                        if (material.creationDate) {
                            material.creationDate = {
                                year: material.creationDate.getFullYear(),
                                month: material.creationDate.getMonth() + 1,
                                day: material.creationDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.materialSearchModalRef(component, material);
                        resolve(this.ngbModalRef);
                    });
            } else {*/
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.materialSearchModalRef(component, new MaterialStockAndSalesUtility());
                    resolve(this.ngbModalRef);
                }, 0);
         //   }
        });
    }

    materialSearchModalRef(component: Component, material: MaterialStockAndSalesUtility): NgbModalRef {
        console.log('zboub');
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.material = material;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true,  queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
