import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UserAuthorizedThirdComponent } from './user-authorized-third.component';
import { UserAuthorizedThirdDetailComponent } from './user-authorized-third-detail.component';
import { UserAuthorizedThirdPopupComponent } from './user-authorized-third-dialog.component';
import { UserAuthorizedThirdDeletePopupComponent } from './user-authorized-third-delete-dialog.component';

export const userAuthorizedThirdRoute: Routes = [
    {
        path: 'user-authorized-third',
        component: UserAuthorizedThirdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.userAuthorizedThird.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-authorized-third/:id',
        component: UserAuthorizedThirdDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.userAuthorizedThird.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userAuthorizedThirdPopupRoute: Routes = [
    {
        path: 'user-authorized-third-new',
        component: UserAuthorizedThirdPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.userAuthorizedThird.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-authorized-third/:id/edit',
        component: UserAuthorizedThirdPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.userAuthorizedThird.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-authorized-third/:id/delete',
        component: UserAuthorizedThirdDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.userAuthorizedThird.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
