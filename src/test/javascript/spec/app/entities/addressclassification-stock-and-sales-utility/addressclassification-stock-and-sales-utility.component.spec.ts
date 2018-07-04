/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { AddressclassificationStockAndSalesUtilityComponent } from '../../../../../../main/webapp/app/entities/addressclassification-stock-and-sales-utility/addressclassification-stock-and-sales-utility.component';
import { AddressclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/addressclassification-stock-and-sales-utility/addressclassification-stock-and-sales-utility.service';
import { AddressclassificationStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/addressclassification-stock-and-sales-utility/addressclassification-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('AddressclassificationStockAndSalesUtility Management Component', () => {
        let comp: AddressclassificationStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<AddressclassificationStockAndSalesUtilityComponent>;
        let service: AddressclassificationStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [AddressclassificationStockAndSalesUtilityComponent],
                providers: [
                    AddressclassificationStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(AddressclassificationStockAndSalesUtilityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressclassificationStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressclassificationStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AddressclassificationStockAndSalesUtility(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.addressclassifications[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
