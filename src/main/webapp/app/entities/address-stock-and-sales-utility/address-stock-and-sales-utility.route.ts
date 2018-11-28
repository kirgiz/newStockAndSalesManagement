import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AddressStockAndSalesUtility } from 'app/shared/model/address-stock-and-sales-utility.model';
import { AddressStockAndSalesUtilityService } from './address-stock-and-sales-utility.service';
import { AddressStockAndSalesUtilityComponent } from './address-stock-and-sales-utility.component';
import { AddressStockAndSalesUtilityDetailComponent } from './address-stock-and-sales-utility-detail.component';
import { AddressStockAndSalesUtilityUpdateComponent } from './address-stock-and-sales-utility-update.component';
import { AddressStockAndSalesUtilityDeletePopupComponent } from './address-stock-and-sales-utility-delete-dialog.component';
import { IAddressStockAndSalesUtility } from 'app/shared/model/address-stock-and-sales-utility.model';

@Injectable({ providedIn: 'root' })
export class AddressStockAndSalesUtilityResolve implements Resolve<IAddressStockAndSalesUtility> {
    constructor(private service: AddressStockAndSalesUtilityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AddressStockAndSalesUtility> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AddressStockAndSalesUtility>) => response.ok),
                map((address: HttpResponse<AddressStockAndSalesUtility>) => address.body)
            );
        }
        return of(new AddressStockAndSalesUtility());
    }
}

export const addressRoute: Routes = [
    {
        path: 'address-stock-and-sales-utility',
        component: AddressStockAndSalesUtilityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-stock-and-sales-utility/:id/view',
        component: AddressStockAndSalesUtilityDetailComponent,
        resolve: {
            address: AddressStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-stock-and-sales-utility/new',
        component: AddressStockAndSalesUtilityUpdateComponent,
        resolve: {
            address: AddressStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-stock-and-sales-utility/:id/edit',
        component: AddressStockAndSalesUtilityUpdateComponent,
        resolve: {
            address: AddressStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const addressPopupRoute: Routes = [
    {
        path: 'address-stock-and-sales-utility/:id/delete',
        component: AddressStockAndSalesUtilityDeletePopupComponent,
        resolve: {
            address: AddressStockAndSalesUtilityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.address.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
