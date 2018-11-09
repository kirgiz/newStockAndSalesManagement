import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IForexratesStockAndSalesUtility } from 'app/shared/model/forexrates-stock-and-sales-utility.model';

@Component({
    selector: 'jhi-forexrates-stock-and-sales-utility-detail',
    templateUrl: './forexrates-stock-and-sales-utility-detail.component.html'
})
export class ForexratesStockAndSalesUtilityDetailComponent implements OnInit {
    forexrates: IForexratesStockAndSalesUtility;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ forexrates }) => {
            this.forexrates = forexrates;
        });
    }

    previousState() {
        window.history.back();
    }
}
