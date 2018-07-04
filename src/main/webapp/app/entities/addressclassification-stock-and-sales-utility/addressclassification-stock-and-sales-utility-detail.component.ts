import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AddressclassificationStockAndSalesUtility } from './addressclassification-stock-and-sales-utility.model';
import { AddressclassificationStockAndSalesUtilityService } from './addressclassification-stock-and-sales-utility.service';

@Component({
    selector: 'jhi-addressclassification-stock-and-sales-utility-detail',
    templateUrl: './addressclassification-stock-and-sales-utility-detail.component.html'
})
export class AddressclassificationStockAndSalesUtilityDetailComponent implements OnInit, OnDestroy {

    addressclassification: AddressclassificationStockAndSalesUtility;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private addressclassificationService: AddressclassificationStockAndSalesUtilityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAddressclassifications();
    }

    load(id) {
        this.addressclassificationService.find(id)
            .subscribe((addressclassificationResponse: HttpResponse<AddressclassificationStockAndSalesUtility>) => {
                this.addressclassification = addressclassificationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAddressclassifications() {
        this.eventSubscriber = this.eventManager.subscribe(
            'addressclassificationListModification',
            (response) => this.load(this.addressclassification.id)
        );
    }
}
