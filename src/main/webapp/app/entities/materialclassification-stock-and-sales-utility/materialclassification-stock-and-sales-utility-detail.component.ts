import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMaterialclassificationStockAndSalesUtility } from 'app/shared/model/materialclassification-stock-and-sales-utility.model';

@Component({
    selector: 'jhi-materialclassification-stock-and-sales-utility-detail',
    templateUrl: './materialclassification-stock-and-sales-utility-detail.component.html'
})
export class MaterialclassificationStockAndSalesUtilityDetailComponent implements OnInit {
    materialclassification: IMaterialclassificationStockAndSalesUtility;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ materialclassification }) => {
            this.materialclassification = materialclassification;
        });
    }

    previousState() {
        window.history.back();
    }
}
