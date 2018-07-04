/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { ThirdclassificationStockAndSalesUtilityComponent } from '../../../../../../main/webapp/app/entities/thirdclassification-stock-and-sales-utility/thirdclassification-stock-and-sales-utility.component';
import { ThirdclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/thirdclassification-stock-and-sales-utility/thirdclassification-stock-and-sales-utility.service';
import { ThirdclassificationStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/thirdclassification-stock-and-sales-utility/thirdclassification-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('ThirdclassificationStockAndSalesUtility Management Component', () => {
        let comp: ThirdclassificationStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<ThirdclassificationStockAndSalesUtilityComponent>;
        let service: ThirdclassificationStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [ThirdclassificationStockAndSalesUtilityComponent],
                providers: [
                    ThirdclassificationStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(ThirdclassificationStockAndSalesUtilityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThirdclassificationStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThirdclassificationStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ThirdclassificationStockAndSalesUtility(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.thirdclassifications[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
