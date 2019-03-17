import { TransferclassificationStockAndSalesUtility } from '../../shared/model/transferclassification-stock-and-sales-utility.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
// import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDateUtils } from 'ng-jhipster';
import { Subscription } from 'rxjs';
// import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IMaterialhistoryStockAndSalesUtility } from 'app/shared/model/materialhistory-stock-and-sales-utility.model';
import { Principal } from '../../../app/core/auth/principal.service';

import { ITEMS_PER_PAGE } from '../../shared/constants/pagination.constants';
import { User } from '../../core/user/user.model';
import { MaterialhistoryStockAndSalesUtilityService } from './materialhistory-stock-and-sales-utility.service';
import { BaseEntity } from '../../shared/model/base-entity.model';
import { TransferclassificationStockAndSalesUtilityService } from '../transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility.service';
import { ThirdStockAndSalesUtility } from '../../shared/model/third-stock-and-sales-utility.model';
import { ThirdStockAndSalesUtilityService } from '../third-stock-and-sales-utility/third-stock-and-sales-utility.service';
import { UserService } from '../../core/user/user.service';
import { UserAuthorizedThirdService } from '../user-authorized-third/user-authorized-third.service';
import { UserAuthorizedThird } from '../../shared/model/user-authorized-third.model';
import { MaterialclassificationStockAndSalesUtilityService } from '../materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility.service';
import { MaterialclassificationStockAndSalesUtility } from '../../shared/model/materialclassification-stock-and-sales-utility.model';
import { MaterialStockAndSalesUtility } from '../../shared/model/material-stock-and-sales-utility.model';
import { MaterialStockAndSalesUtilityService } from '../material-stock-and-sales-utility';
import { ParamTransfer } from './param-transfer.model';

@Component({
    selector: 'jhi-materialhistory-stock-and-sales-utility',
    templateUrl: './materialhistory-stock-and-sales-utility.component.html'
})
export class MaterialhistoryStockAndSalesUtilityComponent implements OnInit, OnDestroy {
    inventories: any[];
    materialTypeList: MaterialclassificationStockAndSalesUtility[];
    materialClassificationSubscription: Subscription;
    hasAdminAuth: boolean;
    thirdAuthSubscription: Subscription;
    usrSubscription: Subscription;
    userList: User[];
    user: User;
    authThirdsList: UserAuthorizedThird[];
    userServiceSubscription: Subscription;
    thirdList: ThirdStockAndSalesUtility[];
    transferclassifications: TransferclassificationStockAndSalesUtility[];
    transferClassificationSubscription: Subscription;
    thirdSubscription: Subscription;
    historySubscription: Subscription;

    currentAccount: any;
    materialhistories: IMaterialhistoryStockAndSalesUtility[];
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
    date: { year: number; month: number; dusrSubscription: Subscription; day: number };
    transferSource: number;
    transferDest: number;
    transferParams: ParamTransfer;

    materialhistoriesToDisplay: {
        id?: number;
        code?: string;
        creationDate?: any;
        price?: number;
        comments?: string;
        userMod?: number;
        itemTransfereds?: BaseEntity[];
        transferClassifId?: number;
        warehousefromId?: number;
        warehousetoId?: number;
        userModName?: string;
        materialclassificationDescription?: string;
    }[];
    materialType: number;
    message: string;

