/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { MaterialhistoryStockAndSalesUtilityComponent } from '../../../../../../main/webapp/app/entities/materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility.component';
import { MaterialhistoryStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility.service';
import { MaterialhistoryStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('MaterialhistoryStockAndSalesUtility Management Component', () => {
        let comp: MaterialhistoryStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<MaterialhistoryStockAndSalesUtilityComponent>;
        let service: MaterialhistoryStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [MaterialhistoryStockAndSalesUtilityComponent],
                providers: [
                    MaterialhistoryStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(MaterialhistoryStockAndSalesUtilityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaterialhistoryStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterialhistoryStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MaterialhistoryStockAndSalesUtility(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.materialhistories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
