/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { MaterialclassificationStockAndSalesUtilityComponent } from '../../../../../../main/webapp/app/entities/materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility.component';
import { MaterialclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility.service';
import { MaterialclassificationStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('MaterialclassificationStockAndSalesUtility Management Component', () => {
        let comp: MaterialclassificationStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<MaterialclassificationStockAndSalesUtilityComponent>;
        let service: MaterialclassificationStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [MaterialclassificationStockAndSalesUtilityComponent],
                providers: [
                    MaterialclassificationStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(MaterialclassificationStockAndSalesUtilityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaterialclassificationStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterialclassificationStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MaterialclassificationStockAndSalesUtility(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.materialclassifications[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
