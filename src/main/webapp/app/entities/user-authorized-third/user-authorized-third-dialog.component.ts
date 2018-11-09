import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserAuthorizedThird } from './user-authorized-third.model';
import { UserAuthorizedThirdPopupService } from './user-authorized-third-popup.service';
import { UserAuthorizedThirdService } from './user-authorized-third.service';
import { User, UserService } from '../../shared';
import { ThirdStockAndSalesUtility, ThirdStockAndSalesUtilityService } from '../third-stock-and-sales-utility';

@Component({
    selector: 'jhi-user-authorized-third-dialog',
    templateUrl: './user-authorized-third-dialog.component.html'
})
export class UserAuthorizedThirdDialogComponent implements OnInit {

    userAuthorizedThird: UserAuthorizedThird;
    isSaving: boolean;

    users: User[];

    thirds: ThirdStockAndSalesUtility[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userAuthorizedThirdService: UserAuthorizedThirdService,
        private userService: UserService,
        private thirdService: ThirdStockAndSalesUtilityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.thirdService.query()
            .subscribe((res: HttpResponse<ThirdStockAndSalesUtility[]>) => { this.thirds = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userAuthorizedThird.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userAuthorizedThirdService.update(this.userAuthorizedThird));
        } else {
            this.subscribeToSaveResponse(
                this.userAuthorizedThirdService.create(this.userAuthorizedThird));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserAuthorizedThird>>) {
        result.subscribe((res: HttpResponse<UserAuthorizedThird>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserAuthorizedThird) {
        this.eventManager.broadcast({ name: 'userAuthorizedThirdListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackThirdById(index: number, item: ThirdStockAndSalesUtility) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-user-authorized-third-popup',
    template: ''
})
export class UserAuthorizedThirdPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userAuthorizedThirdPopupService: UserAuthorizedThirdPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userAuthorizedThirdPopupService
                    .open(UserAuthorizedThirdDialogComponent as Component, params['id']);
            } else {
                this.userAuthorizedThirdPopupService
                    .open(UserAuthorizedThirdDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
