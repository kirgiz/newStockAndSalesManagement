import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ForexratesStockAndSalesUtility } from 'app/shared/model/forexrates-stock-and-sales-utility.model';
import { ForexratesStockAndSalesUtilityService } from './forexrates-stock-and-sales-utility.service';
import { ForexratesStockAndSalesUtilityComponent } from './forexrates-stock-and-sales-utility.component';
import { ForexratesStockAndSalesUtilityDetailComponent } from './forexrates-stock-and-sales-utility-detail.component';
import { ForexratesStockAndSalesUtilityUpdateComponent } from './forexrates-stock-and-sales-utility-update.component';
import { ForexratesStockAndSalesUtilityDeletePopupComponent } from './forexrates-stock-and-sales-utility-delete-dialog.component';
import { IForexratesStockAndSalesUtility } from 'app/shared/model/forexrates-stock-and-sales-utility.model';

@Injectable({ providedIn: 'root' })
export class ForexratesStockAndSalesUtilityResolve implements Resolve<IForexratesStockAndSalesUtility> {
    constructor(private service: ForexratesStockAndSalesUtilityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ForexratesStockAndSalesUtility> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ForexratesStockAndSalesUtility>) => response.ok),
                map((forexrates: HttpResponse<ForexratesStockAndSalesUtility>) => forexrates.body)
            );
        }
        return of(new ForexratesStockAndSalesUtility());
    }
}

export const forexratesRoute: Routes = [
    {
        path: 'forexrates-stock-and-sales-utility',
        component: ForexratesStockAndSalesUtilityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.forexrates.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'forexrates-stock-and-sales-utility/:id/view',
        component: ForexratesStockAndSalesUtilityDetailComponent,
        resolve: {
            forexrates: ForexratesStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.forexrates.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'forexrates-stock-and-sales-utility/new',
        component: ForexratesStockAndSalesUtilityUpdateComponent,
        resolve: {
            forexrates: ForexratesStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.forexrates.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'forexrates-stock-and-sales-utility/:id/edit',
        component: ForexratesStockAndSalesUtilityUpdateComponent,
        resolve: {
            forexrates: ForexratesStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.forexrates.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const forexratesPopupRoute: Routes = [
    {
        path: 'forexrates-stock-and-sales-utility/:id/delete',
        component: ForexratesStockAndSalesUtilityDeletePopupComponent,
        resolve: {
            forexrates: ForexratesStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.forexrates.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
