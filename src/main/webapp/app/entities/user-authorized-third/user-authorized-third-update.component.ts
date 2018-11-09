import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUserAuthorizedThird } from 'app/shared/model/user-authorized-third.model';
import { UserAuthorizedThirdService } from './user-authorized-third.service';
import { IUser, UserService } from 'app/core';
import { IThirdStockAndSalesUtility } from 'app/shared/model/third-stock-and-sales-utility.model';
import { ThirdStockAndSalesUtilityService } from 'app/entities/third-stock-and-sales-utility';

@Component({
    selector: 'jhi-user-authorized-third-update',
    templateUrl: './user-authorized-third-update.component.html'
})
export class UserAuthorizedThirdUpdateComponent implements OnInit {
    userAuthorizedThird: IUserAuthorizedThird;
    isSaving: boolean;

    users: IUser[];

    thirds: IThirdStockAndSalesUtility[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private userAuthorizedThirdService: UserAuthorizedThirdService,
        private userService: UserService,
        private thirdService: ThirdStockAndSalesUtilityService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userAuthorizedThird }) => {
            this.userAuthorizedThird = userAuthorizedThird;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.thirdService.query().subscribe(
            (res: HttpResponse<IThirdStockAndSalesUtility[]>) => {
                this.thirds = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.userAuthorizedThird.id !== undefined) {
            this.subscribeToSaveResponse(this.userAuthorizedThirdService.update(this.userAuthorizedThird));
        } else {
            this.subscribeToSaveResponse(this.userAuthorizedThirdService.create(this.userAuthorizedThird));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUserAuthorizedThird>>) {
        result.subscribe((res: HttpResponse<IUserAuthorizedThird>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackThirdById(index: number, item: IThirdStockAndSalesUtility) {
        return item.id;
    }
}
