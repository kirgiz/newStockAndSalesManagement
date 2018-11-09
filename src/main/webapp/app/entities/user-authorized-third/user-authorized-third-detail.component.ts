import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserAuthorizedThird } from 'app/shared/model/user-authorized-third.model';

@Component({
    selector: 'jhi-user-authorized-third-detail',
    templateUrl: './user-authorized-third-detail.component.html'
})
export class UserAuthorizedThirdDetailComponent implements OnInit {
    userAuthorizedThird: IUserAuthorizedThird;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userAuthorizedThird }) => {
            this.userAuthorizedThird = userAuthorizedThird;
        });
    }

    previousState() {
        window.history.back();
    }
}
