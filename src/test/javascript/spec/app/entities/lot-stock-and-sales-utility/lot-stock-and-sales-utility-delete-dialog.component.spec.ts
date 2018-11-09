/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { LotStockAndSalesUtilityDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/lot-stock-and-sales-utility/lot-stock-and-sales-utility-delete-dialog.component';
import { LotStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/lot-stock-and-sales-utility/lot-stock-and-sales-utility.service';

describe('Component Tests', () => {

    describe('LotStockAndSalesUtility Management Delete Component', () => {
        let comp: LotStockAndSalesUtilityDeleteDialogComponent;
        let fixture: ComponentFixture<LotStockAndSalesUtilityDeleteDialogComponent>;
        let service: LotStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [LotStockAndSalesUtilityDeleteDialogComponent],
                providers: [
                    LotStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(LotStockAndSalesUtilityDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LotStockAndSalesUtilityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LotStockAndSalesUtilityService);
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
