import {User} from '../../shared/user/user.model';
import {MaterialclassificationStockAndSalesUtility} from '../materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MaterialhistoryStockAndSalesUtility } from './materialhistory-stock-and-sales-utility.model';
import { MaterialhistoryStockAndSalesUtilityPopupService } from './materialhistory-stock-and-sales-utility-popup.service';
import { MaterialhistoryStockAndSalesUtilityService } from './materialhistory-stock-and-sales-utility.service';
import { MaterialStockAndSalesUtility, MaterialStockAndSalesUtilityService } from '../material-stock-and-sales-utility';
import { TransferclassificationStockAndSalesUtility, TransferclassificationStockAndSalesUtilityService } from '../transferclassification-stock-and-sales-utility';
import { ThirdStockAndSalesUtility, ThirdStockAndSalesUtilityService } from '../third-stock-and-sales-utility';
// import { JhiDateUtils } from 'ng-jhipster';
import { BaseEntity } from '../../shared/model/base-entity';
import { Subscription } from 'rxjs/Subscription';
import { MaterialclassificationStockAndSalesUtilityService } from '../materialclassification-stock-and-sales-utility';
import { UserService } from '../../shared/user/user.service';
import { UserAuthorizedThird } from '../user-authorized-third/user-authorized-third.model';
import { UserAuthorizedThirdService } from '../user-authorized-third';
import { Principal } from '../../shared/auth/principal.service';

