/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { ForexratesStockAndSalesUtilityComponent } from '../../../../../../main/webapp/app/entities/forexrates-stock-and-sales-utility/forexrates-stock-and-sales-utility.component';
import { ForexratesStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/forexrates-stock-and-sales-utility/forexrates-stock-and-sales-utility.service';
import { ForexratesStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/forexrates-stock-and-sales-utility/forexrates-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('ForexratesStockAndSalesUtility Management Component', () => {
        let comp: ForexratesStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<ForexratesStockAndSalesUtilityComponent>;
        let service: ForexratesStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [ForexratesStockAndSalesUtilityComponent],
                providers: [
                    ForexratesStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(ForexratesStockAndSalesUtilityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ForexratesStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ForexratesStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ForexratesStockAndSalesUtility(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.forexrates[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
