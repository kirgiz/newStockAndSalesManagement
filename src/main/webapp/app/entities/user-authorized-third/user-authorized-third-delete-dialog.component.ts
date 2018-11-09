import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserAuthorizedThird } from './user-authorized-third.model';
import { UserAuthorizedThirdPopupService } from './user-authorized-third-popup.service';
import { UserAuthorizedThirdService } from './user-authorized-third.service';

@Component({
    selector: 'jhi-user-authorized-third-delete-dialog',
    templateUrl: './user-authorized-third-delete-dialog.component.html'
})
export class UserAuthorizedThirdDeleteDialogComponent {

    userAuthorizedThird: UserAuthorizedThird;

    constructor(
        private userAuthorizedThirdService: UserAuthorizedThirdService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userAuthorizedThirdService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userAuthorizedThirdListModification',
                content: 'Deleted an userAuthorizedThird'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-authorized-third-delete-popup',
    template: ''
})
export class UserAuthorizedThirdDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userAuthorizedThirdPopupService: UserAuthorizedThirdPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userAuthorizedThirdPopupService
                .open(UserAuthorizedThirdDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
