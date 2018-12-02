import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs'; // , of
import { filter, map } from 'rxjs/operators';
import { MaterialhistoryStockAndSalesUtility } from 'app/shared/model/materialhistory-stock-and-sales-utility.model';
import { MaterialhistoryStockAndSalesUtilityService } from './materialhistory-stock-and-sales-utility.service';
import { MaterialhistoryStockAndSalesUtilityComponent } from './materialhistory-stock-and-sales-utility.component';
import { MaterialhistoryStockAndSalesUtilityDetailComponent } from './materialhistory-stock-and-sales-utility-detail.component';
import { MaterialhistoryStockAndSalesUtilityPopupComponent } from './materialhistory-stock-and-sales-utility-dialog.component';
import { MaterialSearchStockAndSalesUtilityComponent } from './material-search-stock-and-sales-utility.component';
import { MaterialSearchStockAndSalesUtilityPopupComponent } from './material-search-stock-and-sales-utility-dialog.component';
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
        console.log('dgdfsgdsgdfgdfgdffgdfgdfgdfgdfgf');
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
            pagingParams: MaterialhistoryStockAndSalesUtilityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.materialhistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'materialhistory-stock-and-sales-utility/:id',
        component: MaterialhistoryStockAndSalesUtilityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
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
export const materialSearchRoute: Routes = [
    {
        path: 'material-search-stock-and-sales-utility-nopopup',
        component: MaterialSearchStockAndSalesUtilityComponent,
        resolve: {
            pagingParams: MaterialSearchStockAndSalesUtilityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.material.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const materialSearchPopupRoute: Routes = [
    /* {
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
    }*/
    {
        path: 'material-search-stock-and-sales-utility-popup',
        component: MaterialSearchStockAndSalesUtilityPopupComponent,
        resolve: {
            pagingParams: MaterialSearchStockAndSalesUtilityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.material.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

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
    /* {
        path: 'materialhistory-stock-and-sales-utility/:id/edit',
        component: MaterialhistoryStockAndSalesUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.materialhistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },*/
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

/*export const materialhistoryRoute: Routes = [
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
*/
