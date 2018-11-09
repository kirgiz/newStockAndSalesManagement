/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CompanyStockAndSalesUtilityDetailComponent } from 'app/entities/company-stock-and-sales-utility/company-stock-and-sales-utility-detail.component';
import { CompanyStockAndSalesUtility } from 'app/shared/model/company-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('CompanyStockAndSalesUtility Management Detail Component', () => {
        let comp: CompanyStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<CompanyStockAndSalesUtilityDetailComponent>;
        const route = ({ data: of({ company: new CompanyStockAndSalesUtility(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CompanyStockAndSalesUtilityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CompanyStockAndSalesUtilityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanyStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.company).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
