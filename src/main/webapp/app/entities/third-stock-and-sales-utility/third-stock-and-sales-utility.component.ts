import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ThirdStockAndSalesUtility } from './third-stock-and-sales-utility.model';
import { ThirdStockAndSalesUtilityService } from './third-stock-and-sales-utility.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-third-stock-and-sales-utility',
    templateUrl: './third-stock-and-sales-utility.component.html'
})
export class ThirdStockAndSalesUtilityComponent implements OnInit, OnDestroy {
thirds: ThirdStockAndSalesUtility[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private thirdService: ThirdStockAndSalesUtilityService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.thirdService.query().subscribe(
            (res: HttpResponse<ThirdStockAndSalesUtility[]>) => {
                this.thirds = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInThirds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ThirdStockAndSalesUtility) {
        return item.id;
    }
    registerChangeInThirds() {
        this.eventSubscriber = this.eventManager.subscribe('thirdListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
