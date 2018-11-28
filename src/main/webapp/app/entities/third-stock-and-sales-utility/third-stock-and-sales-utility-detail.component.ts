import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IThirdStockAndSalesUtility } from 'app/shared/model/third-stock-and-sales-utility.model';

@Component({
    selector: 'jhi-third-stock-and-sales-utility-detail',
    templateUrl: './third-stock-and-sales-utility-detail.component.html'
})
export class ThirdStockAndSalesUtilityDetailComponent implements OnInit {
    third: IThirdStockAndSalesUtility;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ third }) => {
            this.third = third;
        });
    }

    previousState() {
        window.history.back();
    }
}
