import {
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';
import {
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import {
    Subscription
} from 'rxjs/Subscription';
import {
    JhiEventManager,
    JhiAlertService
} from 'ng-jhipster';

import {
    DashboardStockAndSalesUtility
} from './dashboard-stock-and-sales-utility.model';
import {
    DashboardStockAndSalesUtilityService
} from './dashboard-stock-and-sales-utility.service';
import {
    D3ChartService
} from './D3ChartService';

import {
    TransferclassificationStockAndSalesUtility
} from '../transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility.model';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import {
    JhiParseLinks,
    JhiDateUtils
} from 'ng-jhipster';

import {
    MaterialhistoryStockAndSalesUtility
} from '../materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility.model';
import {
    MaterialhistoryStockAndSalesUtilityService
} from '../materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility.service';
import {
    ITEMS_PER_PAGE,
    Principal,
    User,
    BaseEntity
} from '../../shared';
import {
    TransferclassificationStockAndSalesUtilityService
} from '../transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility.service';
import {
    ThirdStockAndSalesUtility
} from '../third-stock-and-sales-utility/third-stock-and-sales-utility.model';
import {
    ThirdStockAndSalesUtilityService
} from '../third-stock-and-sales-utility/third-stock-and-sales-utility.service';
import {
    UserService
} from '../../shared/user/user.service';
import {
    UserAuthorizedThirdService
} from '../user-authorized-third/user-authorized-third.service';
import {
    UserAuthorizedThird
} from '../user-authorized-third';

@Component({
    selector: 'jhi-dashboard-stock-and-sales-utility',
    templateUrl: './dashboard-stock-and-sales-utility.component.html'
})
export class DashboardStockAndSalesUtilityComponent implements OnInit, OnDestroy {
    transferclassifications: TransferclassificationStockAndSalesUtility[];
    hasAdminAuth: boolean;
    materialhistories: MaterialhistoryStockAndSalesUtility[];
    thirdSubscription: Subscription;
    transferClassificationSubscription: Subscription;
    thirdAuthSubscription: Subscription;
    usrSubscription: Subscription;
    materialhistoriesToDisplay: {
        id ? : number,
        code ? : string,
        creationDate ? : any,
        price ? : number,
        comments ? : string,
        userMod ? : number,
        itemTransfereds ? : BaseEntity[],
        transferClassifId ? : number,
        warehousefromId ? : number,
        warehousetoId ? : number,
        userModName ? : string,
        materialclassificationDescription ? : string
    }[];
    authThirdsList: UserAuthorizedThird[];

    userList: User[];
    userServiceSubscription: Subscription;
    historySubscription: Subscription;
    dashboards: any[]; //DashboardStockAndSalesUtility[];
    currentAccount: any;
    eventSubscriber: Subscription;
    bpReadings: any = {};
    bpOptions: any = {};
    thirdList: ThirdStockAndSalesUtility[];
    transferSource: number;
    transferDest: number;
    dashboardsToDisplay: any[];

    constructor(
        private dashboardService: DashboardStockAndSalesUtilityService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private materialhistoryService: MaterialhistoryStockAndSalesUtilityService,
        private userService: UserService,
        private autThirds: UserAuthorizedThirdService,
        private thirdService: ThirdStockAndSalesUtilityService,
        private transferclassificationService: TransferclassificationStockAndSalesUtilityService
    ) {}

    loadAll() {
        this.dashboardService.query().subscribe(
            (res: HttpResponse < DashboardStockAndSalesUtility[] > ) => {
             /*   this.dashboards = res.body;
                this.dashboards.push(new DashboardStockAndSalesUtility(1, new Date(), 12, 1, 1001, 1401, 1251, 12));
                this.dashboards[0].warehouseOutgName = 'haaaa';*/
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.historySubscription = this.materialhistoryService
            .query({})
            .subscribe(
                (res: HttpResponse < MaterialhistoryStockAndSalesUtility[] > ) => {
                    this.onSuccess(res.body, res.headers);
                    this.userServiceSubscription = this.userService.query().subscribe(
                        (res1: HttpResponse < User[] > ) => {
                            this.userList = res1.body;
                            this.materialhistoriesToDisplay.forEach((item) =>
                                this.userList.forEach((element) => {
                                    if (element.id === item.userMod) {
                                        item.userModName = element.login;
                                    }
                                })
                            );
                        },
                        (res1: HttpErrorResponse) => this.onError(res1.message));
                    this.usrSubscription = this.userService.find(this.currentAccount.login).subscribe((user: HttpResponse < User > ) => {
                        const resuser: User = user.body;
                        this.thirdAuthSubscription = this.autThirds.query({
                            'userAuthId.equals': resuser.id
                        }).subscribe((reslist: HttpResponse < UserAuthorizedThird[] > ) => {
                            this.authThirdsList = reslist.body;
                            this.materialhistoryService.setDefaultThird(
                                this.thirdList.find((third: ThirdStockAndSalesUtility) => {
                                    return this.authThirdsList.find((thirdAuth) => {
                                        return thirdAuth.defaultThird === true;
                                    }).thirdAuthId === third.id;
                                })
                            );

                            this.materialhistoryService.setDefaultDestination(
                                this.thirdList.find((third: ThirdStockAndSalesUtility) => {
                                    return this.authThirdsList.find((thirdAuth) => {
                                        return thirdAuth.defaultDestination === true;
                                    }).thirdAuthId === third.id;
                                })
                            );

                            const mat: MaterialhistoryStockAndSalesUtility[] = this.materialhistoriesToDisplay.slice();
                            this.materialhistoriesToDisplay = mat.filter((element) => {
                                for (const authList of this.authThirdsList) {
                                    if (authList.thirdAuthId === element.warehousefromId ||
                                        authList.thirdAuthId === element.warehousetoId) {
                                        return true;
                                    }
                                }
                            });

                            this.dashboards = this.materialhistoriesToDisplay.slice();
                            this.dashboards.forEach((element) => {
                                element.numberOfItems = element.itemTransfereds.length;
                                element.profitAndLoss = 0;
                                element.currencyForDashboardName = 'CHF';
                            });

                            if ((this.dashboardsToDisplay === undefined || this.dashboardsToDisplay === null) && this.dashboards) {
                                this.dashboardsToDisplay = [];
                                this.dashboardsToDisplay.push(this.dashboards[0]);
                            }

                            if (this.dashboards && this.dashboardsToDisplay) {
                                for (let index2 = 0; index2 < this.dashboardsToDisplay.length; index2++) {
                                for (let index = 1; index < this.dashboards.length; index++) {
                                        if (this.dashboards[index].warehousefromId === this.dashboardsToDisplay[index2].warehousefromId &&
                                            this.dashboards[index].transferClassifId === this.dashboardsToDisplay[index2].transferClassifId &&
                                            this.dashboards[index].creationDate.getTime() === this.dashboardsToDisplay[index2].creationDate.getTime()) {
                                            if (!this.dashboards[index].numberOfItems) {
                                             //   this.dashboards[index].numberOfItems = 0;
                                            }
                                            if (!this.dashboardsToDisplay[index2].numberOfItems) {
                                                this.dashboardsToDisplay[index2].numberOfItems = 0;
                                            }
                                          ////  this.dashboardsToDisplay[index2].numberOfItems = this.dashboardsToDisplay[index2].numberOfItems +
                                          //  this.dashboards[index].numberOfItems;
                                        } else {
                                          //  tmpDashboard.push(this.dashboards[index]);
                                        }
                                }
                                }
                            }
                            const thirds = this.thirdList.slice();
                            this.thirdList = thirds.filter((element) => {
                                for (const authList of this.authThirdsList) {
                                    if (authList.thirdAuthId === element.id) {
                                        return true;
                                    }
                                }
                            });
                            this.transferDest = this.materialhistoryService.getDefaultDestination().id;
                            this.transferSource = this.materialhistoryService.getDefaultThird().id;

                        });
                    });
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.transferClassificationSubscription = this.transferclassificationService
            .query()
            .subscribe(
                (res: HttpResponse < TransferclassificationStockAndSalesUtility[] > ) => {
                    this.transferclassifications = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.thirdSubscription = this.thirdService.query().subscribe(
            (res: HttpResponse < ThirdStockAndSalesUtility[] > ) => {
                this.thirdList = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.principal.hasAuthority('ROLE_ADMIN').then((hasAuth) => {
            this.hasAdminAuth = hasAuth;
        });

    }

    private onSuccess(data, headers) {
        this.materialhistories = data;
        console.log(this.materialhistories);
        this.materialhistoriesToDisplay = this.materialhistories.slice();
        console.log('PUTAIN');
        console.log( this.materialhistoriesToDisplay);
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDashboards();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DashboardStockAndSalesUtility) {
        return item.id;
    }
    registerChangeInDashboards() {
        this.eventSubscriber = this.eventManager.subscribe('dashboardListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
