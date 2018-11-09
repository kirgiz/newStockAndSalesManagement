/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { MaterialclassificationStockAndSalesUtilityUpdateComponent } from 'app/entities/materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility-update.component';
import { MaterialclassificationStockAndSalesUtilityService } from 'app/entities/materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility.service';
import { MaterialclassificationStockAndSalesUtility } from 'app/shared/model/materialclassification-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('MaterialclassificationStockAndSalesUtility Management Update Component', () => {
        let comp: MaterialclassificationStockAndSalesUtilityUpdateComponent;
        let fixture: ComponentFixture<MaterialclassificationStockAndSalesUtilityUpdateComponent>;
        let service: MaterialclassificationStockAndSalesUtilityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [MaterialclassificationStockAndSalesUtilityUpdateComponent]
            })
                .overrideTemplate(MaterialclassificationStockAndSalesUtilityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MaterialclassificationStockAndSalesUtilityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterialclassificationStockAndSalesUtilityService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MaterialclassificationStockAndSalesUtility(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.materialclassification = entity;
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
                    const entity = new MaterialclassificationStockAndSalesUtility();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.materialclassification = entity;
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
