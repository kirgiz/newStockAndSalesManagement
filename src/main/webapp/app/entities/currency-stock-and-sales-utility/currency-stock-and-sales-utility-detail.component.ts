import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CurrencyStockAndSalesUtility } from './currency-stock-and-sales-utility.model';
import { CurrencyStockAndSalesUtilityService } from './currency-stock-and-sales-utility.service';

@Component({
    selector: 'jhi-currency-stock-and-sales-utility-detail',
    templateUrl: './currency-stock-and-sales-utility-detail.component.html'
})
export class CurrencyStockAndSalesUtilityDetailComponent implements OnInit, OnDestroy {

    currency: CurrencyStockAndSalesUtility;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private currencyService: CurrencyStockAndSalesUtilityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCurrencies();
    }

    load(id) {
        this.currencyService.find(id)
            .subscribe((currencyResponse: HttpResponse<CurrencyStockAndSalesUtility>) => {
                this.currency = currencyResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCurrencies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'currencyListModification',
            (response) => this.load(this.currency.id)
        );
    }
}
