/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CountryStockAndSalesUtilityDetailComponent } from 'app/entities/country-stock-and-sales-utility/country-stock-and-sales-utility-detail.component';
import { CountryStockAndSalesUtility } from 'app/shared/model/country-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('CountryStockAndSalesUtility Management Detail Component', () => {
        let comp: CountryStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<CountryStockAndSalesUtilityDetailComponent>;
        const route = ({ data: of({ country: new CountryStockAndSalesUtility(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CountryStockAndSalesUtilityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CountryStockAndSalesUtilityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CountryStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.country).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
