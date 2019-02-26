import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IForexratesStockAndSalesUtility, ForexratesStockAndSalesUtility } from 'app/shared/model/forexrates-stock-and-sales-utility.model';
import { Principal } from 'app/core';
import { ForexratesStockAndSalesUtilityService } from './forexrates-stock-and-sales-utility.service';
import { CurrencyStockAndSalesUtility, ICurrencyStockAndSalesUtility } from 'app/shared/model/currency-stock-and-sales-utility.model';
import { CurrencyStockAndSalesUtilityService } from '../currency-stock-and-sales-utility';
import { Moment } from 'moment';

@Component({
    selector: 'jhi-forexrates-stock-and-sales-utility',
    templateUrl: './forexrates-stock-and-sales-utility.component.html'
})
export class ForexratesStockAndSalesUtilityComponent implements OnInit, OnDestroy {
    forexrates: IForexratesStockAndSalesUtility[];
    currentAccount: any;
    eventSubscriber: Subscription;
    forexratesToDisplay: IForexratesStockAndSalesUtility[];
    currencies: ICurrencyStockAndSalesUtility[];
    currency: ICurrencyStockAndSalesUtility;
    dateFrom: Moment;
    dateTo: Moment;

    constructor(
        private forexratesService: ForexratesStockAndSalesUtilityService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private currencyService: CurrencyStockAndSalesUtilityService
    ) {}

    loadAll() {
        this.forexratesService.query().subscribe(
            (res: HttpResponse<IForexratesStockAndSalesUtility[]>) => {
                this.forexrates = res.body;
                this.filterResults();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.currencyService.query().subscribe(
            (res: HttpResponse<ICurrencyStockAndSalesUtility[]>) => {
                this.currencies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInForexrates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IForexratesStockAndSalesUtility) {
        return item.id;
    }

    trackCurrenciesById(index: number, item: ICurrencyStockAndSalesUtility) {
        return item.id;
    }

    registerChangeInForexrates() {
        this.eventSubscriber = this.eventManager.subscribe('forexratesListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    filterResults() {
        if (!this.currency) {
            this.forexratesToDisplay = this.forexrates.slice();
        } else {
            console.log(this.currency);
            console.log(this.forexrates);
            this.forexratesToDisplay = this.forexrates.filter((rec: IForexratesStockAndSalesUtility) => {
                let l_return: boolean;
                l_return = rec.rateForCurrencyId === this.currency;
                if (this.dateFrom) {
                    l_return = this.dateFrom.valueOf() <= rec.rateDate.valueOf();
                }
                if (this.dateTo) {
                    l_return = this.dateTo.valueOf() >= rec.rateDate.valueOf();
                }
                if (this.dateTo && this.dateFrom) {
                    l_return = this.dateTo.valueOf() >= rec.rateDate.valueOf() && this.dateFrom.valueOf() <= rec.rateDate.valueOf();
                }
                return l_return;
            });
        }
    }
}
