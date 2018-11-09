/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CountryStockAndSalesUtilityDialogComponent } from '../../../../../../main/webapp/app/entities/country-stock-and-sales-utility/country-stock-and-sales-utility-dialog.component';
import { CountryStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/country-stock-and-sales-utility/country-stock-and-sales-utility.service';
import { CountryStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/country-stock-and-sales-utility/country-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('CountryStockAndSalesUtility Management Dialog Component', () => {
        let comp: CountryStockAndSalesUtilityDialogComponent;
        let fixture: ComponentFixture<CountryStockAndSalesUtilityDialogComponent>;
        let service: CountryStockAndSalesUtilityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CountryStockAndSalesUtilityDialogComponent],
                providers: [
                    CountryStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(CountryStockAndSalesUtilityDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryStockAndSalesUtilityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryStockAndSalesUtilityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CountryStockAndSalesUtility(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.country = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'countryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CountryStockAndSalesUtility();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.country = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'countryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
