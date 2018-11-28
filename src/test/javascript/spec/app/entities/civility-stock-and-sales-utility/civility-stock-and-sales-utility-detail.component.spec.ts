/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { CivilityStockAndSalesUtilityDetailComponent } from 'app/entities/civility-stock-and-sales-utility/civility-stock-and-sales-utility-detail.component';
import { CivilityStockAndSalesUtility } from 'app/shared/model/civility-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('CivilityStockAndSalesUtility Management Detail Component', () => {
        let comp: CivilityStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<CivilityStockAndSalesUtilityDetailComponent>;
        const route = ({ data: of({ civility: new CivilityStockAndSalesUtility(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [CivilityStockAndSalesUtilityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CivilityStockAndSalesUtilityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CivilityStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.civility).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
