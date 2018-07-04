/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { MaterialclassificationStockAndSalesUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility-detail.component';
import { MaterialclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility.service';
import { MaterialclassificationStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('MaterialclassificationStockAndSalesUtility Management Detail Component', () => {
        let comp: MaterialclassificationStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<MaterialclassificationStockAndSalesUtilityDetailComponent>;
        let service: MaterialclassificationStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [MaterialclassificationStockAndSalesUtilityDetailComponent],
                providers: [
                    MaterialclassificationStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(MaterialclassificationStockAndSalesUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaterialclassificationStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterialclassificationStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MaterialclassificationStockAndSalesUtility(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.materialclassification).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
