/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { MaterialhistoryStockAndSalesUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility-detail.component';
import { MaterialhistoryStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility.service';
import { MaterialhistoryStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('MaterialhistoryStockAndSalesUtility Management Detail Component', () => {
        let comp: MaterialhistoryStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<MaterialhistoryStockAndSalesUtilityDetailComponent>;
        let service: MaterialhistoryStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [MaterialhistoryStockAndSalesUtilityDetailComponent],
                providers: [
                    MaterialhistoryStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(MaterialhistoryStockAndSalesUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaterialhistoryStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterialhistoryStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MaterialhistoryStockAndSalesUtility(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.materialhistory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
