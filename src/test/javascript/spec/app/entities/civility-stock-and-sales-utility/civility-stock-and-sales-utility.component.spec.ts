/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CivilityStockAndSalesUtilityComponent } from 'app/entities/civility-stock-and-sales-utility/civility-stock-and-sales-utility.component';
import { CivilityStockAndSalesUtilityService } from 'app/entities/civility-stock-and-sales-utility/civility-stock-and-sales-utility.service';
import { CivilityStockAndSalesUtility } from 'app/shared/model/civility-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('CivilityStockAndSalesUtility Management Component', () => {
        let comp: CivilityStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<CivilityStockAndSalesUtilityComponent>;
        let service: CivilityStockAndSalesUtilityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CivilityStockAndSalesUtilityComponent],
                providers: []
            })
                .overrideTemplate(CivilityStockAndSalesUtilityComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CivilityStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CivilityStockAndSalesUtilityService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CivilityStockAndSalesUtility(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.civilities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
