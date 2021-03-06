import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiParseLinks } from 'ng-jhipster';

import { MaterialhistoryStockAndSalesUtility } from './materialhistory-stock-and-sales-utility.model';
import { MaterialSearchStockAndSalesUtilityPopupService } from './material-search-stock-and-sales-utility-popup.service';
import { MaterialhistoryStockAndSalesUtilityService } from './materialhistory-stock-and-sales-utility.service';
import { MaterialStockAndSalesUtilityService } from '../material-stock-and-sales-utility';

import { MaterialStockAndSalesUtility, IMaterialStockAndSalesUtility } from '../../shared/model/material-stock-and-sales-utility.model';

import { TransferclassificationStockAndSalesUtility } from '../../shared/model/transferclassification-stock-and-sales-utility.model';

import { TransferclassificationStockAndSalesUtilityService } from '../transferclassification-stock-and-sales-utility';

import { ThirdStockAndSalesUtility } from '../../shared/model/third-stock-and-sales-utility.model';

import { ThirdStockAndSalesUtilityService } from '../third-stock-and-sales-utility';
import { Router } from '@angular/router';
import { ITEMS_PER_PAGE } from '../../shared//constants/pagination.constants';

import { Principal } from '../../core/auth/principal.service';

// import 'rxjs/add/observable/forkJoin';
import { logsRoute } from '../../admin/logs/logs.route';
import { Subscription } from 'rxjs';

import { UserService } from '../../core/user/user.service';
import { UserAuthorizedThirdService } from '../user-authorized-third/user-authorized-third.service';
import { User } from '../../core/user/user.model';
import { UserAuthorizedThird } from '../../shared/model/user-authorized-third.model';

@Component({
    selector: 'jhi-material-search-stock-and-sales-utility-dialog',
    templateUrl: './material-search-stock-and-sales-utility-dialog.component.html'
})
export class MaterialSearchStockAndSalesUtilityDialogComponent implements OnInit, OnDestroy {
    source: number;
    destination: number;
    hasAdminAuth: boolean;
    thirdAuthSubscription: any;
    usrSubscription: any;
    thirdSubscription: Subscription;

    materialhistory: MaterialhistoryStockAndSalesUtility;
    isSaving: boolean;

