/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { MaterialStockAndSalesUtilityDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/material-stock-and-sales-utility/material-stock-and-sales-utility-delete-dialog.component';
import { MaterialStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/material-stock-and-sales-utility/material-stock-and-sales-utility.service';

describe('Component Tests', () => {

    describe('MaterialStockAndSalesUtility Management Delete Component', () => {
        let comp: MaterialStockAndSalesUtilityDeleteDialogComponent;
        let fixture: ComponentFixture<MaterialStockAndSalesUtilityDeleteDialogComponent>;
        let service: MaterialStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [MaterialStockAndSalesUtilityDeleteDialogComponent],
                providers: [
                    MaterialStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(MaterialStockAndSalesUtilityDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaterialStockAndSalesUtilityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterialStockAndSalesUtilityService);
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
