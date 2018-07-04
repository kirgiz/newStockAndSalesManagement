import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ThirdStockAndSalesUtility } from './third-stock-and-sales-utility.model';
import { ThirdStockAndSalesUtilityService } from './third-stock-and-sales-utility.service';

@Component({
    selector: 'jhi-third-stock-and-sales-utility-detail',
    templateUrl: './third-stock-and-sales-utility-detail.component.html'
})
export class ThirdStockAndSalesUtilityDetailComponent implements OnInit, OnDestroy {

    third: ThirdStockAndSalesUtility;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private thirdService: ThirdStockAndSalesUtilityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInThirds();
    }

    load(id) {
        this.thirdService.find(id)
            .subscribe((thirdResponse: HttpResponse<ThirdStockAndSalesUtility>) => {
                this.third = thirdResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInThirds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'thirdListModification',
            (response) => this.load(this.third.id)
        );
    }
}
