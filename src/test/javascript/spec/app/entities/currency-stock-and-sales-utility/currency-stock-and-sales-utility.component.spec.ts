/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CurrencyStockAndSalesUtilityComponent } from '../../../../../../main/webapp/app/entities/currency-stock-and-sales-utility/currency-stock-and-sales-utility.component';
import { CurrencyStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/currency-stock-and-sales-utility/currency-stock-and-sales-utility.service';
import { CurrencyStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/currency-stock-and-sales-utility/currency-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('CurrencyStockAndSalesUtility Management Component', () => {
        let comp: CurrencyStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<CurrencyStockAndSalesUtilityComponent>;
        let service: CurrencyStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CurrencyStockAndSalesUtilityComponent],
                providers: [
                    CurrencyStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(CurrencyStockAndSalesUtilityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CurrencyStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrencyStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CurrencyStockAndSalesUtility(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.currencies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
