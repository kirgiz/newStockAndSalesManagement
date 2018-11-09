import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserAuthorizedThird } from 'app/shared/model/user-authorized-third.model';
import { UserAuthorizedThirdService } from './user-authorized-third.service';
import { UserAuthorizedThirdComponent } from './user-authorized-third.component';
import { UserAuthorizedThirdDetailComponent } from './user-authorized-third-detail.component';
import { UserAuthorizedThirdUpdateComponent } from './user-authorized-third-update.component';
import { UserAuthorizedThirdDeletePopupComponent } from './user-authorized-third-delete-dialog.component';
import { IUserAuthorizedThird } from 'app/shared/model/user-authorized-third.model';

@Injectable({ providedIn: 'root' })
export class UserAuthorizedThirdResolve implements Resolve<IUserAuthorizedThird> {
    constructor(private service: UserAuthorizedThirdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserAuthorizedThird> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<UserAuthorizedThird>) => response.ok),
                map((userAuthorizedThird: HttpResponse<UserAuthorizedThird>) => userAuthorizedThird.body)
            );
        }
        return of(new UserAuthorizedThird());
    }
}

export const userAuthorizedThirdRoute: Routes = [
    {
        path: 'user-authorized-third',
        component: UserAuthorizedThirdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.userAuthorizedThird.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-authorized-third/:id/view',
        component: UserAuthorizedThirdDetailComponent,
        resolve: {
            userAuthorizedThird: UserAuthorizedThirdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.userAuthorizedThird.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-authorized-third/new',
        component: UserAuthorizedThirdUpdateComponent,
        resolve: {
            userAuthorizedThird: UserAuthorizedThirdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.userAuthorizedThird.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-authorized-third/:id/edit',
        component: UserAuthorizedThirdUpdateComponent,
        resolve: {
            userAuthorizedThird: UserAuthorizedThirdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.userAuthorizedThird.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userAuthorizedThirdPopupRoute: Routes = [
    {
        path: 'user-authorized-third/:id/delete',
        component: UserAuthorizedThirdDeletePopupComponent,
        resolve: {
            userAuthorizedThird: UserAuthorizedThirdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockAndSalesManagementApp.userAuthorizedThird.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
