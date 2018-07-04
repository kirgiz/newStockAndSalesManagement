/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CountryStockAndSalesUtilityComponent } from '../../../../../../main/webapp/app/entities/country-stock-and-sales-utility/country-stock-and-sales-utility.component';
import { CountryStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/country-stock-and-sales-utility/country-stock-and-sales-utility.service';
import { CountryStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/country-stock-and-sales-utility/country-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('CountryStockAndSalesUtility Management Component', () => {
        let comp: CountryStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<CountryStockAndSalesUtilityComponent>;
        let service: CountryStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CountryStockAndSalesUtilityComponent],
                providers: [
                    CountryStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(CountryStockAndSalesUtilityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CountryStockAndSalesUtility(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.countries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
