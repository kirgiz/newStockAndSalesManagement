/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CurrencyStockAndSalesUtilityDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/currency-stock-and-sales-utility/currency-stock-and-sales-utility-delete-dialog.component';
import { CurrencyStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/currency-stock-and-sales-utility/currency-stock-and-sales-utility.service';

describe('Component Tests', () => {

    describe('CurrencyStockAndSalesUtility Management Delete Component', () => {
        let comp: CurrencyStockAndSalesUtilityDeleteDialogComponent;
        let fixture: ComponentFixture<CurrencyStockAndSalesUtilityDeleteDialogComponent>;
        let service: CurrencyStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CurrencyStockAndSalesUtilityDeleteDialogComponent],
                providers: [
                    CurrencyStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(CurrencyStockAndSalesUtilityDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CurrencyStockAndSalesUtilityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrencyStockAndSalesUtilityService);
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
