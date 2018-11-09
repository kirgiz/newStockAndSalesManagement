import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DashboardStockAndSalesUtility } from 'app/shared/model/dashboard-stock-and-sales-utility.model';
import { DashboardStockAndSalesUtilityService } from './dashboard-stock-and-sales-utility.service';
import { DashboardStockAndSalesUtilityComponent } from './dashboard-stock-and-sales-utility.component';
import { DashboardStockAndSalesUtilityDetailComponent } from './dashboard-stock-and-sales-utility-detail.component';
import { DashboardStockAndSalesUtilityUpdateComponent } from './dashboard-stock-and-sales-utility-update.component';
import { DashboardStockAndSalesUtilityDeletePopupComponent } from './dashboard-stock-and-sales-utility-delete-dialog.component';
import { IDashboardStockAndSalesUtility } from 'app/shared/model/dashboard-stock-and-sales-utility.model';

@Injectable({ providedIn: 'root' })
export class DashboardStockAndSalesUtilityResolve implements Resolve<IDashboardStockAndSalesUtility> {
    constructor(private service: DashboardStockAndSalesUtilityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DashboardStockAndSalesUtility> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DashboardStockAndSalesUtility>) => response.ok),
                map((dashboard: HttpResponse<DashboardStockAndSalesUtility>) => dashboard.body)
            );
        }
        return of(new DashboardStockAndSalesUtility());
    }
}

export const dashboardRoute: Routes = [
    {
        path: 'dashboard-stock-and-sales-utility',
        component: DashboardStockAndSalesUtilityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.dashboard.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dashboard-stock-and-sales-utility/:id/view',
        component: DashboardStockAndSalesUtilityDetailComponent,
        resolve: {
            dashboard: DashboardStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.dashboard.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dashboard-stock-and-sales-utility/new',
        component: DashboardStockAndSalesUtilityUpdateComponent,
        resolve: {
            dashboard: DashboardStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.dashboard.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dashboard-stock-and-sales-utility/:id/edit',
        component: DashboardStockAndSalesUtilityUpdateComponent,
        resolve: {
            dashboard: DashboardStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.dashboard.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dashboardPopupRoute: Routes = [
    {
        path: 'dashboard-stock-and-sales-utility/:id/delete',
        component: DashboardStockAndSalesUtilityDeletePopupComponent,
        resolve: {
            dashboard: DashboardStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.dashboard.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
