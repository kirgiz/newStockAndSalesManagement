import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CurrencyStockAndSalesUtility } from 'app/shared/model/currency-stock-and-sales-utility.model';
import { CurrencyStockAndSalesUtilityService } from './currency-stock-and-sales-utility.service';
import { CurrencyStockAndSalesUtilityComponent } from './currency-stock-and-sales-utility.component';
import { CurrencyStockAndSalesUtilityDetailComponent } from './currency-stock-and-sales-utility-detail.component';
import { CurrencyStockAndSalesUtilityUpdateComponent } from './currency-stock-and-sales-utility-update.component';
import { CurrencyStockAndSalesUtilityDeletePopupComponent } from './currency-stock-and-sales-utility-delete-dialog.component';
import { ICurrencyStockAndSalesUtility } from 'app/shared/model/currency-stock-and-sales-utility.model';

@Injectable({ providedIn: 'root' })
export class CurrencyStockAndSalesUtilityResolve implements Resolve<ICurrencyStockAndSalesUtility> {
    constructor(private service: CurrencyStockAndSalesUtilityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CurrencyStockAndSalesUtility> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CurrencyStockAndSalesUtility>) => response.ok),
                map((currency: HttpResponse<CurrencyStockAndSalesUtility>) => currency.body)
            );
        }
        return of(new CurrencyStockAndSalesUtility());
    }
}

export const currencyRoute: Routes = [
    {
        path: 'currency-stock-and-sales-utility',
        component: CurrencyStockAndSalesUtilityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'currency-stock-and-sales-utility/:id/view',
        component: CurrencyStockAndSalesUtilityDetailComponent,
        resolve: {
            currency: CurrencyStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'currency-stock-and-sales-utility/new',
        component: CurrencyStockAndSalesUtilityUpdateComponent,
        resolve: {
            currency: CurrencyStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'currency-stock-and-sales-utility/:id/edit',
        component: CurrencyStockAndSalesUtilityUpdateComponent,
        resolve: {
            currency: CurrencyStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const currencyPopupRoute: Routes = [
    {
        path: 'currency-stock-and-sales-utility/:id/delete',
        component: CurrencyStockAndSalesUtilityDeletePopupComponent,
        resolve: {
            currency: CurrencyStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
