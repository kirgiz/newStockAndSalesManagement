import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MaterialhistoryStockAndSalesUtilityComponent } from './materialhistory-stock-and-sales-utility.component';
import { MaterialhistoryStockAndSalesUtilityDetailComponent } from './materialhistory-stock-and-sales-utility-detail.component';
import { MaterialhistoryStockAndSalesUtilityPopupComponent } from './materialhistory-stock-and-sales-utility-dialog.component';
import {
    MaterialhistoryStockAndSalesUtilityDeletePopupComponent
} from './materialhistory-stock-and-sales-utility-delete-dialog.component';
import { MaterialSearchStockAndSalesUtilityComponent } from './material-search-stock-and-sales-utility.component';
import { MaterialSearchStockAndSalesUtilityPopupComponent } from './material-search-stock-and-sales-utility-dialog.component';

@Injectable()
export class MaterialhistoryStockAndSalesUtilityResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

@Injectable()
export class MaterialSearchStockAndSalesUtilityResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const materialhistoryRoute: Routes = [
    {
        path: 'materialhistory-stock-and-sales-utility',
        component: MaterialhistoryStockAndSalesUtilityComponent,
        resolve: {
            'pagingParams': MaterialhistoryStockAndSalesUtilityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.materialhistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'materialhistory-stock-and-sales-utility/:id',
        component: MaterialhistoryStockAndSalesUtilityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.materialhistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const materialSearchRoute: Routes = [
    {
        path: 'material-search-stock-and-sales-utility-nopopup',
        component: MaterialSearchStockAndSalesUtilityComponent,
        resolve: {
            'pagingParams': MaterialSearchStockAndSalesUtilityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.material.home.title'
        },
        canActivate: [UserRouteAccessService],
    }];

    export const materialSearchPopupRoute: Routes = [
        {
            path: 'material-search-stock-and-sales-utility-popup',
            component: MaterialSearchStockAndSalesUtilityPopupComponent,
            resolve: {
                'pagingParams': MaterialSearchStockAndSalesUtilityResolvePagingParams
            },
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'stockAndSalesManagementApp.material.home.title'
            },
            canActivate: [UserRouteAccessService],
            outlet: 'popup'
        }];

export const materialhistoryPopupRoute: Routes = [
    {
        path: 'materialhistory-stock-and-sales-utility-new',
        component: MaterialhistoryStockAndSalesUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.materialhistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'materialhistory-stock-and-sales-utility/:id/edit',
        component: MaterialhistoryStockAndSalesUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.materialhistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'materialhistory-stock-and-sales-utility/:id/delete',
        component: MaterialhistoryStockAndSalesUtilityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.materialhistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
