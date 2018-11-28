import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAddressStockAndSalesUtility } from 'app/shared/model/address-stock-and-sales-utility.model';
import { Principal } from 'app/core';
import { AddressStockAndSalesUtilityService } from './address-stock-and-sales-utility.service';

@Component({
    selector: 'jhi-address-stock-and-sales-utility',
    templateUrl: './address-stock-and-sales-utility.component.html'
})
export class AddressStockAndSalesUtilityComponent implements OnInit, OnDestroy {
    addresses: IAddressStockAndSalesUtility[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private addressService: AddressStockAndSalesUtilityService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.addressService.query().subscribe(
            (res: HttpResponse<IAddressStockAndSalesUtility[]>) => {
                this.addresses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAddresses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAddressStockAndSalesUtility) {
        return item.id;
    }

    registerChangeInAddresses() {
        this.eventSubscriber = this.eventManager.subscribe('addressListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
