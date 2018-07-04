/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { AddressStockAndSalesUtilityDialogComponent } from '../../../../../../main/webapp/app/entities/address-stock-and-sales-utility/address-stock-and-sales-utility-dialog.component';
import { AddressStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/address-stock-and-sales-utility/address-stock-and-sales-utility.service';
import { AddressStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/address-stock-and-sales-utility/address-stock-and-sales-utility.model';
import { AddressclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/addressclassification-stock-and-sales-utility';
import { CountryStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/country-stock-and-sales-utility';
import { ThirdStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/third-stock-and-sales-utility';

describe('Component Tests', () => {

    describe('AddressStockAndSalesUtility Management Dialog Component', () => {
        let comp: AddressStockAndSalesUtilityDialogComponent;
        let fixture: ComponentFixture<AddressStockAndSalesUtilityDialogComponent>;
        let service: AddressStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [AddressStockAndSalesUtilityDialogComponent],
                providers: [
                    AddressclassificationStockAndSalesUtilityService,
                    CountryStockAndSalesUtilityService,
                    ThirdStockAndSalesUtilityService,
                    AddressStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(AddressStockAndSalesUtilityDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressStockAndSalesUtilityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressStockAndSalesUtilityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AddressStockAndSalesUtility(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.address = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'addressListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AddressStockAndSalesUtility();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.address = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'addressListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
