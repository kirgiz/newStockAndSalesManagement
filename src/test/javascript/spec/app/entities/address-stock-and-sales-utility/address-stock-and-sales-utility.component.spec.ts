/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { AddressStockAndSalesUtilityComponent } from '../../../../../../main/webapp/app/entities/address-stock-and-sales-utility/address-stock-and-sales-utility.component';
import { AddressStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/address-stock-and-sales-utility/address-stock-and-sales-utility.service';
import { AddressStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/address-stock-and-sales-utility/address-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('AddressStockAndSalesUtility Management Component', () => {
        let comp: AddressStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<AddressStockAndSalesUtilityComponent>;
        let service: AddressStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [AddressStockAndSalesUtilityComponent],
                providers: [
                    AddressStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(AddressStockAndSalesUtilityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AddressStockAndSalesUtility(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.addresses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
