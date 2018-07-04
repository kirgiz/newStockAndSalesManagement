/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { AddressStockAndSalesUtilityDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/address-stock-and-sales-utility/address-stock-and-sales-utility-delete-dialog.component';
import { AddressStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/address-stock-and-sales-utility/address-stock-and-sales-utility.service';

describe('Component Tests', () => {

    describe('AddressStockAndSalesUtility Management Delete Component', () => {
        let comp: AddressStockAndSalesUtilityDeleteDialogComponent;
        let fixture: ComponentFixture<AddressStockAndSalesUtilityDeleteDialogComponent>;
        let service: AddressStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [AddressStockAndSalesUtilityDeleteDialogComponent],
                providers: [
                    AddressStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(AddressStockAndSalesUtilityDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressStockAndSalesUtilityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressStockAndSalesUtilityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
