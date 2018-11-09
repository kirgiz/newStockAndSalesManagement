import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MaterialhistoryStockAndSalesUtility } from 'app/shared/model/materialhistory-stock-and-sales-utility.model';
import { MaterialhistoryStockAndSalesUtilityService } from './materialhistory-stock-and-sales-utility.service';
import { MaterialhistoryStockAndSalesUtilityComponent } from './materialhistory-stock-and-sales-utility.component';
import { MaterialhistoryStockAndSalesUtilityDetailComponent } from './materialhistory-stock-and-sales-utility-detail.component';
import { MaterialhistoryStockAndSalesUtilityUpdateComponent } from './materialhistory-stock-and-sales-utility-update.component';
import { MaterialhistoryStockAndSalesUtilityDeletePopupComponent } from './materialhistory-stock-and-sales-utility-delete-dialog.component';
import { IMaterialhistoryStockAndSalesUtility } from 'app/shared/model/materialhistory-stock-and-sales-utility.model';

@Injectable({ providedIn: 'root' })
export class MaterialhistoryStockAndSalesUtilityResolve implements Resolve<IMaterialhistoryStockAndSalesUtility> {
    constructor(private service: MaterialhistoryStockAndSalesUtilityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MaterialhistoryStockAndSalesUtility> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MaterialhistoryStockAndSalesUtility>) => response.ok),
                map((materialhistory: HttpResponse<MaterialhistoryStockAndSalesUtility>) => materialhistory.body)
            );
        }
        return of(new MaterialhistoryStockAndSalesUtility());
    }
}

export const materialhistoryRoute: Routes = [
    {
        path: 'materialhistory-stock-and-sales-utility',
        component: MaterialhistoryStockAndSalesUtilityComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'stockAndSalesManagementApp.materialhistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'materialhistory-stock-and-sales-utility/:id/view',
        component: MaterialhistoryStockAndSalesUtilityDetailComponent,
        resolve: {
            materialhistory: MaterialhistoryStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.materialhistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'materialhistory-stock-and-sales-utility/new',
        component: MaterialhistoryStockAndSalesUtilityUpdateComponent,
        resolve: {
            materialhistory: MaterialhistoryStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.materialhistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'materialhistory-stock-and-sales-utility/:id/edit',
        component: MaterialhistoryStockAndSalesUtilityUpdateComponent,
        resolve: {
            materialhistory: MaterialhistoryStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.materialhistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const materialhistoryPopupRoute: Routes = [
    {
        path: 'materialhistory-stock-and-sales-utility/:id/delete',
        component: MaterialhistoryStockAndSalesUtilityDeletePopupComponent,
        resolve: {
            materialhistory: MaterialhistoryStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.materialhistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
