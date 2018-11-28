import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMaterialhistoryStockAndSalesUtility } from 'app/shared/model/materialhistory-stock-and-sales-utility.model';

@Component({
    selector: 'jhi-materialhistory-stock-and-sales-utility-detail',
    templateUrl: './materialhistory-stock-and-sales-utility-detail.component.html'
})
export class MaterialhistoryStockAndSalesUtilityDetailComponent implements OnInit {
    materialhistory: IMaterialhistoryStockAndSalesUtility;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ materialhistory }) => {
            this.materialhistory = materialhistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