    constructor(
        private materialhistoryService: MaterialhistoryStockAndSalesUtilityService,
        private transferclassificationService: TransferclassificationStockAndSalesUtilityService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private thirdService: ThirdStockAndSalesUtilityService,
        private userService: UserService,
        private autThirds: UserAuthorizedThirdService,
        private materialClassificationService: MaterialclassificationStockAndSalesUtilityService,
        private materialService: MaterialStockAndSalesUtilityService
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
        this.historySubscription = this.materialhistoryService
            .query({
                page: this.page - 1,
                size: 100000000,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IMaterialhistoryStockAndSalesUtility[]>) => {
                    this.onSuccess(res.body, res.headers);
                    this.userServiceSubscription = this.userService.query().subscribe(
                        (res1: HttpResponse<User[]>) => {
                            this.userList = res1.body;
                            this.materialhistoriesToDisplay.forEach(item =>
                                this.userList.forEach(element => {
                                    if (element.id === item.userMod) {
                                        item.userModName = element.login;
                                    }
                                })
                            );
                        },
                        (res1: HttpErrorResponse) => this.onError(res1.message)
                    );
                    this.usrSubscription = this.userService.find(this.currentAccount.login).subscribe((user: HttpResponse<User>) => {
                        const resuser: User = user.body;
                        this.thirdAuthSubscription = this.autThirds
                            .query({
                                'userAuthId.equals': resuser.id
                            })
                            .subscribe((reslist: HttpResponse<UserAuthorizedThird[]>) => {
                                this.authThirdsList = reslist.body;
                                this.materialhistoryService.setDefaultThird(
                                    this.thirdList.find((third: ThirdStockAndSalesUtility) => {
                                        return (
                                            this.authThirdsList.find(thirdAuth => {
                                                return thirdAuth.defaultThird === true;
                                            }).thirdAuthId === third.id
                                        );
                                    })
                                );

                                this.materialhistoryService.setDefaultDestination(
                                    this.thirdList.find((third: ThirdStockAndSalesUtility) => {
                                        return (
                                            this.authThirdsList.find(thirdAuth => {
                                                return thirdAuth.defaultDestination === true;
                                            }).thirdAuthId === third.id
                                        );
                                    })
                                );

                                const mat: IMaterialhistoryStockAndSalesUtility[] = this.materialhistoriesToDisplay.slice();
                                this.materialhistoriesToDisplay = mat.filter(element => {
                                    for (const authList of this.authThirdsList) {
                                        if (
                                            authList.thirdAuthId === element.warehousefromId ||
                                            authList.thirdAuthId === element.warehousetoId
                                        ) {
                                            return true;
                                        }
                                    }
                                });

                                const thirds = this.thirdList.slice();
                                this.thirdList = thirds.filter(element => {
                                    for (const authList of this.authThirdsList) {
                                        if (authList.thirdAuthId === element.id) {
                                            return true;
                                        }
                                    }
                                });
                                this.transferDest = this.materialhistoryService.getDefaultDestination().id;
                                this.transferSource = this.materialhistoryService.getDefaultThird().id;
                                this.filterResults();
                            });
                    });
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.transferClassificationSubscription = this.transferclassificationService.query().subscribe(
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

        this.materialClassificationSubscription = this.materialClassificationService.query().subscribe(
            (res: HttpResponse<MaterialclassificationStockAndSalesUtility[]>) => {
                this.materialTypeList = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.principal.hasAuthority('ROLE_ADMIN').then(hasAuth => {
            this.hasAdminAuth = hasAuth;
        });
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

    reset() {
        this.loadAll();
    }

    filterResults() {
        this.transferParams = new ParamTransfer(this.transferSource, this.transferDest, this.materialType);
        this.materialhistoryService.setParamTransf(this.transferParams);
        const mat: IMaterialhistoryStockAndSalesUtility[] = this.materialhistories.filter(item => {
            console.log(this.date);
            const dd: Date = new Date(
                parseInt(item.creationDate.format('YYYY'), 10),
                parseInt(item.creationDate.format('M MM '), 10),
                parseInt(item.creationDate.format('D DD'), 10)
            );
            let ddthis: Date;
            if (this.date) {
                ddthis = new Date(this.date.year, this.date.month - 1, this.date.day);
            }
            return (
                (item.transferClassifId === this.transferClassifId || this.transferClassifId === null || !this.transferClassifId) &&
                (item.materialclassificationId === this.materialType || this.materialType === null || !this.materialType) &&
                (item.warehousefromId === this.transferSource || this.transferSource === null || !this.transferSource) &&
                (item.warehousetoId === this.transferDest || this.transferDest === null || !this.transferDest) &&
                (this.date === null || !this.date || +dd === +ddthis)
            );
        });
        this.materialhistoriesToDisplay = mat.slice();
        this.page = 1;
        this.itemsPerPage = 20;
        this.queryCount = this.materialhistoriesToDisplay.length;
        this.totalItems = this.materialhistoriesToDisplay.length;
        console.log('AGGREGATE STOCKSSS');
        console.log(this.materialhistoriesToDisplay);

        this.materialService.queryAll().subscribe((materialsres: HttpResponse<MaterialStockAndSalesUtility[]>) => {
            const materials = materialsres.body;
            const tmpData = materials.filter(element => {
                return element.currentLocation === this.transferSource;
            });

            const result = [];

            tmpData.reduce(function(res2, value) {
                if (!res2[value.materialTypeCatId]) {
                    res2[value.materialTypeCatId] = {
                        ...value,
                        numberOfItems: 0
                    };
                    result.push(res2[value.materialTypeCatId]);
                }
                res2[value.materialTypeCatId].numberOfItems += 1;
                return res2;
            }, {});
            this.inventories = result;
        });
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
        this.materialhistoryService.currentMessage.subscribe(message => (this.message = message));
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMaterialhistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
        this.transferClassificationSubscription.unsubscribe();
        this.historySubscription.unsubscribe();
        this.thirdSubscription.unsubscribe();
        this.userServiceSubscription.unsubscribe();
        this.usrSubscription.unsubscribe();
        this.thirdAuthSubscription.unsubscribe();
    }

    trackId(index: number, item: IMaterialhistoryStockAndSalesUtility) {
        return item.id;
    }
    registerChangeInMaterialhistories() {
        this.eventSubscriber = this.eventManager.subscribe('materialhistoryListModification', response => this.reset());
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
        this.materialhistories = data;
        this.materialhistoriesToDisplay = this.materialhistories.slice();
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTransferclassificationById(index: number, item: TransferclassificationStockAndSalesUtility) {
        return item.id;
    }

    OnSale() {
        const saleTransfType = this.transferclassifications.find(transferclassification => {
            return transferclassification.isOutgoingTransfer === true;
        });
        this.openTransfDialog(saleTransfType);
    }

    OnBuy() {
        const buyTransfType = this.transferclassifications.find(transferclassification => {
            return transferclassification.isIncomingTransfer === true;
        });
        this.openTransfDialog(buyTransfType);
    }

    OnTransf() {
        const intTransfType = this.transferclassifications.find(transferclassification => {
            return transferclassification.isInternalTransfer === true;
        });
        this.openTransfDialog(intTransfType);
    }

    private openTransfDialog(transfType: TransferclassificationStockAndSalesUtility) {
        this.materialhistoryService.emitTransTypeEvent(transfType);
        this.router.navigate(['/', { outlets: { popup: ['materialhistory-stock-and-sales-utility-new'] } }]);
    }
}
