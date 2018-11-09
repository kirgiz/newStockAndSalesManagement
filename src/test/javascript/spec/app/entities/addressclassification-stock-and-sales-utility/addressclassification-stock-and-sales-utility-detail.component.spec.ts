/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { AddressclassificationStockAndSalesUtilityDetailComponent } from 'app/entities/addressclassification-stock-and-sales-utility/addressclassification-stock-and-sales-utility-detail.component';
import { AddressclassificationStockAndSalesUtility } from 'app/shared/model/addressclassification-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('AddressclassificationStockAndSalesUtility Management Detail Component', () => {
        let comp: AddressclassificationStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<AddressclassificationStockAndSalesUtilityDetailComponent>;
        const route = ({
            data: of({ addressclassification: new AddressclassificationStockAndSalesUtility(123) })
        } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [AddressclassificationStockAndSalesUtilityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AddressclassificationStockAndSalesUtilityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AddressclassificationStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.addressclassification).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
