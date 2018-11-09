/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { AddressStockAndSalesUtilityComponent } from 'app/entities/address-stock-and-sales-utility/address-stock-and-sales-utility.component';
import { AddressStockAndSalesUtilityService } from 'app/entities/address-stock-and-sales-utility/address-stock-and-sales-utility.service';
import { AddressStockAndSalesUtility } from 'app/shared/model/address-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('AddressStockAndSalesUtility Management Component', () => {
        let comp: AddressStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<AddressStockAndSalesUtilityComponent>;
        let service: AddressStockAndSalesUtilityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [AddressStockAndSalesUtilityComponent],
                providers: []
            })
                .overrideTemplate(AddressStockAndSalesUtilityComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AddressStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressStockAndSalesUtilityService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AddressStockAndSalesUtility(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.addresses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
