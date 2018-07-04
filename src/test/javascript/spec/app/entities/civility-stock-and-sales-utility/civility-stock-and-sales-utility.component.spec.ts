/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CivilityStockAndSalesUtilityComponent } from '../../../../../../main/webapp/app/entities/civility-stock-and-sales-utility/civility-stock-and-sales-utility.component';
import { CivilityStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/civility-stock-and-sales-utility/civility-stock-and-sales-utility.service';
import { CivilityStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/civility-stock-and-sales-utility/civility-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('CivilityStockAndSalesUtility Management Component', () => {
        let comp: CivilityStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<CivilityStockAndSalesUtilityComponent>;
        let service: CivilityStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CivilityStockAndSalesUtilityComponent],
                providers: [
                    CivilityStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(CivilityStockAndSalesUtilityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CivilityStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CivilityStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CivilityStockAndSalesUtility(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.civilities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
