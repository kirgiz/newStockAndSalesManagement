import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MaterialStockAndSalesUtility } from 'app/shared/model/material-stock-and-sales-utility.model';
import { MaterialStockAndSalesUtilityService } from './material-stock-and-sales-utility.service';
import { MaterialStockAndSalesUtilityComponent } from './material-stock-and-sales-utility.component';
import { MaterialStockAndSalesUtilityDetailComponent } from './material-stock-and-sales-utility-detail.component';
import { MaterialStockAndSalesUtilityUpdateComponent } from './material-stock-and-sales-utility-update.component';
import { MaterialStockAndSalesUtilityDeletePopupComponent } from './material-stock-and-sales-utility-delete-dialog.component';
import { IMaterialStockAndSalesUtility } from 'app/shared/model/material-stock-and-sales-utility.model';

@Injectable({ providedIn: 'root' })
export class MaterialStockAndSalesUtilityResolve implements Resolve<IMaterialStockAndSalesUtility> {
    constructor(private service: MaterialStockAndSalesUtilityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MaterialStockAndSalesUtility> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MaterialStockAndSalesUtility>) => response.ok),
                map((material: HttpResponse<MaterialStockAndSalesUtility>) => material.body)
            );
        }
        return of(new MaterialStockAndSalesUtility());
    }
}

export const materialRoute: Routes = [
    {
        path: 'material-stock-and-sales-utility',
        component: MaterialStockAndSalesUtilityComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'stockAndSalesManagementApp.material.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'material-stock-and-sales-utility/:id/view',
        component: MaterialStockAndSalesUtilityDetailComponent,
        resolve: {
            material: MaterialStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.material.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'material-stock-and-sales-utility/new',
        component: MaterialStockAndSalesUtilityUpdateComponent,
        resolve: {
            material: MaterialStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.material.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'material-stock-and-sales-utility/:id/edit',
        component: MaterialStockAndSalesUtilityUpdateComponent,
        resolve: {
            material: MaterialStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.material.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const materialPopupRoute: Routes = [
    {
        path: 'material-stock-and-sales-utility/:id/delete',
        component: MaterialStockAndSalesUtilityDeletePopupComponent,
        resolve: {
            material: MaterialStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.material.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
