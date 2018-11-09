/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { LotStockAndSalesUtilityUpdateComponent } from 'app/entities/lot-stock-and-sales-utility/lot-stock-and-sales-utility-update.component';
import { LotStockAndSalesUtilityService } from 'app/entities/lot-stock-and-sales-utility/lot-stock-and-sales-utility.service';
import { LotStockAndSalesUtility } from 'app/shared/model/lot-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('LotStockAndSalesUtility Management Update Component', () => {
        let comp: LotStockAndSalesUtilityUpdateComponent;
        let fixture: ComponentFixture<LotStockAndSalesUtilityUpdateComponent>;
        let service: LotStockAndSalesUtilityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [LotStockAndSalesUtilityUpdateComponent]
            })
                .overrideTemplate(LotStockAndSalesUtilityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LotStockAndSalesUtilityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LotStockAndSalesUtilityService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LotStockAndSalesUtility(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.lot = entity;
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
                    const entity = new LotStockAndSalesUtility();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.lot = entity;
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
