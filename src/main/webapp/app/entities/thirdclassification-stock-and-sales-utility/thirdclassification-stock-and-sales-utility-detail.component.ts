import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IThirdclassificationStockAndSalesUtility } from 'app/shared/model/thirdclassification-stock-and-sales-utility.model';

@Component({
    selector: 'jhi-thirdclassification-stock-and-sales-utility-detail',
    templateUrl: './thirdclassification-stock-and-sales-utility-detail.component.html'
})
export class ThirdclassificationStockAndSalesUtilityDetailComponent implements OnInit {
    thirdclassification: IThirdclassificationStockAndSalesUtility;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ thirdclassification }) => {
            this.thirdclassification = thirdclassification;
        });
    }

    previousState() {
        window.history.back();
    }
}
