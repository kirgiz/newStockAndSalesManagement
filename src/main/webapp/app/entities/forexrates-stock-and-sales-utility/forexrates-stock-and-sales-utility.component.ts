import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IForexratesStockAndSalesUtility } from 'app/shared/model/forexrates-stock-and-sales-utility.model';
import { Principal } from 'app/core';
import { ForexratesStockAndSalesUtilityService } from './forexrates-stock-and-sales-utility.service';

@Component({
    selector: 'jhi-forexrates-stock-and-sales-utility',
    templateUrl: './forexrates-stock-and-sales-utility.component.html'
})
export class ForexratesStockAndSalesUtilityComponent implements OnInit, OnDestroy {
    forexrates: IForexratesStockAndSalesUtility[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private forexratesService: ForexratesStockAndSalesUtilityService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.forexratesService.query().subscribe(
            (res: HttpResponse<IForexratesStockAndSalesUtility[]>) => {
                this.forexrates = res.body;
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

    registerChangeInForexrates() {
        this.eventSubscriber = this.eventManager.subscribe('forexratesListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
