import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserAuthorizedThird } from 'app/shared/model/user-authorized-third.model';
import { UserAuthorizedThirdService } from './user-authorized-third.service';

@Component({
    selector: 'jhi-user-authorized-third-delete-dialog',
    templateUrl: './user-authorized-third-delete-dialog.component.html'
})
export class UserAuthorizedThirdDeleteDialogComponent {
    userAuthorizedThird: IUserAuthorizedThird;

    constructor(
        private userAuthorizedThirdService: UserAuthorizedThirdService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userAuthorizedThirdService.delete(id).subscribe(response => {
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
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userAuthorizedThird }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserAuthorizedThirdDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.userAuthorizedThird = userAuthorizedThird;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
