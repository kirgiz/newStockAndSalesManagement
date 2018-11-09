/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { MaterialclassificationStockAndSalesUtilityDeleteDialogComponent } from 'app/entities/materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility-delete-dialog.component';
import { MaterialclassificationStockAndSalesUtilityService } from 'app/entities/materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility.service';

describe('Component Tests', () => {
    describe('MaterialclassificationStockAndSalesUtility Management Delete Component', () => {
        let comp: MaterialclassificationStockAndSalesUtilityDeleteDialogComponent;
        let fixture: ComponentFixture<MaterialclassificationStockAndSalesUtilityDeleteDialogComponent>;
        let service: MaterialclassificationStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [MaterialclassificationStockAndSalesUtilityDeleteDialogComponent]
            })
                .overrideTemplate(MaterialclassificationStockAndSalesUtilityDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MaterialclassificationStockAndSalesUtilityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterialclassificationStockAndSalesUtilityService);
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
