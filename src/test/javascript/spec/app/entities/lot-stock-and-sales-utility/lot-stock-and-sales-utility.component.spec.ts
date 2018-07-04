/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { LotStockAndSalesUtilityComponent } from '../../../../../../main/webapp/app/entities/lot-stock-and-sales-utility/lot-stock-and-sales-utility.component';
import { LotStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/lot-stock-and-sales-utility/lot-stock-and-sales-utility.service';
import { LotStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/lot-stock-and-sales-utility/lot-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('LotStockAndSalesUtility Management Component', () => {
        let comp: LotStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<LotStockAndSalesUtilityComponent>;
        let service: LotStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [LotStockAndSalesUtilityComponent],
                providers: [
                    LotStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(LotStockAndSalesUtilityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LotStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LotStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LotStockAndSalesUtility(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.lots[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
