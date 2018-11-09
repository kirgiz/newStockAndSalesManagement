/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { ThirdStockAndSalesUtilityDialogComponent } from '../../../../../../main/webapp/app/entities/third-stock-and-sales-utility/third-stock-and-sales-utility-dialog.component';
import { ThirdStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/third-stock-and-sales-utility/third-stock-and-sales-utility.service';
import { ThirdStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/third-stock-and-sales-utility/third-stock-and-sales-utility.model';
import { AddressStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/address-stock-and-sales-utility';
import { ThirdclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/thirdclassification-stock-and-sales-utility';
import { CivilityStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/civility-stock-and-sales-utility';

describe('Component Tests', () => {

    describe('ThirdStockAndSalesUtility Management Dialog Component', () => {
        let comp: ThirdStockAndSalesUtilityDialogComponent;
        let fixture: ComponentFixture<ThirdStockAndSalesUtilityDialogComponent>;
        let service: ThirdStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [ThirdStockAndSalesUtilityDialogComponent],
                providers: [
                    AddressStockAndSalesUtilityService,
                    ThirdclassificationStockAndSalesUtilityService,
                    CivilityStockAndSalesUtilityService,
                    ThirdStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(ThirdStockAndSalesUtilityDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThirdStockAndSalesUtilityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThirdStockAndSalesUtilityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ThirdStockAndSalesUtility(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.third = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'thirdListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ThirdStockAndSalesUtility();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.third = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'thirdListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
