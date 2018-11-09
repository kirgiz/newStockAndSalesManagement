import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILotStockAndSalesUtility } from 'app/shared/model/lot-stock-and-sales-utility.model';

@Component({
    selector: 'jhi-lot-stock-and-sales-utility-detail',
    templateUrl: './lot-stock-and-sales-utility-detail.component.html'
})
export class LotStockAndSalesUtilityDetailComponent implements OnInit {
    lot: ILotStockAndSalesUtility;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ lot }) => {
            this.lot = lot;
        });
    }

    previousState() {
        window.history.back();
    }
}
