import {TransferclassificationStockAndSalesUtility} from '../transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDateUtils } from 'ng-jhipster';

import { MaterialhistoryStockAndSalesUtility } from './materialhistory-stock-and-sales-utility.model';
import { MaterialhistoryStockAndSalesUtilityService } from './materialhistory-stock-and-sales-utility.service';
import { ITEMS_PER_PAGE, Principal, User, BaseEntity } from '../../shared';
import { TransferclassificationStockAndSalesUtilityService } from '../transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility.service';
import { ThirdStockAndSalesUtility } from '../third-stock-and-sales-utility/third-stock-and-sales-utility.model';
import { ThirdStockAndSalesUtilityService } from '../third-stock-and-sales-utility/third-stock-and-sales-utility.service';
import { UserService } from '../../shared/user/user.service';
import { UserAuthorizedThirdService } from '../user-authorized-third/user-authorized-third.service';
import { UserAuthorizedThird } from '../user-authorized-third';

@Component({
  selector: 'jhi-materialhistory-stock-and-sales-utility',
  templateUrl: './materialhistory-stock-and-sales-utility.component.html'
})
export class MaterialhistoryStockAndSalesUtilityComponent
  implements OnInit, OnDestroy {
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
  date: { year: number; month: number; dusrSubscription: Subscription; day: number };
  transferSource: number;
  transferDest: number;

  materialhistoriesToDisplay: {id?: number,
    code?: string,
    creationDate?: any,
     price?: number,
     comments?: string,
   userMod?: number,
    itemTransfereds?: BaseEntity[],
    transferClassifId?: number,
     warehousefromId?: number,
   warehousetoId?: number ,
   userModName?: string,
   materialclassificationDescription?: string} [];

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
    private autThirds: UserAuthorizedThirdService
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe((data) => {
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
        (res: HttpResponse<MaterialhistoryStockAndSalesUtility[]>) => {
            this.onSuccess(res.body, res.headers);
            this.userServiceSubscription = this.userService.query().subscribe(
                (res1: HttpResponse<User[]>) => {
                  this.userList = res1.body;
                  this.materialhistoriesToDisplay.forEach((item) =>
                  this.userList.forEach((element) => { if  (element.id === item.userMod) {
                      item.userModName = element.login; }
                    }
                )
              );
            },
                (res1: HttpErrorResponse) => this.onError(res1.message));
               this.usrSubscription = this.userService.find(this.currentAccount.login).subscribe( (user: HttpResponse<User>) => {
                    const resuser: User = user.body;
                 this.thirdAuthSubscription  = this.autThirds.query({
                        'userAuthId.equals': resuser.id
                    }).subscribe((reslist: HttpResponse<UserAuthorizedThird[]>) => {
                        this.authThirdsList = reslist.body;
                        const mat:  MaterialhistoryStockAndSalesUtility[] =  this.materialhistoriesToDisplay.slice();
                        this.materialhistoriesToDisplay = mat.filter((element) => {
                            for (const authList of this.authThirdsList) {
                           if ( authList.thirdAuthId === element.warehousefromId
                            || authList.thirdAuthId === element.warehousetoId) {
                             return true;
                           }
                            }
                        });

                  const thirds =  this.thirdList.slice();
                  this.thirdList = thirds.filter((element) => {
                    for (const authList of this.authThirdsList) {
                   if ( authList.thirdAuthId === element.id) {
                     return true;
                   }
                    }
                });

                    });
                });
            }
          ,
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

    this.principal.hasAuthority('ROLE_ADMIN').then((hasAuth) => {
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
          ddthis = new Date(this.date.year, this.date.month - 1, this.date.day);
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
    this.userServiceSubscription.unsubscribe();
    this.usrSubscription.unsubscribe();
    this.thirdAuthSubscription.unsubscribe();
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
    console.log(this.materialhistories);

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

  OnSale() {
      const saleTransfType = this.transferclassifications.find(
          (transferclassification) => {
              return transferclassification.isOutgoingTransfer === true;
          }
      );
      this.openTransfDialog(saleTransfType);
  }

  OnBuy() {
    const buyTransfType = this.transferclassifications.find(
        (transferclassification) => {
            return transferclassification.isIncomingTransfer === true;
        }
    );
    this.openTransfDialog(buyTransfType);
}

OnTransf() {
    const intTransfType = this.transferclassifications.find(
        (transferclassification) => {
            return transferclassification.isInternalTransfer === true;
        }
    );
    this.openTransfDialog(intTransfType);
}

private openTransfDialog(transfType: TransferclassificationStockAndSalesUtility){
  this.materialhistoryService.emitTransTypeEvent(transfType);
  this.router.navigate(['/', { outlets: { popup: ['materialhistory-stock-and-sales-utility-new'] } }] );


}

}