    materials: MaterialStockAndSalesUtility[];
    materialsToDisplay: {
        id?: any;
        code?: any;
        description?: any;
        materialTypeDefName?: any;
        lotIdentifierCode?: any;
        selectedItem?: boolean;
        displayItem?: boolean;
        materialTypeDefId?: number;
    }[];
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
    private selectedMaterialType: number;
    private matSubscription: Subscription;
    private transferClassificationSubscription: Subscription;
    private thirdsubscription: Subscription;
    private currentAccount: any;
    private authThirdsList: UserAuthorizedThird[];

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
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
        private userService: UserService,
        private autThirds: UserAuthorizedThirdService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = 1; // data.pagingParams.page;
            this.previousPage = 1; // data.pagingParams.page;
            this.reverse = 'asc'; // data.pagingParams.ascending;
            this.predicate = 'id'; // data.pagingParams.predicate;
        });
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.principal.hasAuthority('ROLE_ADMIN').then(hasAuth => {
            this.hasAdminAuth = hasAuth;
        });
    }

    ngOnDestroy(): void {
        this.matSubscription.unsubscribe();
        this.transferClassificationSubscription.unsubscribe();
        this.thirdsubscription.unsubscribe();
    }

    loadAll() {
        this.selectedMaterialType = +this.activatedRoute.snapshot.queryParams['matType'];
        this.destination = +this.activatedRoute.snapshot.queryParams['destination'];
        this.source = +this.activatedRoute.snapshot.queryParams['source'];
        this.matSubscription = this.materialService
            .query({
                page: this.page - 1,
                size: 10000,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<MaterialhistoryStockAndSalesUtility[]>) => {
                    this.onSuccess(res.body, res.headers);
                    console.log('found mat type' + this.selectedMaterialType);
                    console.log('HOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
                    console.log(res.body);
                    // console.log('found mat type' +  this.selectedMaterialType );
                },
                (res: HttpErrorResponse) => {
                    this.onError(res.message);
                }
            );

        this.isSaving = false;
        this.transferClassificationSubscription = this.transferclassificationService.query().subscribe(
            (res: HttpResponse<TransferclassificationStockAndSalesUtility[]>) => {
                this.transferclassifications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.thirdsubscription = this.thirdService.query().subscribe(
            (res: HttpResponse<ThirdStockAndSalesUtility[]>) => {
                this.thirds = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.materials = data;
        console.log(this.materials);

        this.thirdSubscription = this.thirdService.query().subscribe(
            (res: HttpResponse<ThirdStockAndSalesUtility[]>) => {
                this.thirds = res.body;
                this.usrSubscription = this.userService.find(this.currentAccount.login).subscribe((user: HttpResponse<User>) => {
                    const resuser: User = user.body;
                    this.thirdAuthSubscription = this.autThirds
                        .query({
                            'userAuthId.equals': resuser.id
                        })
                        .subscribe((reslist: HttpResponse<UserAuthorizedThird[]>) => {
                            this.authThirdsList = reslist.body;
                            const thirds: ThirdStockAndSalesUtility[] = this.thirds.slice();
                            this.thirds = thirds.filter(element => {
                                for (const authList of this.authThirdsList) {
                                    if (authList.thirdAuthId === element.id) {
                                        return true;
                                    }
                                }
                            });
                            const matt: MaterialStockAndSalesUtility[] = this.materials.slice();
                            this.materials = matt.filter(element => {
                                for (const authList of this.authThirdsList) {
                                    console.log('JJJJJJJJJJJJJJJJJJJJJJJJJJJ');
                                    console.log(element);
                                    console.log(authList.thirdAuthId);
                                    console.log('MATERIAL TYPE' + element.materialTypeDefId);
                                    if (
                                        (authList.thirdAuthId === element.currentLocation &&
                                            this.destination !== element.currentLocation &&
                                            this.source === element.currentLocation) ||
                                        ((!element.currentLocation || element.currentLocation === null) && this.hasAdminAuth)
                                    ) {
                                        return true;
                                    }
                                }
                            });
                            this.materialsToDisplay = this.materials.slice();
                            console.log(this.materialsToDisplay);
                            this.materialsToDisplay.forEach(element => {
                                element.displayItem = true;
                                element.selectedItem = false;
                            });

                            let mat = this.materialsToDisplay;
                            if (this.selectedMaterialType !== null) {
                                mat = this.materialsToDisplay.filter(item => {
                                    console.log('HAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + this.selectedMaterialType);

                                    return item.materialTypeDefId === this.selectedMaterialType;
                                });
                            }
                            this.materialsToDisplay.forEach(element => {
                                element.displayItem = false;
                                const index: number = mat.findIndex(originalElement => element.id === originalElement.id);
                                if (index > -1) {
                                    element.displayItem = true;
                                }
                            });
                            this.totalItems = mat.length;
                            this.queryCount = mat.length;
                        });
                });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        this.materialhistoryService.selectMaterial(
            this.materialsToDisplay.filter(material => {
                return material.selectedItem === true;
            })
        );
        this.activeModal.close(this.materials);
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    SelectMaterial(values: any, materialId: number) {
        const index: number = this.materialsToDisplay.findIndex(element => element.id === materialId);
        this.materialsToDisplay[index].selectedItem = values.currentTarget.checked;
        console.log(JSON.stringify(this.materialsToDisplay[index]));
    }

    trackId(index: number, item: any) {
        return item.id;
    }

    transition() {
        this.router.navigate(['/material-search-stock-and-sales-utility'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
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

    onKey(event: any) {
        let t: {
            id?: any;
            code?: any;
            description?: any;
            materialTypeDefName?: any;
            lotIdentifierCode?: any;
        }[] = [];
        // tslint:disable-next-line:curly
        if (!event.target.value) {
            t = this.materialsToDisplay.filter(it => {
                return it.materialTypeDefId === this.selectedMaterialType;
            });
        } else {
            const searchText = event.target.value.toLowerCase();

            t = this.materialsToDisplay.filter(it => {
                return (
                    (it.code.toLowerCase().includes(searchText) ||
                        it.description.toLowerCase().includes(searchText) ||
                        it.lotIdentifierCode.toLowerCase().includes(searchText)) &&
                    it.materialTypeDefId === this.selectedMaterialType
                );
            });
        }
        this.totalItems = t.length;
        this.queryCount = t.length;

        this.materialsToDisplay.forEach(element => {
            element.displayItem = false;
            const index: number = t.findIndex(originalElement => element.id === originalElement.id);
            if (index > -1) {
                element.displayItem = true;
            }
        });
    }
}

@Component({
    selector: 'jhi-material-search-stock-and-sales-utility-popup',
    template: ''
})
export class MaterialSearchStockAndSalesUtilityPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private materialSearchPopupService: MaterialSearchStockAndSalesUtilityPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.materialSearchPopupService.open(MaterialSearchStockAndSalesUtilityDialogComponent as Component);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
