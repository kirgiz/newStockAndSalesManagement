/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { MaterialStockAndSalesUtilityUpdateComponent } from 'app/entities/material-stock-and-sales-utility/material-stock-and-sales-utility-update.component';
import { MaterialStockAndSalesUtilityService } from 'app/entities/material-stock-and-sales-utility/material-stock-and-sales-utility.service';
import { MaterialStockAndSalesUtility } from 'app/shared/model/material-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('MaterialStockAndSalesUtility Management Update Component', () => {
        let comp: MaterialStockAndSalesUtilityUpdateComponent;
        let fixture: ComponentFixture<MaterialStockAndSalesUtilityUpdateComponent>;
        let service: MaterialStockAndSalesUtilityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [MaterialStockAndSalesUtilityUpdateComponent]
            })
                .overrideTemplate(MaterialStockAndSalesUtilityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MaterialStockAndSalesUtilityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterialStockAndSalesUtilityService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new MaterialStockAndSalesUtility(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.material = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new MaterialStockAndSalesUtility();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.material = entity;
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
