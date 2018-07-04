/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { DashboardStockAndSalesUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/dashboard-stock-and-sales-utility/dashboard-stock-and-sales-utility-detail.component';
import { DashboardStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/dashboard-stock-and-sales-utility/dashboard-stock-and-sales-utility.service';
import { DashboardStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/dashboard-stock-and-sales-utility/dashboard-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('DashboardStockAndSalesUtility Management Detail Component', () => {
        let comp: DashboardStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<DashboardStockAndSalesUtilityDetailComponent>;
        let service: DashboardStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [DashboardStockAndSalesUtilityDetailComponent],
                providers: [
                    DashboardStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(DashboardStockAndSalesUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DashboardStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DashboardStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DashboardStockAndSalesUtility(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.dashboard).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
