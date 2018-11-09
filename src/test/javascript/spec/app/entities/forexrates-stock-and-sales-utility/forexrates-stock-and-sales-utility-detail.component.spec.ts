/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { ForexratesStockAndSalesUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/forexrates-stock-and-sales-utility/forexrates-stock-and-sales-utility-detail.component';
import { ForexratesStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/forexrates-stock-and-sales-utility/forexrates-stock-and-sales-utility.service';
import { ForexratesStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/forexrates-stock-and-sales-utility/forexrates-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('ForexratesStockAndSalesUtility Management Detail Component', () => {
        let comp: ForexratesStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<ForexratesStockAndSalesUtilityDetailComponent>;
        let service: ForexratesStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [ForexratesStockAndSalesUtilityDetailComponent],
                providers: [
                    ForexratesStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(ForexratesStockAndSalesUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ForexratesStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ForexratesStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ForexratesStockAndSalesUtility(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.forexrates).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
