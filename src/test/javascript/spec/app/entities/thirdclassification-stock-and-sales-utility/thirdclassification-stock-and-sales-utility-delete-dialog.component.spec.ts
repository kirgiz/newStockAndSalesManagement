/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { ThirdclassificationStockAndSalesUtilityDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/thirdclassification-stock-and-sales-utility/thirdclassification-stock-and-sales-utility-delete-dialog.component';
import { ThirdclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/thirdclassification-stock-and-sales-utility/thirdclassification-stock-and-sales-utility.service';

describe('Component Tests', () => {

    describe('ThirdclassificationStockAndSalesUtility Management Delete Component', () => {
        let comp: ThirdclassificationStockAndSalesUtilityDeleteDialogComponent;
        let fixture: ComponentFixture<ThirdclassificationStockAndSalesUtilityDeleteDialogComponent>;
        let service: ThirdclassificationStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [ThirdclassificationStockAndSalesUtilityDeleteDialogComponent],
                providers: [
                    ThirdclassificationStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(ThirdclassificationStockAndSalesUtilityDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThirdclassificationStockAndSalesUtilityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThirdclassificationStockAndSalesUtilityService);
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
