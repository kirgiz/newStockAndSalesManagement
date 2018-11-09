import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDashboardStockAndSalesUtility } from 'app/shared/model/dashboard-stock-and-sales-utility.model';

@Component({
    selector: 'jhi-dashboard-stock-and-sales-utility-detail',
    templateUrl: './dashboard-stock-and-sales-utility-detail.component.html'
})
export class DashboardStockAndSalesUtilityDetailComponent implements OnInit {
    dashboard: IDashboardStockAndSalesUtility;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dashboard }) => {
            this.dashboard = dashboard;
        });
    }

    previousState() {
        window.history.back();
    }
}
