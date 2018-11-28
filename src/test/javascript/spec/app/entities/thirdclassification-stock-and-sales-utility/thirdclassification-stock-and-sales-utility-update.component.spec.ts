/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { ThirdclassificationStockAndSalesUtilityUpdateComponent } from 'app/entities/thirdclassification-stock-and-sales-utility/thirdclassification-stock-and-sales-utility-update.component';
import { ThirdclassificationStockAndSalesUtilityService } from 'app/entities/thirdclassification-stock-and-sales-utility/thirdclassification-stock-and-sales-utility.service';
import { ThirdclassificationStockAndSalesUtility } from 'app/shared/model/thirdclassification-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('ThirdclassificationStockAndSalesUtility Management Update Component', () => {
        let comp: ThirdclassificationStockAndSalesUtilityUpdateComponent;
        let fixture: ComponentFixture<ThirdclassificationStockAndSalesUtilityUpdateComponent>;
        let service: ThirdclassificationStockAndSalesUtilityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [ThirdclassificationStockAndSalesUtilityUpdateComponent]
            })
                .overrideTemplate(ThirdclassificationStockAndSalesUtilityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ThirdclassificationStockAndSalesUtilityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThirdclassificationStockAndSalesUtilityService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ThirdclassificationStockAndSalesUtility(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.thirdclassification = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ThirdclassificationStockAndSalesUtility();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.thirdclassification = entity;
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
