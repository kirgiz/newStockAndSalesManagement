import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ForexratesStockAndSalesUtilityComponent } from './forexrates-stock-and-sales-utility.component';
import { ForexratesStockAndSalesUtilityDetailComponent } from './forexrates-stock-and-sales-utility-detail.component';
import { ForexratesStockAndSalesUtilityPopupComponent } from './forexrates-stock-and-sales-utility-dialog.component';
import {
    ForexratesStockAndSalesUtilityDeletePopupComponent
} from './forexrates-stock-and-sales-utility-delete-dialog.component';

export const forexratesRoute: Routes = [
    {
        path: 'forexrates-stock-and-sales-utility',
        component: ForexratesStockAndSalesUtilityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.forexrates.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'forexrates-stock-and-sales-utility/:id',
        component: ForexratesStockAndSalesUtilityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.forexrates.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const forexratesPopupRoute: Routes = [
    {
        path: 'forexrates-stock-and-sales-utility-new',
        component: ForexratesStockAndSalesUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.forexrates.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'forexrates-stock-and-sales-utility/:id/edit',
        component: ForexratesStockAndSalesUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.forexrates.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'forexrates-stock-and-sales-utility/:id/delete',
        component: ForexratesStockAndSalesUtilityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.forexrates.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
