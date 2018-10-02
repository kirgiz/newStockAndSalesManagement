import {MaterialclassificationStockAndSalesUtilityService} from '../materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility.service';
import {MaterialclassificationStockAndSalesUtility} from '../materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility.model';
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
    materialTypeList: MaterialclassificationStockAndSalesUtility[];
    materialType: number;
    materialClassificationSubscription: any;
    data: any;
    options: { chart: { type: string; height: number; margin:
        { top: number; right: number; bottom: number; left: number; };
        x: (d: any) => any; y: (d: any) => any; useInteractiveGuideline: boolean;
        xAxis: { axisLabel: string; tickFormat: (d: any) => string}; yAxis: { axisLabel: string; tickFormat: (d: any) => string; axisLabelDistance: number; };
     }; };
    transferclassifications: TransferclassificationStockAndSalesUtility[];
    hasAdminAuth: boolean;
    materialhistories: MaterialhistoryStockAndSalesUtility[];
    thirdSubscription: Subscription;
    transferClassificationSubscription: Subscription;
    thirdAuthSubscription: Subscription;
    usrSubscription: Subscription;
    materialhistoriesToDisplay: {
        id ?: number,
        code ?: string,
        creationDate ?: any,
        price ?: number,
        comments ?: string,
        userMod ?: number,
        itemTransfereds ?: BaseEntity[],
        transferClassifId ?: number,
        warehousefromId ?: number,
        warehousetoId ?: number,
        userModName ?: string,
        materialclassificationDescription ?: string
    }[];
    authThirdsList: UserAuthorizedThird[];

    userList: User[];
    userServiceSubscription: Subscription;
    historySubscription: Subscription;
    dashboards: any[]; // DashboardStockAndSalesUtility[];
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
    dashboardsToDisplay3:any[];

    constructor(
        private dashboardService: DashboardStockAndSalesUtilityService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private materialhistoryService: MaterialhistoryStockAndSalesUtilityService,
        private userService: UserService,
        private autThirds: UserAuthorizedThirdService,
        private thirdService: ThirdStockAndSalesUtilityService,
        private transferclassificationService: TransferclassificationStockAndSalesUtilityService,
        private materialClassificationService: MaterialclassificationStockAndSalesUtilityService
    ) {}

    loadAll() {
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
                                this.dashboardsToDisplay = [];
                            if (this.dashboards && this.dashboardsToDisplay) {
                                    for (let index = 0; index < this.dashboards.length; index++) {
                                        const indexArray = this.dashboardsToDisplay.findIndex((element) => {
                                            return ( this.dashboards[index].warehousefromId === element.warehousefromId &&
                                                this.dashboards[index].transferClassifId === element.transferClassifId &&
                                                this.dashboards[index].creationDate.getTime() === element.creationDate.getTime());
                                        });
                                        if (indexArray > -1) {
                                          if (  !this.dashboardsToDisplay[indexArray].numberOfItems ) {
                                            this.dashboardsToDisplay[indexArray].numberOfItems = 0;
                                          }
                                          if (  !this.dashboards[index].numberOfItems ) {
                                            this.dashboards[index].numberOfItems = 0;
                                          }
                                            this.dashboardsToDisplay[indexArray].numberOfItems = this.dashboardsToDisplay[indexArray].numberOfItems +
                                            this.dashboards[index].numberOfItems;
                                        } else { this.dashboardsToDisplay.push(this.dashboards[index]);
                                        }

                            }
                            this.dashboardsToDisplay2 = this.dashboardsToDisplay.slice();
                            for (let i = 0; i < 60; i++) {
                                this.dashboardsToDisplay2.push({...this.dashboardsToDisplay2[0], creationDate:
                                    new Date(this.dashboardsToDisplay2[0].creationDate.getTime() + i * 60 * 60 * 1000 * 24) , numberOfItems: i + 1 });
                               /*  this.dashboardsToDisplay2[i + 1].creationDate.setDate(this.dashboardsToDisplay2[ i + 1].creationDate.getDate() + i );
                                this.dashboardsToDisplay2[i + 1].numberOfItems = this.dashboardsToDisplay2[i + 1].numberOfItems + 1;
                               this.dashboardsToDisplay2.push(this.dashboardsToDisplay2[1]);
                                this.dashboardsToDisplay2[i + 2].creationDate.setDate(this.dashboardsToDisplay2[i + 1].creationDate.getDate() + i );
                                this.dashboardsToDisplay2[i + 2].numberOfItems = this.dashboardsToDisplay2[ i + 2 ].numberOfItems + 1;*/
                            }





                            this.options = {
                                chart: {
                                  type: 'lineChart',
                                  height: 450,
                                  margin : {
                                    top: 20,
                                    right: 20,
                                    bottom: 40,
                                    left: 55
                                  },
                                  x: function(d){ return d.x; },
                                  y: function(d){ return d.y; },
                                  useInteractiveGuideline: true,
                                  xAxis: {
                                    axisLabel: 'Jours',
                                 //   tickFormat:
                                 tickFormat:function(d) {
                                     return d3.time.format('%b %d')(new Date(d)); }
                                  },
                                  yAxis: {
                                    axisLabel: 'Ventes',
                                    tickFormat: function(d){
                                      return d3.format('.02f')(d);
                                    },
                                    axisLabelDistance: -10
                                  }
                                }
                              };

                              this.materialClassificationSubscription = this.materialClassificationService.query().subscribe(
                                (res1: HttpResponse<MaterialclassificationStockAndSalesUtility[]>) => {
                                  this.materialTypeList = res1.body;
                                  for (let index = 0; index < this.materialTypeList.length; index++) {
                                     let tmpData = this.dashboardsToDisplay2.filter( (element) => {
                                         return element.materialclassification === this.materialTypeList[index];
                                     } );
                                   //  let tmpData = this.dashboardsToDisplay2.filter( (element) => {
                                     const groupBy = (items, key) => items.reduce(
                                        (result, item) => ({
                                          ...result,
                                          [item[key]]: [
                                            ...(result[item[key]] || []),
                                            item,
                                          ],
                                        }),
                                        {},
                                      );

                                      groupBy(tmpData, 'creationDate');
                                      this.dashboardsToDisplay3.push(tmpData);

// https://stackoverflow.com/questions/14446511/what-is-the-most-efficient-method-to-groupby-on-a-javascript-array-of-objects
                                 /*    tmpData.sort(function(a, b) {
                                        return a.getTime() - b.getTime();
                                      });;

                                   for (let index = 0; index < tmpData.length; index++) {
                                      if (this.dashboardsToDisplay3  && )

                                   }


          */

                                  }

                                  this.data = this.buildGraphData();
                                },
                                (res1: HttpErrorResponse) => this.onError(res1.message)
                              );


                              this.transferClassificationSubscription = this.transferclassificationService
                              .query()
                              .subscribe(
                                  (res: HttpResponse < TransferclassificationStockAndSalesUtility[] > ) => {
                                      this.transferclassifications = res.body;
                                  },
                                  (res: HttpErrorResponse) => this.onError(res.message)
                              );

                        }

// TO DO : Allow grouping by month instead of days + chart

                        console.log(this.dashboardsToDisplay);
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
                            this.filterResults();

                        });
                    });
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

    buildGraphData() {
        let retvar: {values:any[],key: string, color: string }[]=[];
       let tmp = [] ;
       let matTypeDesc : string;
        /* let all_return
        let sin = [],sin2 = [],
          cos = [];*/
     this.dashboardsToDisplay3.forEach((element) => {
        tmp.push({x: element.creationDate , y: element.numberOfItems});
      });

      matTypeDesc =  this.materialTypeList.find( (elementMat) => {
        return elementMat.materialCategories ===  tmp[0].id
   }).name;

   retvar.push({values:tmp,key: matTypeDesc, color: '#ff7f0e' });

        //Data is represented as an array of {x,y} pairs.
      /*  for (var i = 0; i < 100; i++) {
          sin.push({x: i, y: Math.sin(i/10)});
          sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
          cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
        }*/
        //Line chart data should be sent as an array of series objects.
        return  retvar;
        /* [
          {
            values: sin,      //values - represents the array of {x,y} data points
            key: 'Sine Wave', //key  - the name of the series.
            color: '#ff7f0e'  //color - optional: choose your own line color.
          },
          {
            values: cos,
            key: 'Cosine Wave',
            color: '#2ca02c'
          },
          {
            values: sin2,
            key: 'Another sine wave',
            color: '#7777ff',
            area: true      //area - set to true if you want
            //this line to turn into a filled area chart.
          }
        ];*/
      }

    private onSuccess(data, headers) {
        this.materialhistories = data;
        this.materialhistoriesToDisplay = this.materialhistories.slice();
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

    private filterResults() {
       // this.dashboards
            const dash = this.dashboardsToDisplay2.filter(
              (item) => {
                return (
                  (item.transferClassifId === this.transferClassifId ||
                    this.transferClassifId === null ||
                    !this.transferClassifId) &&
                    (item.materialclassificationId === this.materialType ||
                        this.materialType === null ||
                        !this.materialType) &&
                  (item.warehousefromId === this.transferSource ||
                    this.transferSource === null ||
                    !this.transferSource) /*  &&
                 (item.warehousetoId === this.transferDest ||
                    this.transferDest === null ||
                    !this.transferDest)*/
                );
              }
            );
            this.dashboardsToDisplay =  dash.slice();
            // console.log(this.materialhistoriesToDisplay);
          }

}
