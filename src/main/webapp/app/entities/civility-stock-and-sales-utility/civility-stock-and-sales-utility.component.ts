import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CivilityStockAndSalesUtility } from './civility-stock-and-sales-utility.model';
import { CivilityStockAndSalesUtilityService } from './civility-stock-and-sales-utility.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-civility-stock-and-sales-utility',
    templateUrl: './civility-stock-and-sales-utility.component.html'
})
export class CivilityStockAndSalesUtilityComponent implements OnInit, OnDestroy {
civilities: CivilityStockAndSalesUtility[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private civilityService: CivilityStockAndSalesUtilityService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.civilityService.query().subscribe(
            (res: HttpResponse<CivilityStockAndSalesUtility[]>) => {
                this.civilities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCivilities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CivilityStockAndSalesUtility) {
        return item.id;
    }
    registerChangeInCivilities() {
        this.eventSubscriber = this.eventManager.subscribe('civilityListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
