import {TransferclassificationStockAndSalesUtility} from '../transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDateUtils } from 'ng-jhipster';

import { MaterialhistoryStockAndSalesUtility } from './materialhistory-stock-and-sales-utility.model';
import { MaterialhistoryStockAndSalesUtilityService } from './materialhistory-stock-and-sales-utility.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { TransferclassificationStockAndSalesUtilityService } from '../transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility.service';
import { ThirdStockAndSalesUtility } from '../third-stock-and-sales-utility/third-stock-and-sales-utility.model';
import { ThirdStockAndSalesUtilityService } from '../third-stock-and-sales-utility/third-stock-and-sales-utility.service';

@Component({
  selector: 'jhi-materialhistory-stock-and-sales-utility',
  templateUrl: './materialhistory-stock-and-sales-utility.component.html'
})
export class MaterialhistoryStockAndSalesUtilityComponent
  implements OnInit, OnDestroy {
  thirdList: ThirdStockAndSalesUtility[];
  transferclassifications: TransferclassificationStockAndSalesUtility[];
  transferClassificationSubscription: Subscription;
  thirdSubscription: Subscription;
  historySubscription: Subscription;

  currentAccount: any;
  materialhistories: MaterialhistoryStockAndSalesUtility[];
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

  transferClassifId: number;
  date: { year: number; month: number; day: number };
  transferSource: number;
  transferDest: number;
  materialhistoriesToDisplay: MaterialhistoryStockAndSalesUtility[];

  constructor(
    private materialhistoryService: MaterialhistoryStockAndSalesUtilityService,
    private transferclassificationService: TransferclassificationStockAndSalesUtilityService,
    private parseLinks: JhiParseLinks,
    private jhiAlertService: JhiAlertService,
    private principal: Principal,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventManager: JhiEventManager,
    private thirdService: ThirdStockAndSalesUtilityService
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe( (data) => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAll() {
    this.historySubscription = this.materialhistoryService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<MaterialhistoryStockAndSalesUtility[]>) =>
          this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

    this.transferClassificationSubscription = this.transferclassificationService
      .query()
      .subscribe(
        (res: HttpResponse<TransferclassificationStockAndSalesUtility[]>) => {
          this.transferclassifications = res.body;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );

    this.thirdSubscription = this.thirdService.query().subscribe(
      (res: HttpResponse<ThirdStockAndSalesUtility[]>) => {
        this.thirdList = res.body;
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
    this.router.navigate(['/materialhistory-stock-and-sales-utility'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  filterResults() {
    const mat: MaterialhistoryStockAndSalesUtility[] = this.materialhistories.filter(
      (item) => {
        console.log(this.date);
        // item.creationDate.
        const dd: Date = new Date(
          item.creationDate.getFullYear(),
          item.creationDate.getMonth(),
          item.creationDate.getDate()
        );
        let ddthis: Date;
        if (this.date) {
          ddthis = new Date(
          this.date.year,
          this.date.month - 1,
          this.date.day
        );
    }
        return (
          (item.transferClassifId === this.transferClassifId ||
            this.transferClassifId === null ||
            !this.transferClassifId) &&
          (item.warehousefromId === this.transferSource ||
            this.transferSource === null ||
            !this.transferSource) &&
          (item.warehousetoId === this.transferDest ||
            this.transferDest === null ||
            !this.transferDest) &&
          (this.date === null || !this.date || +dd === +ddthis)
        );
      }
    );
    this.materialhistoriesToDisplay = mat.slice();
    console.log(this.materialhistoriesToDisplay);
  }

  onDateSelect(event: any) {
    console.log('sxvgdfsgdfsgdfg');
    console.log(this.date);
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/materialhistory-stock-and-sales-utility',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }
  ngOnInit() {
    this.loadAll();
    this.principal.identity().then((account) => {
      this.currentAccount = account;
    });
    this.registerChangeInMaterialhistories();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
    this.transferClassificationSubscription.unsubscribe();
    this.historySubscription.unsubscribe();
    this.thirdSubscription.unsubscribe();
  }

  trackId(index: number, item: MaterialhistoryStockAndSalesUtility) {
    return item.id;
  }
  registerChangeInMaterialhistories() {
    this.eventSubscriber = this.eventManager.subscribe(
      'materialhistoryListModification',
      (response) => this.loadAll()
    );
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(data, headers) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    // this.page = pagingParams.page;
    this.materialhistories = data;
    this.materialhistoriesToDisplay = this.materialhistories.slice();
  }
  private onError(error) {
    this.jhiAlertService.error(error.message, null, null);
  }

  trackTransferclassificationById(
    index: number,
    item: TransferclassificationStockAndSalesUtility
  ) {
    return item.id;
  }
}
