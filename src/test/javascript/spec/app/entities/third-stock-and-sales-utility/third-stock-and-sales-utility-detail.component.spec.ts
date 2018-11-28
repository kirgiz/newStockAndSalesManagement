/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { ThirdStockAndSalesUtilityDetailComponent } from 'app/entities/third-stock-and-sales-utility/third-stock-and-sales-utility-detail.component';
import { ThirdStockAndSalesUtility } from 'app/shared/model/third-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('ThirdStockAndSalesUtility Management Detail Component', () => {
        let comp: ThirdStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<ThirdStockAndSalesUtilityDetailComponent>;
        const route = ({ data: of({ third: new ThirdStockAndSalesUtility(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [ThirdStockAndSalesUtilityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ThirdStockAndSalesUtilityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ThirdStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.third).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
