/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { DashboardStockAndSalesUtilityDetailComponent } from 'app/entities/dashboard-stock-and-sales-utility/dashboard-stock-and-sales-utility-detail.component';
import { DashboardStockAndSalesUtility } from 'app/shared/model/dashboard-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('DashboardStockAndSalesUtility Management Detail Component', () => {
        let comp: DashboardStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<DashboardStockAndSalesUtilityDetailComponent>;
        const route = ({ data: of({ dashboard: new DashboardStockAndSalesUtility(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [DashboardStockAndSalesUtilityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DashboardStockAndSalesUtilityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DashboardStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.dashboard).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
