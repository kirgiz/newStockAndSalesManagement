import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from 'app/shared';
import { StockAndSalesManagementAdminModule } from 'app/admin/admin.module';
import {
    UserAuthorizedThirdComponent,
    UserAuthorizedThirdDetailComponent,
    UserAuthorizedThirdUpdateComponent,
    UserAuthorizedThirdDeletePopupComponent,
    UserAuthorizedThirdDeleteDialogComponent,
    userAuthorizedThirdRoute,
    userAuthorizedThirdPopupRoute
} from './';

const ENTITY_STATES = [...userAuthorizedThirdRoute, ...userAuthorizedThirdPopupRoute];

@NgModule({
    imports: [StockAndSalesManagementSharedModule, StockAndSalesManagementAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserAuthorizedThirdComponent,
        UserAuthorizedThirdDetailComponent,
        UserAuthorizedThirdUpdateComponent,
        UserAuthorizedThirdDeleteDialogComponent,
        UserAuthorizedThirdDeletePopupComponent
    ],
    entryComponents: [
        UserAuthorizedThirdComponent,
        UserAuthorizedThirdUpdateComponent,
        UserAuthorizedThirdDeleteDialogComponent,
        UserAuthorizedThirdDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementUserAuthorizedThirdModule {}
