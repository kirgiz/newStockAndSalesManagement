import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICountryStockAndSalesUtility } from 'app/shared/model/country-stock-and-sales-utility.model';

@Component({
    selector: 'jhi-country-stock-and-sales-utility-detail',
    templateUrl: './country-stock-and-sales-utility-detail.component.html'
})
export class CountryStockAndSalesUtilityDetailComponent implements OnInit {
    country: ICountryStockAndSalesUtility;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ country }) => {
            this.country = country;
        });
    }

    previousState() {
        window.history.back();
    }
}
