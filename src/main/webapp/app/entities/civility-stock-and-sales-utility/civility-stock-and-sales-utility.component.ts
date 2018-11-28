import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICivilityStockAndSalesUtility } from 'app/shared/model/civility-stock-and-sales-utility.model';
import { Principal } from 'app/core';
import { CivilityStockAndSalesUtilityService } from './civility-stock-and-sales-utility.service';

@Component({
    selector: 'jhi-civility-stock-and-sales-utility',
    templateUrl: './civility-stock-and-sales-utility.component.html'
})
export class CivilityStockAndSalesUtilityComponent implements OnInit, OnDestroy {
    civilities: ICivilityStockAndSalesUtility[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private civilityService: CivilityStockAndSalesUtilityService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.civilityService.query().subscribe(
            (res: HttpResponse<ICivilityStockAndSalesUtility[]>) => {
                this.civilities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCivilities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICivilityStockAndSalesUtility) {
        return item.id;
    }

    registerChangeInCivilities() {
        this.eventSubscriber = this.eventManager.subscribe('civilityListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
