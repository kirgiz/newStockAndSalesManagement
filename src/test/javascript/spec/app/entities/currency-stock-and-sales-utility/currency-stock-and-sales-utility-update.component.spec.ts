/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CurrencyStockAndSalesUtilityUpdateComponent } from 'app/entities/currency-stock-and-sales-utility/currency-stock-and-sales-utility-update.component';
import { CurrencyStockAndSalesUtilityService } from 'app/entities/currency-stock-and-sales-utility/currency-stock-and-sales-utility.service';
import { CurrencyStockAndSalesUtility } from 'app/shared/model/currency-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('CurrencyStockAndSalesUtility Management Update Component', () => {
        let comp: CurrencyStockAndSalesUtilityUpdateComponent;
        let fixture: ComponentFixture<CurrencyStockAndSalesUtilityUpdateComponent>;
        let service: CurrencyStockAndSalesUtilityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CurrencyStockAndSalesUtilityUpdateComponent]
            })
                .overrideTemplate(CurrencyStockAndSalesUtilityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CurrencyStockAndSalesUtilityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrencyStockAndSalesUtilityService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CurrencyStockAndSalesUtility(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.currency = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CurrencyStockAndSalesUtility();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.currency = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
