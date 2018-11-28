import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TransferclassificationStockAndSalesUtility } from 'app/shared/model/transferclassification-stock-and-sales-utility.model';
import { TransferclassificationStockAndSalesUtilityService } from './transferclassification-stock-and-sales-utility.service';
import { TransferclassificationStockAndSalesUtilityComponent } from './transferclassification-stock-and-sales-utility.component';
import { TransferclassificationStockAndSalesUtilityDetailComponent } from './transferclassification-stock-and-sales-utility-detail.component';
import { TransferclassificationStockAndSalesUtilityUpdateComponent } from './transferclassification-stock-and-sales-utility-update.component';
import { TransferclassificationStockAndSalesUtilityDeletePopupComponent } from './transferclassification-stock-and-sales-utility-delete-dialog.component';
import { ITransferclassificationStockAndSalesUtility } from 'app/shared/model/transferclassification-stock-and-sales-utility.model';

@Injectable({ providedIn: 'root' })
export class TransferclassificationStockAndSalesUtilityResolve implements Resolve<ITransferclassificationStockAndSalesUtility> {
    constructor(private service: TransferclassificationStockAndSalesUtilityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TransferclassificationStockAndSalesUtility> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TransferclassificationStockAndSalesUtility>) => response.ok),
                map((transferclassification: HttpResponse<TransferclassificationStockAndSalesUtility>) => transferclassification.body)
            );
        }
        return of(new TransferclassificationStockAndSalesUtility());
    }
}

export const transferclassificationRoute: Routes = [
    {
        path: 'transferclassification-stock-and-sales-utility',
        component: TransferclassificationStockAndSalesUtilityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.transferclassification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transferclassification-stock-and-sales-utility/:id/view',
        component: TransferclassificationStockAndSalesUtilityDetailComponent,
        resolve: {
            transferclassification: TransferclassificationStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.transferclassification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transferclassification-stock-and-sales-utility/new',
        component: TransferclassificationStockAndSalesUtilityUpdateComponent,
        resolve: {
            transferclassification: TransferclassificationStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.transferclassification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transferclassification-stock-and-sales-utility/:id/edit',
        component: TransferclassificationStockAndSalesUtilityUpdateComponent,
        resolve: {
            transferclassification: TransferclassificationStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.transferclassification.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transferclassificationPopupRoute: Routes = [
    {
        path: 'transferclassification-stock-and-sales-utility/:id/delete',
        component: TransferclassificationStockAndSalesUtilityDeletePopupComponent,
        resolve: {
            transferclassification: TransferclassificationStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.transferclassification.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
