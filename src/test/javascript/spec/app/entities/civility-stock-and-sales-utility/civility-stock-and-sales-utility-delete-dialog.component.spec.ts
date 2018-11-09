/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CivilityStockAndSalesUtilityDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/civility-stock-and-sales-utility/civility-stock-and-sales-utility-delete-dialog.component';
import { CivilityStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/civility-stock-and-sales-utility/civility-stock-and-sales-utility.service';

describe('Component Tests', () => {

    describe('CivilityStockAndSalesUtility Management Delete Component', () => {
        let comp: CivilityStockAndSalesUtilityDeleteDialogComponent;
        let fixture: ComponentFixture<CivilityStockAndSalesUtilityDeleteDialogComponent>;
        let service: CivilityStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CivilityStockAndSalesUtilityDeleteDialogComponent],
                providers: [
                    CivilityStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(CivilityStockAndSalesUtilityDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CivilityStockAndSalesUtilityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CivilityStockAndSalesUtilityService);
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
