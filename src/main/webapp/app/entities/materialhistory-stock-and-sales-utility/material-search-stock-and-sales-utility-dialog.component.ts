import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiParseLinks } from 'ng-jhipster';

import { MaterialhistoryStockAndSalesUtility } from './materialhistory-stock-and-sales-utility.model';
import { MaterialSearchStockAndSalesUtilityPopupService } from './material-search-stock-and-sales-utility-popup.service';
import { MaterialhistoryStockAndSalesUtilityService } from './materialhistory-stock-and-sales-utility.service';
import { MaterialStockAndSalesUtility, MaterialStockAndSalesUtilityService } from '../material-stock-and-sales-utility';
import { TransferclassificationStockAndSalesUtility, TransferclassificationStockAndSalesUtilityService } from '../transferclassification-stock-and-sales-utility';
import { ThirdStockAndSalesUtility, ThirdStockAndSalesUtilityService } from '../third-stock-and-sales-utility';
import { Router } from '@angular/router';
import { ITEMS_PER_PAGE, Principal } from '../../shared';

@Component({
    selector: 'jhi-material-search-stock-and-sales-utility-dialog',
    templateUrl: './material-search-stock-and-sales-utility-dialog.component.html'
})
export class MaterialSearchStockAndSalesUtilityDialogComponent implements OnInit {

    materialhistory: MaterialhistoryStockAndSalesUtility;
    isSaving: boolean;

    materials: MaterialStockAndSalesUtility[];
    selectedMaterial: number[];

    transferclassifications: TransferclassificationStockAndSalesUtility[];

    thirds: ThirdStockAndSalesUtility[];
    creationDateDp: any;

    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    searchfield: string;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private parseLinks: JhiParseLinks,
        private materialhistoryService: MaterialhistoryStockAndSalesUtilityService,
        private materialService: MaterialStockAndSalesUtilityService,
        private transferclassificationService: TransferclassificationStockAndSalesUtilityService,
        private thirdService: ThirdStockAndSalesUtilityService,
        private eventManager: JhiEventManager,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        console.log('this.activatedRoute.data');
      // console.log(JSON.stringify(this.activatedRoute.data));
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
           //  console.log(data);
            this.page =  1;  //data.pagingParams.page;
            this.previousPage =  1 ; // data.pagingParams.page; 
            this.reverse =  'asc'; // data.pagingParams.ascending;
            this.predicate = 'id'; // data.pagingParams.predicate; 

    });
}

    ngOnInit() {
        this.loadAll();
           }

    loadAll() {
        this.materialService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
                (res: HttpResponse<MaterialhistoryStockAndSalesUtility[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message));
        console.log('zboubbbbbbb');
        this.isSaving = false;
     /*   this.materialService.query()
            .subscribe((res: HttpResponse<MaterialStockAndSalesUtility[]>) => { this.materials = res.body;
                 console.log('dialog materials' + JSON.stringify(res.body)); }, (res: HttpErrorResponse) => this.onError(res.message));
     */   this.transferclassificationService.query()
            .subscribe((res: HttpResponse<TransferclassificationStockAndSalesUtility[]>) => {
                this.transferclassifications = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.thirdService.query()
            .subscribe((res: HttpResponse<ThirdStockAndSalesUtility[]>) => { this.thirds = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));

    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.materials = data;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.materialhistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.materialhistoryService.update(this.materialhistory));
        } else {
            this.subscribeToSaveResponse(
                this.materialhistoryService.create(this.materialhistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MaterialhistoryStockAndSalesUtility>>) {
        result.subscribe((res: HttpResponse<MaterialhistoryStockAndSalesUtility>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MaterialhistoryStockAndSalesUtility) {
        this.eventManager.broadcast({ name: 'materialhistoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    transition() {
        this.router.navigate(['/material-search-stock-and-sales-utility'], {queryParams:
            {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    trackMaterialById(index: number, item: MaterialStockAndSalesUtility) {
        return item.id;
    }

    trackTransferclassificationById(index: number, item: TransferclassificationStockAndSalesUtility) {
        return item.id;
    }

    trackThirdById(index: number, item: ThirdStockAndSalesUtility) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-material-search-stock-and-sales-utility-popup',
    template: ''
})
export class MaterialSearchStockAndSalesUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private materialSearchPopupService: MaterialSearchStockAndSalesUtilityPopupService
    ) {}

    ngOnInit() {
        console.log('routeParams');
      //  console.log(JSON.stringify(this.route));
        this.routeSub = this.route.params.subscribe((params) => {
          /*  if ( params['id'] ) {
                this.materialSearchPopupService
                    .open(MaterialSearchStockAndSalesUtilityDialogComponent as Component, params['id']);
            } else {*/
                console.log('routeParams');
                console.log(JSON.stringify(params));
                this.materialSearchPopupService
                    .open(MaterialSearchStockAndSalesUtilityDialogComponent as Component);
            // }
        });
        console.log('route subscription');
        console.log(this.routeSub);
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
