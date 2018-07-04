/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { ThirdclassificationStockAndSalesUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/thirdclassification-stock-and-sales-utility/thirdclassification-stock-and-sales-utility-detail.component';
import { ThirdclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/thirdclassification-stock-and-sales-utility/thirdclassification-stock-and-sales-utility.service';
import { ThirdclassificationStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/thirdclassification-stock-and-sales-utility/thirdclassification-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('ThirdclassificationStockAndSalesUtility Management Detail Component', () => {
        let comp: ThirdclassificationStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<ThirdclassificationStockAndSalesUtilityDetailComponent>;
        let service: ThirdclassificationStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [ThirdclassificationStockAndSalesUtilityDetailComponent],
                providers: [
                    ThirdclassificationStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(ThirdclassificationStockAndSalesUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThirdclassificationStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThirdclassificationStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ThirdclassificationStockAndSalesUtility(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.thirdclassification).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
