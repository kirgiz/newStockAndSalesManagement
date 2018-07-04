/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CountryStockAndSalesUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/country-stock-and-sales-utility/country-stock-and-sales-utility-detail.component';
import { CountryStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/country-stock-and-sales-utility/country-stock-and-sales-utility.service';
import { CountryStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/country-stock-and-sales-utility/country-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('CountryStockAndSalesUtility Management Detail Component', () => {
        let comp: CountryStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<CountryStockAndSalesUtilityDetailComponent>;
        let service: CountryStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CountryStockAndSalesUtilityDetailComponent],
                providers: [
                    CountryStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(CountryStockAndSalesUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CountryStockAndSalesUtility(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.country).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