@Component({
  selector: 'jhi-materialhistory-stock-and-sales-utility-dialog',
  templateUrl: './materialhistory-stock-and-sales-utility-dialog.component.html'
})
export class MaterialhistoryStockAndSalesUtilityDialogComponent
  implements OnInit, OnDestroy {
    thirdsfrom: ThirdStockAndSalesUtility[];
    user: User;
    authThirdsList: UserAuthorizedThird[];
    currentAccount: any;
    thirdAuthSubscription: any;
    usrSubscription: Subscription;
  materialClassificationSubscription: Subscription;
  thirdSubscription: Subscription;
  materialClassifications: MaterialclassificationStockAndSalesUtility[];
  transferClassificationSubscription: Subscription;

  selectedMaterialSubscription: Subscription;

  materialhistory: MaterialhistoryStockAndSalesUtility;
  isSaving: boolean;

  materials: MaterialStockAndSalesUtility[];

  transferclassifications: TransferclassificationStockAndSalesUtility[];

  thirds: ThirdStockAndSalesUtility[];
  creationDateDp: any;
  materialTypeId: number;

  constructor(
    public activeModal: NgbActiveModal,
    private jhiAlertService: JhiAlertService,
    private materialhistoryService: MaterialhistoryStockAndSalesUtilityService,
    private materialService: MaterialStockAndSalesUtilityService,
    private transferclassificationService: TransferclassificationStockAndSalesUtilityService,
    private thirdService: ThirdStockAndSalesUtilityService,
    private eventManager: JhiEventManager,
    private materialclassificationStockAndSalesUtilityService: MaterialclassificationStockAndSalesUtilityService,
    private router: Router ,
    private userService: UserService,
    private autThirds: UserAuthorizedThirdService,
    private principal: Principal ) {}

  ngOnInit() {
    this.isSaving = false;
    this.principal.identity().then((account) => {
        this.currentAccount = account;
        console.log(this.currentAccount);
      });
    this.transferClassificationSubscription = this.transferclassificationService.query().subscribe(
      (res: HttpResponse<TransferclassificationStockAndSalesUtility[]>) => {
        this.transferclassifications = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.thirdSubscription = this.thirdService.query().subscribe(
      (res: HttpResponse<ThirdStockAndSalesUtility[]>) => {
        this.thirds = res.body;

        this.usrSubscription = this.userService.find(this.currentAccount.login).subscribe( (user: HttpResponse<User>) => {
            const resuser: User = user.body;
         this.thirdAuthSubscription  = this.autThirds.query({
                'userAuthId.equals': resuser.id
            }).subscribe((reslist: HttpResponse<UserAuthorizedThird[]>) => {
                this.authThirdsList = reslist.body;
                const thirds:  ThirdStockAndSalesUtility[] =  this.thirds.slice();
                this.thirds = thirds.filter((element) => {
                    for (const authList of this.authThirdsList) {
                   if ( authList.thirdAuthId === element.id) {
                     return true;
                   }
                    }
                });
                this.thirdsfrom = this.thirds.slice();
            });
        });

      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    if (!this.materialhistory.id) {
      this.materialhistory.itemTransfereds = [];
      this.selectedMaterialSubscription = this.materialhistoryService.selectedMaterial.subscribe(
        (data: MaterialStockAndSalesUtility[]) => {
          this.materials = data;
          this.materialhistory.itemTransfereds = this.materials;
        }
      );
    } else {
      this.materials = this.materialhistory.itemTransfereds;
    }

    this.materialClassificationSubscription = this.materialclassificationStockAndSalesUtilityService.query().subscribe(
      ( res: HttpResponse<MaterialclassificationStockAndSalesUtility[]>) => {
        this.materialClassifications = res.body;
      }
    );
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  save() {
    this.isSaving = true;
    const theDate = new Date(Date.now());
    const year1 = new Date(Date.now()).getFullYear();
    const month1 = new Date(Date.now()).getMonth() + 1;
    const day1 = new Date(Date.now()).getDate();
    const dd: { year: any; month: any; day: any } = {
      year: year1,
      month: month1,
      day: day1
    };
    this.materialhistory.creationDate = dd;
    if (this.materialhistory.id !== undefined) {
      this.subscribeToSaveResponse(
        this.materialhistoryService.update(this.materialhistory)
      );
    } else {
     // this.materialhistory.warehousefromId = this.materialhistory.warehousetoId;
      this.subscribeToSaveResponse(
        this.materialhistoryService.create(this.materialhistory)
      );
    }
  }

  private subscribeToSaveResponse(
    result: Observable<HttpResponse<MaterialhistoryStockAndSalesUtility>>
  ) {
    result.subscribe(
      (res: HttpResponse<MaterialhistoryStockAndSalesUtility>) =>
        this.onSaveSuccess(res.body),
      (res: HttpErrorResponse) => this.onSaveError()
    );
  }

  private onSaveSuccess(result: MaterialhistoryStockAndSalesUtility) {
    this.eventManager.broadcast({
      name: 'materialhistoryListModification',
      content: 'OK'
    });
    this.isSaving = false;
    this.activeModal.dismiss(result);
  }

  private onSaveError() {
    this.isSaving = false;
  }

  private onError(error: any) {
    this.jhiAlertService.error(error.message, null, null);
  }

  trackMaterialById(index: number, item: MaterialStockAndSalesUtility) {
    return item.id;
  }

  trackTransferclassificationById(
    index: number,
    item: TransferclassificationStockAndSalesUtility
  ) {
    return item.id;
  }

  trackmaterialclassificationById(
    index: number,
    item: TransferclassificationStockAndSalesUtility
  ) {
    return item.id;
  }

  trackMaterialclassificationById(
    index: number,
    item: MaterialclassificationStockAndSalesUtility
  ) {
    return item.id;
  }

  trackThirdById(index: number, item: ThirdStockAndSalesUtility) {
    return item.id;
  }

  ngOnDestroy() {
    if (this.selectedMaterialSubscription) {
      this.selectedMaterialSubscription.unsubscribe();
      this.materialClassificationSubscription.unsubscribe();
      this.thirdSubscription.unsubscribe();
      this.transferClassificationSubscription.unsubscribe();
    }
  }
  onSelectArticle() {

    console.log('material type ' + this.materialTypeId);

      this.router.navigate(['/', { outlets: { popup: ['material-search-stock-and-sales-utility-popup'] } }], { queryParams: { matType: this.materialTypeId,
         destination: this.materialhistory.warehousetoId,  source: this.materialhistory.warehousefromId }});
  }

}

@Component({
    selector: 'jhi-materialhistory-stock-and-sales-utility-popup',
    template: ''
})
export class MaterialhistoryStockAndSalesUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private materialhistoryPopupService: MaterialhistoryStockAndSalesUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.materialhistoryPopupService
                    .open(MaterialhistoryStockAndSalesUtilityDialogComponent as Component, params['id']);
            } else {
                this.materialhistoryPopupService
                    .open(MaterialhistoryStockAndSalesUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
