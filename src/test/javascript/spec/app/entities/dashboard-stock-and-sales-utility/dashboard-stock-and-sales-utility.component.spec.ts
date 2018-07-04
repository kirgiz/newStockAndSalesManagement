/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { DashboardStockAndSalesUtilityComponent } from '../../../../../../main/webapp/app/entities/dashboard-stock-and-sales-utility/dashboard-stock-and-sales-utility.component';
import { DashboardStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/dashboard-stock-and-sales-utility/dashboard-stock-and-sales-utility.service';
import { DashboardStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/dashboard-stock-and-sales-utility/dashboard-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('DashboardStockAndSalesUtility Management Component', () => {
        let comp: DashboardStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<DashboardStockAndSalesUtilityComponent>;
        let service: DashboardStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [DashboardStockAndSalesUtilityComponent],
                providers: [
                    DashboardStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(DashboardStockAndSalesUtilityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DashboardStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DashboardStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DashboardStockAndSalesUtility(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.dashboards[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
