/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { ForexratesStockAndSalesUtilityDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/forexrates-stock-and-sales-utility/forexrates-stock-and-sales-utility-delete-dialog.component';
import { ForexratesStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/forexrates-stock-and-sales-utility/forexrates-stock-and-sales-utility.service';

describe('Component Tests', () => {

    describe('ForexratesStockAndSalesUtility Management Delete Component', () => {
        let comp: ForexratesStockAndSalesUtilityDeleteDialogComponent;
        let fixture: ComponentFixture<ForexratesStockAndSalesUtilityDeleteDialogComponent>;
        let service: ForexratesStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [ForexratesStockAndSalesUtilityDeleteDialogComponent],
                providers: [
                    ForexratesStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(ForexratesStockAndSalesUtilityDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ForexratesStockAndSalesUtilityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ForexratesStockAndSalesUtilityService);
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
