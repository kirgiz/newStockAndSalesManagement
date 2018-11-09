/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { ThirdStockAndSalesUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/third-stock-and-sales-utility/third-stock-and-sales-utility-detail.component';
import { ThirdStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/third-stock-and-sales-utility/third-stock-and-sales-utility.service';
import { ThirdStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/third-stock-and-sales-utility/third-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('ThirdStockAndSalesUtility Management Detail Component', () => {
        let comp: ThirdStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<ThirdStockAndSalesUtilityDetailComponent>;
        let service: ThirdStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [ThirdStockAndSalesUtilityDetailComponent],
                providers: [
                    ThirdStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(ThirdStockAndSalesUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThirdStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThirdStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ThirdStockAndSalesUtility(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.third).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
