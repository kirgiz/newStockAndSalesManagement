import { MaterialclassificationStockAndSalesUtilityService } from '../materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility.service';
import { MaterialclassificationStockAndSalesUtility } from '../materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { DashboardStockAndSalesUtility } from './dashboard-stock-and-sales-utility.model';
import { TransferclassificationStockAndSalesUtility } from '../transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility.model';
import { MaterialhistoryStockAndSalesUtility } from '../materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility.model';
import { MaterialhistoryStockAndSalesUtilityService } from '../materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility.service';
import { ITEMS_PER_PAGE, Principal, User, BaseEntity } from '../../shared';
import { TransferclassificationStockAndSalesUtilityService } from '../transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility.service';
import { ThirdStockAndSalesUtility } from '../third-stock-and-sales-utility/third-stock-and-sales-utility.model';
import { ThirdStockAndSalesUtilityService } from '../third-stock-and-sales-utility/third-stock-and-sales-utility.service';
import { UserService } from '../../shared/user/user.service';
import { UserAuthorizedThirdService } from '../user-authorized-third/user-authorized-third.service';
import { UserAuthorizedThird } from '../user-authorized-third';
import { CompanyStockAndSalesUtilityService, CompanyStockAndSalesUtility } from '../company-stock-and-sales-utility';
import { CurrencyStockAndSalesUtilityService, CurrencyStockAndSalesUtility } from '../currency-stock-and-sales-utility';

