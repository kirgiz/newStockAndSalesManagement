import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UserAuthorizedThird } from './user-authorized-third.model';
import { UserAuthorizedThirdService } from './user-authorized-third.service';

@Component({
    selector: 'jhi-user-authorized-third-detail',
    templateUrl: './user-authorized-third-detail.component.html'
})
export class UserAuthorizedThirdDetailComponent implements OnInit, OnDestroy {

    userAuthorizedThird: UserAuthorizedThird;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userAuthorizedThirdService: UserAuthorizedThirdService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserAuthorizedThirds();
    }

    load(id) {
        this.userAuthorizedThirdService.find(id)
            .subscribe((userAuthorizedThirdResponse: HttpResponse<UserAuthorizedThird>) => {
                this.userAuthorizedThird = userAuthorizedThirdResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserAuthorizedThirds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userAuthorizedThirdListModification',
            (response) => this.load(this.userAuthorizedThird.id)
        );
    }
}
