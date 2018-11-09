/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { LotStockAndSalesUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/lot-stock-and-sales-utility/lot-stock-and-sales-utility-detail.component';
import { LotStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/lot-stock-and-sales-utility/lot-stock-and-sales-utility.service';
import { LotStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/lot-stock-and-sales-utility/lot-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('LotStockAndSalesUtility Management Detail Component', () => {
        let comp: LotStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<LotStockAndSalesUtilityDetailComponent>;
        let service: LotStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [LotStockAndSalesUtilityDetailComponent],
                providers: [
                    LotStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(LotStockAndSalesUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LotStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LotStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LotStockAndSalesUtility(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.lot).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
