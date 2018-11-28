/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { AddressStockAndSalesUtilityDetailComponent } from 'app/entities/address-stock-and-sales-utility/address-stock-and-sales-utility-detail.component';
import { AddressStockAndSalesUtility } from 'app/shared/model/address-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('AddressStockAndSalesUtility Management Detail Component', () => {
        let comp: AddressStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<AddressStockAndSalesUtilityDetailComponent>;
        const route = ({ data: of({ address: new AddressStockAndSalesUtility(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [AddressStockAndSalesUtilityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AddressStockAndSalesUtilityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AddressStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.address).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
