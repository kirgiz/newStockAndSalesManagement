import { MaterialclassificationStockAndSalesUtilityService } from '../materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility.service';
import { MaterialclassificationStockAndSalesUtility } from '../../shared/model/materialclassification-stock-and-sales-utility.model';
import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { DashboardStockAndSalesUtility } from '../../shared/model/dashboard-stock-and-sales-utility.model';
import { TransferclassificationStockAndSalesUtility } from '../../shared/model/transferclassification-stock-and-sales-utility.model';
import { MaterialhistoryStockAndSalesUtility } from '../materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility.model';
import { MaterialhistoryStockAndSalesUtilityService } from '../materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility.service';
import { BaseEntity } from '../../shared/model/base-entity.model';
import { ITEMS_PER_PAGE } from '../../shared/constants/pagination.constants';
import { TransferclassificationStockAndSalesUtilityService } from '../transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility.service';
import { ThirdStockAndSalesUtility } from '../../shared/model/third-stock-and-sales-utility.model';
import { ThirdStockAndSalesUtilityService } from '../third-stock-and-sales-utility/third-stock-and-sales-utility.service';
import { UserService } from '../../../app/core/user/user.service';
import { UserAuthorizedThirdService } from '../user-authorized-third/user-authorized-third.service';
import { UserAuthorizedThird } from '../../shared/model/user-authorized-third.model';
import { CompanyStockAndSalesUtility, ICompanyStockAndSalesUtility } from '../../shared/model/company-stock-and-sales-utility.model';
import { CurrencyStockAndSalesUtility, ICurrencyStockAndSalesUtility } from '../../shared/model/currency-stock-and-sales-utility.model';
import { MaterialStockAndSalesUtility } from '../../shared/model/material-stock-and-sales-utility.model';
import { CompanyStockAndSalesUtilityService } from '../company-stock-and-sales-utility';
import { CurrencyStockAndSalesUtilityService } from '../currency-stock-and-sales-utility';
import { MaterialStockAndSalesUtilityService } from '../material-stock-and-sales-utility';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { IDashboardStockAndSalesUtility } from 'app/shared/model/dashboard-stock-and-sales-utility.model';
import { Principal, User } from 'app/core';
import { DashboardStockAndSalesUtilityService } from './dashboard-stock-and-sales-utility.service';
import { LotStockAndSalesUtilityService } from '../lot-stock-and-sales-utility';
import { ILotStockAndSalesUtility, LotStockAndSalesUtility } from '../../shared/model/lot-stock-and-sales-utility.model';
import { ForexratesStockAndSalesUtilityService } from '../forexrates-stock-and-sales-utility';
import { ForexratesStockAndSalesUtility } from '../../shared/model/forexrates-stock-and-sales-utility.model';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
    selector: 'jhi-dashboard-stock-and-sales-utility',
    templateUrl: './dashboard-stock-and-sales-utility.component.html',
    styleUrls: ['../../../../../../node_modules/nvd3/build/nv.d3.css'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardStockAndSalesUtilityComponent implements OnInit, OnDestroy {
    fromDate: any;
    toDate: any;
    inventories: any[];
    predicate: string;
    reverse: string;
    previousPage: number;
    page: number;
    materials: MaterialStockAndSalesUtility[];
    currency: CurrencyStockAndSalesUtility;
    company: CompanyStockAndSalesUtility[];
    materialTypeList: MaterialclassificationStockAndSalesUtility[];
    materialType: number;
    materialClassificationSubscription: any;
    data: any;
    options: {
        chart: {
            type: string;
            height: number;
            margin: { top: number; right: number; bottom: number; left: number };
            x: (d: any) => any;
            y: (d: any) => any;
            useInteractiveGuideline: boolean;
            xAxis: { axisLabel: string; tickFormat: (d: any) => string };
            yAxis: { axisLabel: string; tickFormat: (d: any) => string; axisLabelDistance: number };
        };
    };

    dataPnL: any;
    optionsPnL: {
        chart: {
            type: string;
            height: number;
            margin: { top: number; right: number; bottom: number; left: number };
            x: (d: any) => any;
            y: (d: any) => any;
            useInteractiveGuideline: boolean;
            xAxis: { axisLabel: string; tickFormat: (d: any) => string };
            yAxis: { axisLabel: string; tickFormat: (d: any) => string; axisLabelDistance: number };
        };
    };

    transferclassifications: TransferclassificationStockAndSalesUtility[];
    hasAdminAuth: boolean;
    materialhistories: MaterialhistoryStockAndSalesUtility[];
    thirdSubscription: Subscription;
    transferClassificationSubscription: Subscription;
    thirdAuthSubscription: Subscription;
    usrSubscription: Subscription;
    materialhistoriesToDisplay: {
        id?: number;
        code?: string;
        creationDate?: any;
        price?: number;
        comments?: string;
        userMod?: number;
        itemTransfereds?: MaterialStockAndSalesUtility[];
        transferClassifId?: number;
        warehousefromId?: number;
        warehousetoId?: number;
        userModName?: string;
        materialclassificationDescription?: string;
        profitAndLoss?: number;
    }[];
    authThirdsList: UserAuthorizedThird[];

    userList: User[];
    userServiceSubscription: Subscription;
    historySubscription: Subscription;
    dashboards: any[];
    currentAccount: any;
    eventSubscriber: Subscription;
    bpReadings: any = {};
    bpOptions: any = {};
    thirdList: ThirdStockAndSalesUtility[];
    transferSource: number;
    transferDest: number;
    dashboardsToDisplay: any[];
    transferClassifId: number;
    dashboardsToDisplay2: any[];
    dashboardsToDisplay3: any[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private materialhistoryService: MaterialhistoryStockAndSalesUtilityService,
        private userService: UserService,
        private autThirds: UserAuthorizedThirdService,
        private thirdService: ThirdStockAndSalesUtilityService,
        private transferclassificationService: TransferclassificationStockAndSalesUtilityService,
        private materialClassificationService: MaterialclassificationStockAndSalesUtilityService,
        private companyService: CompanyStockAndSalesUtilityService,
        private currencyService: CurrencyStockAndSalesUtilityService,
        private materialService: MaterialStockAndSalesUtilityService,
        private lotService: LotStockAndSalesUtilityService,
        private forexratesService: ForexratesStockAndSalesUtilityService
    ) {
        this.page = 1; // data.pagingParams.page;
        this.previousPage = 1; // data.pagingParams.page;
        this.reverse = 'asc'; // data.pagingParams.ascending;
        this.predicate = 'id'; // data.pagingParams.predicate;
    }

    loadAll() {
        this.historySubscription = this.materialhistoryService.query({}).subscribe(
            (res: HttpResponse<MaterialhistoryStockAndSalesUtility[]>) => {
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

                            const mat: MaterialhistoryStockAndSalesUtility[] = this.materialhistoriesToDisplay.slice();
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

                            this.computePNL();

                            this.companyService
                                .query()
                                .pipe(take(1))
                                .subscribe((company: HttpResponse<ICompanyStockAndSalesUtility[]>) => {
                                    this.company = company.body;
                                    this.currencyService
                                        .find(this.company[0].baseCurrencyId)
                                        .subscribe((currency: HttpResponse<ICurrencyStockAndSalesUtility>) => {
                                            this.currency = currency.body;
                                            this.dashboards = this.materialhistoriesToDisplay.slice();
                                            this.dashboards.forEach(element => {
                                                element.numberOfItems = element.itemTransfereds.length;
                                                element.profitAndLoss = 0;
                                                element.currencyForDashboardName = this.currency.isoCode;
                                            });

                                            this.dashboardsToDisplay = [];
                                            //   this.computePNL();
                                            if (this.dashboards && this.dashboardsToDisplay) {
                                                this.dashboardsToDisplay = this.dashboards;
                                                this.dashboardsToDisplay2 = this.dashboardsToDisplay.slice();
                                                this.options = {
                                                    chart: {
                                                        type: 'lineChart',
                                                        height: 450,
                                                        margin: {
                                                            top: 20,
                                                            right: 20,
                                                            bottom: 40,
                                                            left: 55
                                                        },
                                                        x(d) {
                                                            return d.x;
                                                        },
                                                        y(d) {
                                                            return d.y;
                                                        },
                                                        useInteractiveGuideline: true,
                                                        xAxis: {
                                                            axisLabel: 'Jours',
                                                            tickFormat(d) {
                                                                return d3.time.format('%b %d')(new Date(d));
                                                            }
                                                        },
                                                        yAxis: {
                                                            axisLabel: 'Ventes',
                                                            tickFormat(d) {
                                                                return d3.format('.02f')(d);
                                                            },
                                                            axisLabelDistance: -10
                                                        }
                                                    }
                                                };

                                                this.optionsPnL = {
                                                    chart: {
                                                        type: 'discreteBarChart',
                                                        height: 450,
                                                        margin: {
                                                            top: 20,
                                                            right: 20,
                                                            bottom: 40,
                                                            left: 55
                                                        },
                                                        x(d) {
                                                            return d.x;
                                                        },
                                                        y(d) {
                                                            return d.y;
                                                        },
                                                        useInteractiveGuideline: true,
                                                        xAxis: {
                                                            axisLabel: 'Jours',
                                                            tickFormat(d) {
                                                                return d3.time.format('%b %d')(new Date(d));
                                                            }
                                                        },
                                                        yAxis: {
                                                            axisLabel: 'Profit / Perte',
                                                            tickFormat(d) {
                                                                return d3.format('.02f')(d);
                                                            },
                                                            axisLabelDistance: -10
                                                        }
                                                    }
                                                };
                                                this.dashboardsToDisplay3 = [];
                                                const result = [];
                                                this.materialClassificationSubscription = this.materialClassificationService
                                                    .query()
                                                    .subscribe(
                                                        (res1: HttpResponse<MaterialclassificationStockAndSalesUtility[]>) => {
                                                            this.materialTypeList = res1.body;
                                                            for (let index = 0; index < this.materialTypeList.length; index++) {
                                                                const tmpData = this.dashboardsToDisplay2.filter(element => {
                                                                    return (
                                                                        element.materialclassificationId === this.materialTypeList[index].id
                                                                    );
                                                                });

                                                                tmpData.reduce(function(res2, value) {
                                                                    if (!res2[value.creationDate]) {
                                                                        res2[value.creationDate] = {
                                                                            ...value,
                                                                            numberOfItems: 0,
                                                                            profitAndLoss: 0
                                                                        };
                                                                        result.push(res2[value.creationDate]);
                                                                    }
                                                                    res2[value.creationDate].numberOfItems += value.numberOfItems;
                                                                    res2[value.creationDate].profitAndLoss += value.profitAndLoss;
                                                                    return res2;
                                                                }, {});
                                                            }
                                                            this.dashboardsToDisplay = result.slice();
                                                            this.data = this.buildGraphData();
                                                            this.computePNL();
                                                            this.dataPnL = this.buildGraphDataPnL();
                                                        },
                                                        (res1: HttpErrorResponse) => this.onError(res1.message)
                                                    );

                                                this.transferClassificationSubscription = this.transferclassificationService
                                                    .query()
                                                    .subscribe(
                                                        (res1: HttpResponse<TransferclassificationStockAndSalesUtility[]>) => {
                                                            this.transferclassifications = res1.body;
                                                        },
                                                        (res1: HttpErrorResponse) => this.onError(res1.message)
                                                    );
                                            }

                                            // TO DO : Allow grouping by month instead of days + chart

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
                                            // this.computePNL();
                                            this.filterResults();
                                        });
                                });
                        });
                });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.thirdSubscription = this.thirdService.query().subscribe(
            (res: HttpResponse<ThirdStockAndSalesUtility[]>) => {
                this.thirdList = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.principal.hasAuthority('ROLE_ADMIN').then(hasAuth => {
            this.hasAdminAuth = hasAuth;
        });
    }
    private computePNL() {
        const tmpDash = this.materialhistoriesToDisplay
            .sort((item1, item2) => {
                return parseInt(item1.creationDate.format('YYYYMMDD'), 10) - parseInt(item2.creationDate.format('YYYYMMDD'), 10);
            })
            .slice();
        this.materialhistoriesToDisplay = tmpDash.slice();
        /*  console.log(' this.materialhistoriesToDisplay ');
        console.log(this.materialhistoriesToDisplay);*/

        let fxrates: ForexratesStockAndSalesUtility[];
        const fxRatesSubscription = this.forexratesService.query().subscribe((res1: HttpResponse<ForexratesStockAndSalesUtility[]>) => {
            fxrates = res1.body;
            const lotSubscription = this.lotService.query().subscribe((res: HttpResponse<LotStockAndSalesUtility[]>) => {
                const lots = res.body;
                for (const dashboard of this.materialhistoriesToDisplay) {
                    let pnlTransfer = 0;
                    const transferPrice = dashboard.price;
                    const itemTransfereds = dashboard.itemTransfereds;
                    if (itemTransfereds) {
                        for (const item of itemTransfereds) {
                            const filteredLot = lots.filter(lot => {
                                if (item.lotIdentifierId === lot.id) {
                                    return true;
                                }
                            });
                            const lotFxRate: number = this.closestFxrate(
                                fxrates,
                                filteredLot[0].creationDate,
                                filteredLot[0].buycurrencylotId
                            ).straighRate;
                            const dashfx: number = this.closestFxrate(fxrates, dashboard.creationDate, filteredLot[0].buycurrencylotId)
                                .straighRate;
                            const lotBuyPriceCompanyCCY: number = filteredLot[0].unitBuyPrice;
                            pnlTransfer = dashboard.price - lotBuyPriceCompanyCCY * dashfx;
                            dashboard.profitAndLoss = dashboard.profitAndLoss + pnlTransfer;
                            /*      console.log('*********************************************************');
                            console.log(dashboard.creationDate);
                            console.log(dashboard.price);
                            console.log(lotBuyPriceCompanyCCY);
                            console.log(dashfx);
                            console.log(dashboard.profitAndLoss);*/
                        }
                    }
                }
            });
            /*    console.log('PPPPPPPPPPPPPPPPPPPPPP');
            console.log(this.materialhistoriesToDisplay);*/
        });
    }

    private closestFxrate(fxrates: ForexratesStockAndSalesUtility[], date: Moment, currency: number) {
        const fx = fxrates
            .filter(item => {
                return (
                    item.rateForCurrencyId === currency &&
                    parseInt(item.rateDate.format('YYYYMMDD'), 10) <= parseInt(date.format('YYYYMMDD'), 10)
                );
            })
            .sort((item1, item2) => {
                return parseInt(item2.rateDate.format('YYYYMMDD'), 10) - parseInt(item1.rateDate.format('YYYYMMDD'), 10);
            });
        console.log('FXXXXXXXXXXXXXXXXXXXXX');
        console.log(fx);
        console.log(date);
        console.log(fx[0]);
        console.log(currency);
        return fx[0];
        /* return fxrates.reduce((p, v) => {
            return parseInt(p.rateDate.format('YYYYMMDD'), 10) <= parseInt(v.rateDate.format('YYYYMMDD'), 10) &&
                parseInt(p.rateDate.format('YYYYMMDD'), 10) <= parseInt(date.format('YYYYMMDD'), 10) &&
                parseInt(v.rateDate.format('YYYYMMDD'), 10) <= parseInt(date.format('YYYYMMDD'), 10) &&
                p.rateForCurrencyId === currency && v.rateForCurrencyId
                ? p
                : v;
        });*/
    }

    /*   ngAfterViewInit(): void {
        this.computePNL();
this.filterResults();
    }*/

    /*
 * Return a random number within the defined range,
 * random(0, 5) would return a number between 0 and 5.
 */
    random(max, min) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    toHex(numbers) {
        let r = numbers.r.toString(16),
            g = numbers.g.toString(16),
            b = numbers.b.toString(16);

        if (r.length === 1) {
            r = 0 + r;
        }
        if (g.length === 1) {
            g = 0 + g;
        }
        if (b.length === 1) {
            b = 0 + b;
        }

        return r + g + b;
    }

    buildGraphData() {
        const retvar: { values: any[]; key: string; color: string; area: boolean }[] = [];
        let matTypeDesc: string;
        for (let i = 0; i < this.materialTypeList.length; i++) {
            const tmp = [];
            const tmpdash = this.dashboardsToDisplay.filter(elle => {
                return this.materialTypeList[i].id === elle.materialclassificationId;
            });
            tmpdash.forEach(element => {
                tmp.push({ x: element.creationDate, y: element.numberOfItems });
            });

            matTypeDesc = this.materialTypeList[i].name;
            const rgb = {
                r: this.random(0, 255) /* 2 */,
                g: this.random(0, 255),
                b: this.random(0, 255)
            };
            const lcolor = this.toHex(rgb);
            retvar.push({ values: tmp, key: matTypeDesc, color: lcolor, area: false });
        }
        return retvar;
    }

    buildGraphDataPnL() {
        const retvar: { values: any[]; key: string; color: string; area: boolean }[] = [];
        let matTypeDesc: string;
        for (let i = 0; i < this.materialTypeList.length; i++) {
            const tmp = [];
            const tmpdash = this.dashboardsToDisplay.filter(elle => {
                return this.materialTypeList[i].id === elle.materialclassificationId;
            });
            tmpdash.forEach(element => {
                tmp.push({ x: element.creationDate, y: element.profitAndLoss });
            });

            matTypeDesc = this.materialTypeList[i].name;
            const rgb = {
                r: this.random(0, 255),
                g: this.random(0, 255),
                b: this.random(0, 255)
            };
            const lcolor = this.toHex(rgb);
            retvar.push({ values: tmp, key: matTypeDesc, color: lcolor, area: false });
        }
        return retvar;
    }

    private onSuccess(data, headers) {
        this.materialhistories = data;
        this.materialhistoriesToDisplay = this.materialhistories.slice();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
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

    trackTransferclassificationById(index: number, item: TransferclassificationStockAndSalesUtility) {
        return item.id;
    }

    registerChangeInDashboards() {
        this.eventSubscriber = this.eventManager.subscribe('dashboardListModification', response => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    filterResults() {
        /*  this.computePNL();*/
        const dash = this.dashboardsToDisplay2.filter(item => {
            if (item.creationDate) {
                return (
                    (item.transferClassifId === this.transferClassifId || this.transferClassifId === null || !this.transferClassifId) &&
                    (item.materialclassificationId === this.materialType || this.materialType === null || !this.materialType) &&
                    (item.warehousefromId === this.transferSource || this.transferSource === null || !this.transferSource) &&
                    (!this.fromDate ||
                        ((this.fromDate &&
                            (parseInt(item.creationDate.format('YYYYMMDD'), 10) > parseInt(this.fromDate.format('YYYYMMDD'), 10) ||
                                parseInt(item.creationDate.format('YYYYMMDD'), 10) === parseInt(this.fromDate.format('YYYYMMDD'), 10))) ||
                            this.fromDate === null)) &&
                    (!this.toDate ||
                        ((this.toDate &&
                            parseInt(item.creationDate.format('YYYYMMDD'), 10) <= parseInt(this.toDate.format('YYYYMMDD'), 10)) ||
                            this.toDate === null))
                );
            } else {
                return false;
            }
        });

        const result = [];
        if (this.materialTypeList) {
            for (let index = 0; index < this.materialTypeList.length; index++) {
                const tmpData = dash.filter(element => {
                    return element.materialclassificationId === this.materialTypeList[index].id;
                });
                tmpData.reduce(function(res2, value) {
                    if (!res2[value.creationDate]) {
                        res2[value.creationDate] = {
                            ...value,
                            numberOfItems: 0,
                            profitAndLoss: 0
                        };
                        result.push(res2[value.creationDate]);
                    }
                    res2[value.creationDate].numberOfItems += value.numberOfItems;
                    res2[value.creationDate].profitAndLoss += value.profitAndLoss;
                    return res2;
                }, {});
            }
            this.dashboardsToDisplay = result.slice();
            this.data = this.buildGraphData();
            this.dataPnL = this.buildGraphDataPnL();
        }

        this.materialService.queryAll().subscribe((materialsres: HttpResponse<MaterialStockAndSalesUtility[]>) => {
            const materials = materialsres.body;
            const tmpData = materials.filter(element => {
                return element.currentLocation === this.transferSource;
            });

            const result2 = [];

            tmpData.reduce(function(res2, value) {
                if (!res2[value.materialTypeCatId]) {
                    res2[value.materialTypeCatId] = {
                        ...value,
                        numberOfItems: 0
                    };
                    result2.push(res2[value.materialTypeCatId]);
                }
                res2[value.materialTypeCatId].numberOfItems += 1;
                return res2;
            }, {});

            this.inventories = result2;
        });
    }
}
