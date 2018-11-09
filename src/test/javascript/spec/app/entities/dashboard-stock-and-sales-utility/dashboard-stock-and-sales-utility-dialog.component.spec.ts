/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { DashboardStockAndSalesUtilityDialogComponent } from '../../../../../../main/webapp/app/entities/dashboard-stock-and-sales-utility/dashboard-stock-and-sales-utility-dialog.component';
import { DashboardStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/dashboard-stock-and-sales-utility/dashboard-stock-and-sales-utility.service';
import { DashboardStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/dashboard-stock-and-sales-utility/dashboard-stock-and-sales-utility.model';
import { CurrencyStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/currency-stock-and-sales-utility';
import { TransferclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/transferclassification-stock-and-sales-utility';
import { ThirdStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/third-stock-and-sales-utility';
import { MaterialclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/materialclassification-stock-and-sales-utility';

describe('Component Tests', () => {

    describe('DashboardStockAndSalesUtility Management Dialog Component', () => {
        let comp: DashboardStockAndSalesUtilityDialogComponent;
        let fixture: ComponentFixture<DashboardStockAndSalesUtilityDialogComponent>;
        let service: DashboardStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [DashboardStockAndSalesUtilityDialogComponent],
                providers: [
                    CurrencyStockAndSalesUtilityService,
                    TransferclassificationStockAndSalesUtilityService,
                    ThirdStockAndSalesUtilityService,
                    MaterialclassificationStockAndSalesUtilityService,
                    DashboardStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(DashboardStockAndSalesUtilityDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DashboardStockAndSalesUtilityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DashboardStockAndSalesUtilityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DashboardStockAndSalesUtility(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.dashboard = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'dashboardListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DashboardStockAndSalesUtility();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.dashboard = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'dashboardListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
