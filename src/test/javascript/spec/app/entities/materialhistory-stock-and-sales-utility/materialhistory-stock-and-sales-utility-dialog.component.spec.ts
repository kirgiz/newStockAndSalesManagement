/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { MaterialhistoryStockAndSalesUtilityDialogComponent } from '../../../../../../main/webapp/app/entities/materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility-dialog.component';
import { MaterialhistoryStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility.service';
import { MaterialhistoryStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility.model';
import { MaterialStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/material-stock-and-sales-utility';
import { TransferclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/transferclassification-stock-and-sales-utility';
import { ThirdStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/third-stock-and-sales-utility';
import { MaterialclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/materialclassification-stock-and-sales-utility';

describe('Component Tests', () => {

    describe('MaterialhistoryStockAndSalesUtility Management Dialog Component', () => {
        let comp: MaterialhistoryStockAndSalesUtilityDialogComponent;
        let fixture: ComponentFixture<MaterialhistoryStockAndSalesUtilityDialogComponent>;
        let service: MaterialhistoryStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [MaterialhistoryStockAndSalesUtilityDialogComponent],
                providers: [
                    MaterialStockAndSalesUtilityService,
                    TransferclassificationStockAndSalesUtilityService,
                    ThirdStockAndSalesUtilityService,
                    MaterialclassificationStockAndSalesUtilityService,
                    MaterialhistoryStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(MaterialhistoryStockAndSalesUtilityDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaterialhistoryStockAndSalesUtilityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterialhistoryStockAndSalesUtilityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MaterialhistoryStockAndSalesUtility(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.materialhistory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'materialhistoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MaterialhistoryStockAndSalesUtility();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.materialhistory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'materialhistoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
