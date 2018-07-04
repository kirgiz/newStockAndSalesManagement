/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CivilityStockAndSalesUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/civility-stock-and-sales-utility/civility-stock-and-sales-utility-detail.component';
import { CivilityStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/civility-stock-and-sales-utility/civility-stock-and-sales-utility.service';
import { CivilityStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/civility-stock-and-sales-utility/civility-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('CivilityStockAndSalesUtility Management Detail Component', () => {
        let comp: CivilityStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<CivilityStockAndSalesUtilityDetailComponent>;
        let service: CivilityStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CivilityStockAndSalesUtilityDetailComponent],
                providers: [
                    CivilityStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(CivilityStockAndSalesUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CivilityStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CivilityStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CivilityStockAndSalesUtility(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.civility).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
