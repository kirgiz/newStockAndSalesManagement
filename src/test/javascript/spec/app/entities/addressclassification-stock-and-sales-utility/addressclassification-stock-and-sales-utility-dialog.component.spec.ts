/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { AddressclassificationStockAndSalesUtilityDialogComponent } from '../../../../../../main/webapp/app/entities/addressclassification-stock-and-sales-utility/addressclassification-stock-and-sales-utility-dialog.component';
import { AddressclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/addressclassification-stock-and-sales-utility/addressclassification-stock-and-sales-utility.service';
import { AddressclassificationStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/addressclassification-stock-and-sales-utility/addressclassification-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('AddressclassificationStockAndSalesUtility Management Dialog Component', () => {
        let comp: AddressclassificationStockAndSalesUtilityDialogComponent;
        let fixture: ComponentFixture<AddressclassificationStockAndSalesUtilityDialogComponent>;
        let service: AddressclassificationStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [AddressclassificationStockAndSalesUtilityDialogComponent],
                providers: [
                    AddressclassificationStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(AddressclassificationStockAndSalesUtilityDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressclassificationStockAndSalesUtilityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressclassificationStockAndSalesUtilityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AddressclassificationStockAndSalesUtility(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.addressclassification = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'addressclassificationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AddressclassificationStockAndSalesUtility();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.addressclassification = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'addressclassificationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
