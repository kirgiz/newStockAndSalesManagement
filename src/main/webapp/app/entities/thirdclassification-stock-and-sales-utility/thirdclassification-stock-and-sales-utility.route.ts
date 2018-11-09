import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ThirdclassificationStockAndSalesUtility } from 'app/shared/model/thirdclassification-stock-and-sales-utility.model';
import { ThirdclassificationStockAndSalesUtilityService } from './thirdclassification-stock-and-sales-utility.service';
import { ThirdclassificationStockAndSalesUtilityComponent } from './thirdclassification-stock-and-sales-utility.component';
import { ThirdclassificationStockAndSalesUtilityDetailComponent } from './thirdclassification-stock-and-sales-utility-detail.component';
import { ThirdclassificationStockAndSalesUtilityUpdateComponent } from './thirdclassification-stock-and-sales-utility-update.component';
import { ThirdclassificationStockAndSalesUtilityDeletePopupComponent } from './thirdclassification-stock-and-sales-utility-delete-dialog.component';
import { IThirdclassificationStockAndSalesUtility } from 'app/shared/model/thirdclassification-stock-and-sales-utility.model';

@Injectable({ providedIn: 'root' })
export class ThirdclassificationStockAndSalesUtilityResolve implements Resolve<IThirdclassificationStockAndSalesUtility> {
    constructor(private service: ThirdclassificationStockAndSalesUtilityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ThirdclassificationStockAndSalesUtility> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ThirdclassificationStockAndSalesUtility>) => response.ok),
                map((thirdclassification: HttpResponse<ThirdclassificationStockAndSalesUtility>) => thirdclassification.body)
            );
        }
        return of(new ThirdclassificationStockAndSalesUtility());
    }
}

export const thirdclassificationRoute: Routes = [
    {
        path: 'thirdclassification-stock-and-sales-utility',
        component: ThirdclassificationStockAndSalesUtilityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.thirdclassification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thirdclassification-stock-and-sales-utility/:id/view',
        component: ThirdclassificationStockAndSalesUtilityDetailComponent,
        resolve: {
            thirdclassification: ThirdclassificationStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.thirdclassification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thirdclassification-stock-and-sales-utility/new',
        component: ThirdclassificationStockAndSalesUtilityUpdateComponent,
        resolve: {
            thirdclassification: ThirdclassificationStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.thirdclassification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thirdclassification-stock-and-sales-utility/:id/edit',
        component: ThirdclassificationStockAndSalesUtilityUpdateComponent,
        resolve: {
            thirdclassification: ThirdclassificationStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.thirdclassification.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const thirdclassificationPopupRoute: Routes = [
    {
        path: 'thirdclassification-stock-and-sales-utility/:id/delete',
        component: ThirdclassificationStockAndSalesUtilityDeletePopupComponent,
        resolve: {
            thirdclassification: ThirdclassificationStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.thirdclassification.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
