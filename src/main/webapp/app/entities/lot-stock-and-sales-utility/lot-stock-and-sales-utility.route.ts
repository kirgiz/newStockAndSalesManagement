import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LotStockAndSalesUtility } from 'app/shared/model/lot-stock-and-sales-utility.model';
import { LotStockAndSalesUtilityService } from './lot-stock-and-sales-utility.service';
import { LotStockAndSalesUtilityComponent } from './lot-stock-and-sales-utility.component';
import { LotStockAndSalesUtilityDetailComponent } from './lot-stock-and-sales-utility-detail.component';
import { LotStockAndSalesUtilityUpdateComponent } from './lot-stock-and-sales-utility-update.component';
import { LotStockAndSalesUtilityDeletePopupComponent } from './lot-stock-and-sales-utility-delete-dialog.component';
import { ILotStockAndSalesUtility } from 'app/shared/model/lot-stock-and-sales-utility.model';

@Injectable({ providedIn: 'root' })
export class LotStockAndSalesUtilityResolve implements Resolve<ILotStockAndSalesUtility> {
    constructor(private service: LotStockAndSalesUtilityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LotStockAndSalesUtility> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<LotStockAndSalesUtility>) => response.ok),
                map((lot: HttpResponse<LotStockAndSalesUtility>) => lot.body)
            );
        }
        return of(new LotStockAndSalesUtility());
    }
}

export const lotRoute: Routes = [
    {
        path: 'lot-stock-and-sales-utility',
        component: LotStockAndSalesUtilityComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'stockAndSalesManagementApp.lot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lot-stock-and-sales-utility/:id/view',
        component: LotStockAndSalesUtilityDetailComponent,
        resolve: {
            lot: LotStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.lot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lot-stock-and-sales-utility/new',
        component: LotStockAndSalesUtilityUpdateComponent,
        resolve: {
            lot: LotStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.lot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lot-stock-and-sales-utility/:id/edit',
        component: LotStockAndSalesUtilityUpdateComponent,
        resolve: {
            lot: LotStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.lot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lotPopupRoute: Routes = [
    {
        path: 'lot-stock-and-sales-utility/:id/delete',
        component: LotStockAndSalesUtilityDeletePopupComponent,
        resolve: {
            lot: LotStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.lot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
