/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { ThirdStockAndSalesUtilityComponent } from 'app/entities/third-stock-and-sales-utility/third-stock-and-sales-utility.component';
import { ThirdStockAndSalesUtilityService } from 'app/entities/third-stock-and-sales-utility/third-stock-and-sales-utility.service';
import { ThirdStockAndSalesUtility } from 'app/shared/model/third-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('ThirdStockAndSalesUtility Management Component', () => {
        let comp: ThirdStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<ThirdStockAndSalesUtilityComponent>;
        let service: ThirdStockAndSalesUtilityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [ThirdStockAndSalesUtilityComponent],
                providers: []
            })
                .overrideTemplate(ThirdStockAndSalesUtilityComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ThirdStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThirdStockAndSalesUtilityService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ThirdStockAndSalesUtility(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.thirds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
