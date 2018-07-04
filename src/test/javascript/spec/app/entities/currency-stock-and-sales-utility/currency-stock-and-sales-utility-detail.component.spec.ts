/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CurrencyStockAndSalesUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/currency-stock-and-sales-utility/currency-stock-and-sales-utility-detail.component';
import { CurrencyStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/currency-stock-and-sales-utility/currency-stock-and-sales-utility.service';
import { CurrencyStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/currency-stock-and-sales-utility/currency-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('CurrencyStockAndSalesUtility Management Detail Component', () => {
        let comp: CurrencyStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<CurrencyStockAndSalesUtilityDetailComponent>;
        let service: CurrencyStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CurrencyStockAndSalesUtilityDetailComponent],
                providers: [
                    CurrencyStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(CurrencyStockAndSalesUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CurrencyStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrencyStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CurrencyStockAndSalesUtility(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.currency).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
