/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { ThirdStockAndSalesUtilityComponent } from '../../../../../../main/webapp/app/entities/third-stock-and-sales-utility/third-stock-and-sales-utility.component';
import { ThirdStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/third-stock-and-sales-utility/third-stock-and-sales-utility.service';
import { ThirdStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/third-stock-and-sales-utility/third-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('ThirdStockAndSalesUtility Management Component', () => {
        let comp: ThirdStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<ThirdStockAndSalesUtilityComponent>;
        let service: ThirdStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [ThirdStockAndSalesUtilityComponent],
                providers: [
                    ThirdStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(ThirdStockAndSalesUtilityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThirdStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThirdStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ThirdStockAndSalesUtility(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.thirds[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
