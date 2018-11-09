/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { MaterialStockAndSalesUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/material-stock-and-sales-utility/material-stock-and-sales-utility-detail.component';
import { MaterialStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/material-stock-and-sales-utility/material-stock-and-sales-utility.service';
import { MaterialStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/material-stock-and-sales-utility/material-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('MaterialStockAndSalesUtility Management Detail Component', () => {
        let comp: MaterialStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<MaterialStockAndSalesUtilityDetailComponent>;
        let service: MaterialStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [MaterialStockAndSalesUtilityDetailComponent],
                providers: [
                    MaterialStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(MaterialStockAndSalesUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaterialStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterialStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MaterialStockAndSalesUtility(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.material).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
