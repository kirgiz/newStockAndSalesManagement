/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { MaterialStockAndSalesUtilityComponent } from '../../../../../../main/webapp/app/entities/material-stock-and-sales-utility/material-stock-and-sales-utility.component';
import { MaterialStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/material-stock-and-sales-utility/material-stock-and-sales-utility.service';
import { MaterialStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/material-stock-and-sales-utility/material-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('MaterialStockAndSalesUtility Management Component', () => {
        let comp: MaterialStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<MaterialStockAndSalesUtilityComponent>;
        let service: MaterialStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [MaterialStockAndSalesUtilityComponent],
                providers: [
                    MaterialStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(MaterialStockAndSalesUtilityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaterialStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterialStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MaterialStockAndSalesUtility(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.materials[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
