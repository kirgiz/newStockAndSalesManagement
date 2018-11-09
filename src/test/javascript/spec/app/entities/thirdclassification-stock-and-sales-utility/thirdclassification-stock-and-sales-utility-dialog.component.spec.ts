/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { ThirdclassificationStockAndSalesUtilityDialogComponent } from '../../../../../../main/webapp/app/entities/thirdclassification-stock-and-sales-utility/thirdclassification-stock-and-sales-utility-dialog.component';
import { ThirdclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/thirdclassification-stock-and-sales-utility/thirdclassification-stock-and-sales-utility.service';
import { ThirdclassificationStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/thirdclassification-stock-and-sales-utility/thirdclassification-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('ThirdclassificationStockAndSalesUtility Management Dialog Component', () => {
        let comp: ThirdclassificationStockAndSalesUtilityDialogComponent;
        let fixture: ComponentFixture<ThirdclassificationStockAndSalesUtilityDialogComponent>;
        let service: ThirdclassificationStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [ThirdclassificationStockAndSalesUtilityDialogComponent],
                providers: [
                    ThirdclassificationStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(ThirdclassificationStockAndSalesUtilityDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThirdclassificationStockAndSalesUtilityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThirdclassificationStockAndSalesUtilityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ThirdclassificationStockAndSalesUtility(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.thirdclassification = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'thirdclassificationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ThirdclassificationStockAndSalesUtility();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.thirdclassification = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'thirdclassificationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
