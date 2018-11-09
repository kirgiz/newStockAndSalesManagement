import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MaterialclassificationStockAndSalesUtility } from 'app/shared/model/materialclassification-stock-and-sales-utility.model';
import { MaterialclassificationStockAndSalesUtilityService } from './materialclassification-stock-and-sales-utility.service';
import { MaterialclassificationStockAndSalesUtilityComponent } from './materialclassification-stock-and-sales-utility.component';
import { MaterialclassificationStockAndSalesUtilityDetailComponent } from './materialclassification-stock-and-sales-utility-detail.component';
import { MaterialclassificationStockAndSalesUtilityUpdateComponent } from './materialclassification-stock-and-sales-utility-update.component';
import { MaterialclassificationStockAndSalesUtilityDeletePopupComponent } from './materialclassification-stock-and-sales-utility-delete-dialog.component';
import { IMaterialclassificationStockAndSalesUtility } from 'app/shared/model/materialclassification-stock-and-sales-utility.model';

@Injectable({ providedIn: 'root' })
export class MaterialclassificationStockAndSalesUtilityResolve implements Resolve<IMaterialclassificationStockAndSalesUtility> {
    constructor(private service: MaterialclassificationStockAndSalesUtilityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MaterialclassificationStockAndSalesUtility> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MaterialclassificationStockAndSalesUtility>) => response.ok),
                map((materialclassification: HttpResponse<MaterialclassificationStockAndSalesUtility>) => materialclassification.body)
            );
        }
        return of(new MaterialclassificationStockAndSalesUtility());
    }
}

export const materialclassificationRoute: Routes = [
    {
        path: 'materialclassification-stock-and-sales-utility',
        component: MaterialclassificationStockAndSalesUtilityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.materialclassification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'materialclassification-stock-and-sales-utility/:id/view',
        component: MaterialclassificationStockAndSalesUtilityDetailComponent,
        resolve: {
            materialclassification: MaterialclassificationStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.materialclassification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'materialclassification-stock-and-sales-utility/new',
        component: MaterialclassificationStockAndSalesUtilityUpdateComponent,
        resolve: {
            materialclassification: MaterialclassificationStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.materialclassification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'materialclassification-stock-and-sales-utility/:id/edit',
        component: MaterialclassificationStockAndSalesUtilityUpdateComponent,
        resolve: {
            materialclassification: MaterialclassificationStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.materialclassification.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const materialclassificationPopupRoute: Routes = [
    {
        path: 'materialclassification-stock-and-sales-utility/:id/delete',
        component: MaterialclassificationStockAndSalesUtilityDeletePopupComponent,
        resolve: {
            materialclassification: MaterialclassificationStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.materialclassification.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
