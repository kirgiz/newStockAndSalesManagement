/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { AddressStockAndSalesUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/address-stock-and-sales-utility/address-stock-and-sales-utility-detail.component';
import { AddressStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/address-stock-and-sales-utility/address-stock-and-sales-utility.service';
import { AddressStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/address-stock-and-sales-utility/address-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('AddressStockAndSalesUtility Management Detail Component', () => {
        let comp: AddressStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<AddressStockAndSalesUtilityDetailComponent>;
        let service: AddressStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [AddressStockAndSalesUtilityDetailComponent],
                providers: [
                    AddressStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(AddressStockAndSalesUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AddressStockAndSalesUtility(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.address).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
