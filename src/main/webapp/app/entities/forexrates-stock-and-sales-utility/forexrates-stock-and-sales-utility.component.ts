import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ForexratesStockAndSalesUtility } from './forexrates-stock-and-sales-utility.model';
import { ForexratesStockAndSalesUtilityService } from './forexrates-stock-and-sales-utility.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-forexrates-stock-and-sales-utility',
    templateUrl: './forexrates-stock-and-sales-utility.component.html'
})
export class ForexratesStockAndSalesUtilityComponent implements OnInit, OnDestroy {
forexrates: ForexratesStockAndSalesUtility[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private forexratesService: ForexratesStockAndSalesUtilityService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.forexratesService.query().subscribe(
            (res: HttpResponse<ForexratesStockAndSalesUtility[]>) => {
                this.forexrates = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInForexrates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ForexratesStockAndSalesUtility) {
        return item.id;
    }
    registerChangeInForexrates() {
        this.eventSubscriber = this.eventManager.subscribe('forexratesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
