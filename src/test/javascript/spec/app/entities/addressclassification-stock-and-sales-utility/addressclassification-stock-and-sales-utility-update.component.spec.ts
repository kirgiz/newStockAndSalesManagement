/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { AddressclassificationStockAndSalesUtilityUpdateComponent } from 'app/entities/addressclassification-stock-and-sales-utility/addressclassification-stock-and-sales-utility-update.component';
import { AddressclassificationStockAndSalesUtilityService } from 'app/entities/addressclassification-stock-and-sales-utility/addressclassification-stock-and-sales-utility.service';
import { AddressclassificationStockAndSalesUtility } from 'app/shared/model/addressclassification-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('AddressclassificationStockAndSalesUtility Management Update Component', () => {
        let comp: AddressclassificationStockAndSalesUtilityUpdateComponent;
        let fixture: ComponentFixture<AddressclassificationStockAndSalesUtilityUpdateComponent>;
        let service: AddressclassificationStockAndSalesUtilityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [AddressclassificationStockAndSalesUtilityUpdateComponent]
            })
                .overrideTemplate(AddressclassificationStockAndSalesUtilityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AddressclassificationStockAndSalesUtilityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressclassificationStockAndSalesUtilityService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new AddressclassificationStockAndSalesUtility(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.addressclassification = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new AddressclassificationStockAndSalesUtility();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.addressclassification = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
