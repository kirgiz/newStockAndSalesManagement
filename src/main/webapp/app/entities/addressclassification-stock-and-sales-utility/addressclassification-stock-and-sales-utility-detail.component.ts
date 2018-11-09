import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAddressclassificationStockAndSalesUtility } from 'app/shared/model/addressclassification-stock-and-sales-utility.model';

@Component({
    selector: 'jhi-addressclassification-stock-and-sales-utility-detail',
    templateUrl: './addressclassification-stock-and-sales-utility-detail.component.html'
})
export class AddressclassificationStockAndSalesUtilityDetailComponent implements OnInit {
    addressclassification: IAddressclassificationStockAndSalesUtility;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ addressclassification }) => {
            this.addressclassification = addressclassification;
        });
    }

    previousState() {
        window.history.back();
    }
}