@Component({
	selector: 'jhi-dashboard-stock-and-sales-utility',
	templateUrl: './dashboard-stock-and-sales-utility.component.html'
})
export class DashboardStockAndSalesUtilityComponent implements OnInit, OnDestroy {
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
		itemTransfereds?: BaseEntity[];
		transferClassifId?: number;
		warehousefromId?: number;
		warehousetoId?: number;
		userModName?: string;
		materialclassificationDescription?: string;
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
        private currencyService: CurrencyStockAndSalesUtilityService
	) {}

	loadAll() {
		this.historySubscription = this.materialhistoryService.query({}).subscribe(
			(res: HttpResponse<MaterialhistoryStockAndSalesUtility[]>) => {
				this.onSuccess(res.body, res.headers);
				this.userServiceSubscription = this.userService.query().subscribe(
					(res1: HttpResponse<User[]>) => {
						this.userList = res1.body;
						this.materialhistoriesToDisplay.forEach((item) =>
							this.userList.forEach((element) => {
								if (element.id === item.userMod) {
									item.userModName = element.login;
								}
							})
						);
					},
					(res1: HttpErrorResponse) => this.onError(res1.message)
				);
				this.usrSubscription = this.userService
					.find(this.currentAccount.login)
					.subscribe((user: HttpResponse<User>) => {
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
											this.authThirdsList.find((thirdAuth) => {
												return thirdAuth.defaultThird === true;
											}).thirdAuthId === third.id
										);
									})
								);

								this.materialhistoryService.setDefaultDestination(
									this.thirdList.find((third: ThirdStockAndSalesUtility) => {
										return (
											this.authThirdsList.find((thirdAuth) => {
												return thirdAuth.defaultDestination === true;
											}).thirdAuthId === third.id
										);
									})
                                );
                                


								const mat: MaterialhistoryStockAndSalesUtility[] = this.materialhistoriesToDisplay.slice();
								this.materialhistoriesToDisplay = mat.filter((element) => {
									for (const authList of this.authThirdsList) {
										if (
											authList.thirdAuthId === element.warehousefromId ||
											authList.thirdAuthId === element.warehousetoId
										) {
											return true;
										}
									}
                                });
                                
                                this.companyService.query().take(1).subscribe(
                                    (company: HttpResponse<CompanyStockAndSalesUtility[]>) => {
                                        this.company = company.body;
                                        this.currencyService.find(this.company[0].baseCurrencyId).subscribe(
                                            (currency: HttpResponse<CurrencyStockAndSalesUtility>) => {
                                                this.currency = currency.body;
								this.dashboards = this.materialhistoriesToDisplay.slice();
								this.dashboards.forEach((element) => {
									element.numberOfItems = element.itemTransfereds.length;
									element.profitAndLoss = 0;
									element.currencyForDashboardName = this.currency.isoCode;
                                });
                               
								this.dashboardsToDisplay = [];
								if (this.dashboards && this.dashboardsToDisplay) {
									this.dashboardsToDisplay = this.dashboards;
									this.dashboardsToDisplay2 = this.dashboardsToDisplay.slice();
									console.log('AAAAAAAAAAAAAA');
									console.log(this.dashboardsToDisplay2);
									for (let i = 0; i < 15; i++) {
										this.dashboardsToDisplay2.push({
											...this.dashboardsToDisplay2[1],
											creationDate: new Date(
												this.dashboardsToDisplay2[1].creationDate.getTime() +
													i * 60 * 60 * 1000 * 24
											),
											numberOfItems: i + 2
										});

										this.dashboardsToDisplay2.push({
											...this.dashboardsToDisplay2[0],
											creationDate: new Date(
												this.dashboardsToDisplay2[0].creationDate.getTime() +
													i * 60 * 60 * 1000 * 24
											),
											numberOfItems: i + 1
										});
									}
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
									this.dashboardsToDisplay3 = [];
									const result = [];
									this.materialClassificationSubscription = this.materialClassificationService
										.query()
										.subscribe(
											(res1: HttpResponse<MaterialclassificationStockAndSalesUtility[]>) => {
												this.materialTypeList = res1.body;
												for (let index = 0; index < this.materialTypeList.length; index++) {
													const tmpData = this.dashboardsToDisplay2.filter((element) => {
														return (
															element.materialclassificationId ===
															this.materialTypeList[index].id
														);
													});

													tmpData.reduce(function(res2, value) {
														if (!res2[value.creationDate]) {
															res2[value.creationDate] = {
																...value,
																numberOfItems: 0
															};
															result.push(res2[value.creationDate]);
														}
														res2[value.creationDate].numberOfItems += value.numberOfItems;
														return res2;
													}, {});
													console.log('OOOOOOOOOOOOOO');
													console.log(result);
												}
												this.dashboardsToDisplay = result.slice();
												this.data = this.buildGraphData();
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
                                console.log('YYYYYYYYYYYYYYYYYYYYYYYYYY');
                                console.log(this.currency);
                            }
                        );
                    }
                );
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

		this.principal.hasAuthority('ROLE_ADMIN').then((hasAuth) => {
			this.hasAdminAuth = hasAuth;
		});
	}

	buildGraphData() {
		const retvar: { values: any[]; key: string; color: string; area: boolean }[] = [];
		let matTypeDesc: string;
		for (let i = 0; i < this.materialTypeList.length; i++) {
			const tmp = [];
			const tmpdash = this.dashboardsToDisplay.filter((elle) => {
				return this.materialTypeList[i].id === elle.materialclassificationId;
			});
			tmpdash.forEach((element) => {
				tmp.push({ x: element.creationDate, y: element.numberOfItems });
			});

			matTypeDesc = this.materialTypeList[i].name;
			let lcolor = '#ff7f0e';
			if (i > 0) {
				lcolor = '#f77700';
			}
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

	trackTransferclassificationById(index: number, item: TransferclassificationStockAndSalesUtility) {
		return item.id;
	}

	registerChangeInDashboards() {
		this.eventSubscriber = this.eventManager.subscribe('dashboardListModification', (response) => this.loadAll());
	}

	private onError(error) {
		this.jhiAlertService.error(error.message, null, null);
	}

	filterResults() {
		const dash = this.dashboardsToDisplay2.filter((item) => {
			return (
				(item.transferClassifId === this.transferClassifId ||
					this.transferClassifId === null ||
					!this.transferClassifId) &&
				(item.materialclassificationId === this.materialType ||
					this.materialType === null ||
					!this.materialType) &&
				(item.warehousefromId === this.transferSource || this.transferSource === null || !this.transferSource)
			);
		});

		const result = [];
		if (this.materialTypeList) {
			for (let index = 0; index < this.materialTypeList.length; index++) {
				const tmpData = dash.filter((element) => {
					return element.materialclassificationId === this.materialTypeList[index].id;
				});
				tmpData.reduce(function(res2, value) {
					if (!res2[value.creationDate]) {
						res2[value.creationDate] = {
							...value,
							numberOfItems: 0
						};
						result.push(res2[value.creationDate]);
					}
					res2[value.creationDate].numberOfItems += value.numberOfItems;
					return res2;
				}, {});
			}
			this.dashboardsToDisplay = result.slice();
			this.data = this.buildGraphData();
		}
	}
}
