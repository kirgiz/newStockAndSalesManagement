import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CountryStockAndSalesUtility } from 'app/shared/model/country-stock-and-sales-utility.model';
import { CountryStockAndSalesUtilityService } from './country-stock-and-sales-utility.service';
import { CountryStockAndSalesUtilityComponent } from './country-stock-and-sales-utility.component';
import { CountryStockAndSalesUtilityDetailComponent } from './country-stock-and-sales-utility-detail.component';
import { CountryStockAndSalesUtilityUpdateComponent } from './country-stock-and-sales-utility-update.component';
import { CountryStockAndSalesUtilityDeletePopupComponent } from './country-stock-and-sales-utility-delete-dialog.component';
import { ICountryStockAndSalesUtility } from 'app/shared/model/country-stock-and-sales-utility.model';

@Injectable({ providedIn: 'root' })
export class CountryStockAndSalesUtilityResolve implements Resolve<ICountryStockAndSalesUtility> {
    constructor(private service: CountryStockAndSalesUtilityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CountryStockAndSalesUtility> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CountryStockAndSalesUtility>) => response.ok),
                map((country: HttpResponse<CountryStockAndSalesUtility>) => country.body)
            );
        }
        return of(new CountryStockAndSalesUtility());
    }
}

export const countryRoute: Routes = [
    {
        path: 'country-stock-and-sales-utility',
        component: CountryStockAndSalesUtilityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'country-stock-and-sales-utility/:id/view',
        component: CountryStockAndSalesUtilityDetailComponent,
        resolve: {
            country: CountryStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'country-stock-and-sales-utility/new',
        component: CountryStockAndSalesUtilityUpdateComponent,
        resolve: {
            country: CountryStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'country-stock-and-sales-utility/:id/edit',
        component: CountryStockAndSalesUtilityUpdateComponent,
        resolve: {
            country: CountryStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const countryPopupRoute: Routes = [
    {
        path: 'country-stock-and-sales-utility/:id/delete',
        component: CountryStockAndSalesUtilityDeletePopupComponent,
        resolve: {
            country: CountryStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
