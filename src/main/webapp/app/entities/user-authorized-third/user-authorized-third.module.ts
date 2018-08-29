import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockAndSalesManagementSharedModule } from '../../shared';
import { StockAndSalesManagementAdminModule } from '../../admin/admin.module';
import {
    UserAuthorizedThirdService,
    UserAuthorizedThirdPopupService,
    UserAuthorizedThirdComponent,
    UserAuthorizedThirdDetailComponent,
    UserAuthorizedThirdDialogComponent,
    UserAuthorizedThirdPopupComponent,
    UserAuthorizedThirdDeletePopupComponent,
    UserAuthorizedThirdDeleteDialogComponent,
    userAuthorizedThirdRoute,
    userAuthorizedThirdPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userAuthorizedThirdRoute,
    ...userAuthorizedThirdPopupRoute,
];

@NgModule({
    imports: [
        StockAndSalesManagementSharedModule,
        StockAndSalesManagementAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserAuthorizedThirdComponent,
        UserAuthorizedThirdDetailComponent,
        UserAuthorizedThirdDialogComponent,
        UserAuthorizedThirdDeleteDialogComponent,
        UserAuthorizedThirdPopupComponent,
        UserAuthorizedThirdDeletePopupComponent,
    ],
    entryComponents: [
        UserAuthorizedThirdComponent,
        UserAuthorizedThirdDialogComponent,
        UserAuthorizedThirdPopupComponent,
        UserAuthorizedThirdDeleteDialogComponent,
        UserAuthorizedThirdDeletePopupComponent,
    ],
    providers: [
        UserAuthorizedThirdService,
        UserAuthorizedThirdPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockAndSalesManagementUserAuthorizedThirdModule {}
