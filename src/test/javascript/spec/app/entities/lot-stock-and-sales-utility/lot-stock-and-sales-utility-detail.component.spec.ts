/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { LotStockAndSalesUtilityDetailComponent } from 'app/entities/lot-stock-and-sales-utility/lot-stock-and-sales-utility-detail.component';
import { LotStockAndSalesUtility } from 'app/shared/model/lot-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('LotStockAndSalesUtility Management Detail Component', () => {
        let comp: LotStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<LotStockAndSalesUtilityDetailComponent>;
        const route = ({ data: of({ lot: new LotStockAndSalesUtility(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [LotStockAndSalesUtilityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LotStockAndSalesUtilityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LotStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.lot).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
