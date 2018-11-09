/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CompanyStockAndSalesUtilityDialogComponent } from '../../../../../../main/webapp/app/entities/company-stock-and-sales-utility/company-stock-and-sales-utility-dialog.component';
import { CompanyStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/company-stock-and-sales-utility/company-stock-and-sales-utility.service';
import { CompanyStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/company-stock-and-sales-utility/company-stock-and-sales-utility.model';
import { CurrencyStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/currency-stock-and-sales-utility';

describe('Component Tests', () => {

    describe('CompanyStockAndSalesUtility Management Dialog Component', () => {
        let comp: CompanyStockAndSalesUtilityDialogComponent;
        let fixture: ComponentFixture<CompanyStockAndSalesUtilityDialogComponent>;
        let service: CompanyStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CompanyStockAndSalesUtilityDialogComponent],
                providers: [
                    CurrencyStockAndSalesUtilityService,
                    CompanyStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(CompanyStockAndSalesUtilityDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CompanyStockAndSalesUtilityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyStockAndSalesUtilityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CompanyStockAndSalesUtility(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.company = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'companyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CompanyStockAndSalesUtility();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.company = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'companyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
