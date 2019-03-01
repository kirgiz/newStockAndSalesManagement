import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ILotStockAndSalesUtility } from 'app/shared/model/lot-stock-and-sales-utility.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { LotStockAndSalesUtilityService } from './lot-stock-and-sales-utility.service';
import { MaterialclassificationStockAndSalesUtilityService } from '../materialclassification-stock-and-sales-utility';
import { IMaterialclassificationStockAndSalesUtility } from 'app/shared/model/materialclassification-stock-and-sales-utility.model';
import { Moment } from 'moment';

@Component({
    selector: 'jhi-lot-stock-and-sales-utility',
    templateUrl: './lot-stock-and-sales-utility.component.html'
})
export class LotStockAndSalesUtilityComponent implements OnInit, OnDestroy {
    currentAccount: any;
    lots: ILotStockAndSalesUtility[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    materialClassifications: IMaterialclassificationStockAndSalesUtility[];
    materialClassification: IMaterialclassificationStockAndSalesUtility;
    dateFrom: Moment;
    dateTo: Moment;
    lotsTodisplay: ILotStockAndSalesUtility[];

    constructor(
        private lotService: LotStockAndSalesUtilityService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private materialClassificationService: MaterialclassificationStockAndSalesUtilityService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.lotService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<ILotStockAndSalesUtility[]>) => {
                    this.paginateLots(res.body, res.headers);
                    this.filterResults();
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.materialClassificationService.query().subscribe(
            (res: HttpResponse<IMaterialclassificationStockAndSalesUtility[]>) => {
                this.materialClassifications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/lot-stock-and-sales-utility'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/lot-stock-and-sales-utility',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLots();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILotStockAndSalesUtility) {
        return item.id;
    }

    registerChangeInLots() {
        this.eventSubscriber = this.eventManager.subscribe('lotListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    trackmaterialClassificationsById(index: number, item: IMaterialclassificationStockAndSalesUtility) {
        return item.id;
    }

    private paginateLots(data: ILotStockAndSalesUtility[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.lots = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    filterResults() {
        console.log(this.materialClassification);
        if (!this.materialClassification && !this.dateFrom && !this.dateTo) {
            this.lotsTodisplay = this.lots;
        } else {
            this.lotsTodisplay = this.lots.filter((rec: ILotStockAndSalesUtility) => {
                let l_return: boolean;
                l_return = rec.materialclassificationId === this.materialClassification;
                if (this.dateFrom) {
                    l_return = this.dateFrom.valueOf() <= rec.creationDate.valueOf();
                }
                if (this.dateTo) {
                    l_return = this.dateTo.valueOf() >= rec.creationDate.valueOf();
                }
                if (this.dateTo && this.dateFrom) {
                    l_return = this.dateTo.valueOf() >= rec.creationDate.valueOf() && this.dateFrom.valueOf() <= rec.creationDate.valueOf();
                }
                return l_return;
            });
        }
    }
}
