/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CompanyStockAndSalesUtilityComponent } from '../../../../../../main/webapp/app/entities/company-stock-and-sales-utility/company-stock-and-sales-utility.component';
import { CompanyStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/company-stock-and-sales-utility/company-stock-and-sales-utility.service';
import { CompanyStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/company-stock-and-sales-utility/company-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('CompanyStockAndSalesUtility Management Component', () => {
        let comp: CompanyStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<CompanyStockAndSalesUtilityComponent>;
        let service: CompanyStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CompanyStockAndSalesUtilityComponent],
                providers: [
                    CompanyStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(CompanyStockAndSalesUtilityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CompanyStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CompanyStockAndSalesUtility(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.companies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
