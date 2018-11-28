/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { ForexratesStockAndSalesUtilityDetailComponent } from 'app/entities/forexrates-stock-and-sales-utility/forexrates-stock-and-sales-utility-detail.component';
import { ForexratesStockAndSalesUtility } from 'app/shared/model/forexrates-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('ForexratesStockAndSalesUtility Management Detail Component', () => {
        let comp: ForexratesStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<ForexratesStockAndSalesUtilityDetailComponent>;
        const route = ({ data: of({ forexrates: new ForexratesStockAndSalesUtility(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [ForexratesStockAndSalesUtilityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ForexratesStockAndSalesUtilityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ForexratesStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.forexrates).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
