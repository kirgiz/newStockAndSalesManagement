/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CivilityStockAndSalesUtilityUpdateComponent } from 'app/entities/civility-stock-and-sales-utility/civility-stock-and-sales-utility-update.component';
import { CivilityStockAndSalesUtilityService } from 'app/entities/civility-stock-and-sales-utility/civility-stock-and-sales-utility.service';
import { CivilityStockAndSalesUtility } from 'app/shared/model/civility-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('CivilityStockAndSalesUtility Management Update Component', () => {
        let comp: CivilityStockAndSalesUtilityUpdateComponent;
        let fixture: ComponentFixture<CivilityStockAndSalesUtilityUpdateComponent>;
        let service: CivilityStockAndSalesUtilityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CivilityStockAndSalesUtilityUpdateComponent]
            })
                .overrideTemplate(CivilityStockAndSalesUtilityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CivilityStockAndSalesUtilityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CivilityStockAndSalesUtilityService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CivilityStockAndSalesUtility(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.civility = entity;
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
                    const entity = new CivilityStockAndSalesUtility();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.civility = entity;
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
