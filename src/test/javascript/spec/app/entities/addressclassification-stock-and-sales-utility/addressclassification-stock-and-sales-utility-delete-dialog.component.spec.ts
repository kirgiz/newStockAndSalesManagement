/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { AddressclassificationStockAndSalesUtilityDeleteDialogComponent } from 'app/entities/addressclassification-stock-and-sales-utility/addressclassification-stock-and-sales-utility-delete-dialog.component';
import { AddressclassificationStockAndSalesUtilityService } from 'app/entities/addressclassification-stock-and-sales-utility/addressclassification-stock-and-sales-utility.service';

describe('Component Tests', () => {
    describe('AddressclassificationStockAndSalesUtility Management Delete Component', () => {
        let comp: AddressclassificationStockAndSalesUtilityDeleteDialogComponent;
        let fixture: ComponentFixture<AddressclassificationStockAndSalesUtilityDeleteDialogComponent>;
        let service: AddressclassificationStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [AddressclassificationStockAndSalesUtilityDeleteDialogComponent]
            })
                .overrideTemplate(AddressclassificationStockAndSalesUtilityDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AddressclassificationStockAndSalesUtilityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressclassificationStockAndSalesUtilityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
