import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IThirdStockAndSalesUtility } from 'app/shared/model/third-stock-and-sales-utility.model';
import { Principal } from 'app/core';
import { ThirdStockAndSalesUtilityService } from './third-stock-and-sales-utility.service';

@Component({
    selector: 'jhi-third-stock-and-sales-utility',
    templateUrl: './third-stock-and-sales-utility.component.html'
})
export class ThirdStockAndSalesUtilityComponent implements OnInit, OnDestroy {
    thirds: IThirdStockAndSalesUtility[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private thirdService: ThirdStockAndSalesUtilityService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.thirdService.query().subscribe(
            (res: HttpResponse<IThirdStockAndSalesUtility[]>) => {
                this.thirds = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInThirds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IThirdStockAndSalesUtility) {
        return item.id;
    }

    registerChangeInThirds() {
        this.eventSubscriber = this.eventManager.subscribe('thirdListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
