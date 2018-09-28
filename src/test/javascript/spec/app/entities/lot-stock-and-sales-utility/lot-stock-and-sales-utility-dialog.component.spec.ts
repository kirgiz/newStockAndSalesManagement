/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { LotStockAndSalesUtilityDialogComponent } from '../../../../../../main/webapp/app/entities/lot-stock-and-sales-utility/lot-stock-and-sales-utility-dialog.component';
import { LotStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/lot-stock-and-sales-utility/lot-stock-and-sales-utility.service';
import { LotStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/lot-stock-and-sales-utility/lot-stock-and-sales-utility.model';
import { CurrencyStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/currency-stock-and-sales-utility';
import { MaterialclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/materialclassification-stock-and-sales-utility';

describe('Component Tests', () => {

    describe('LotStockAndSalesUtility Management Dialog Component', () => {
        let comp: LotStockAndSalesUtilityDialogComponent;
        let fixture: ComponentFixture<LotStockAndSalesUtilityDialogComponent>;
        let service: LotStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [LotStockAndSalesUtilityDialogComponent],
                providers: [
                    CurrencyStockAndSalesUtilityService,
                    MaterialclassificationStockAndSalesUtilityService,
                    LotStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(LotStockAndSalesUtilityDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LotStockAndSalesUtilityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LotStockAndSalesUtilityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LotStockAndSalesUtility(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.lot = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'lotListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LotStockAndSalesUtility();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.lot = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'lotListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
