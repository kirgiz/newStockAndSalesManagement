/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CompanyStockAndSalesUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/company-stock-and-sales-utility/company-stock-and-sales-utility-detail.component';
import { CompanyStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/company-stock-and-sales-utility/company-stock-and-sales-utility.service';
import { CompanyStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/company-stock-and-sales-utility/company-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('CompanyStockAndSalesUtility Management Detail Component', () => {
        let comp: CompanyStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<CompanyStockAndSalesUtilityDetailComponent>;
        let service: CompanyStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CompanyStockAndSalesUtilityDetailComponent],
                providers: [
                    CompanyStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(CompanyStockAndSalesUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CompanyStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CompanyStockAndSalesUtility(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.company).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
