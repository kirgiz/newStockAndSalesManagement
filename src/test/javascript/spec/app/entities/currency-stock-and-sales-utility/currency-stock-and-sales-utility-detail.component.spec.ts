/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CurrencyStockAndSalesUtilityDetailComponent } from 'app/entities/currency-stock-and-sales-utility/currency-stock-and-sales-utility-detail.component';
import { CurrencyStockAndSalesUtility } from 'app/shared/model/currency-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('CurrencyStockAndSalesUtility Management Detail Component', () => {
        let comp: CurrencyStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<CurrencyStockAndSalesUtilityDetailComponent>;
        const route = ({ data: of({ currency: new CurrencyStockAndSalesUtility(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CurrencyStockAndSalesUtilityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CurrencyStockAndSalesUtilityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CurrencyStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.currency).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
