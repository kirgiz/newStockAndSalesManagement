/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { ThirdclassificationStockAndSalesUtilityDetailComponent } from 'app/entities/thirdclassification-stock-and-sales-utility/thirdclassification-stock-and-sales-utility-detail.component';
import { ThirdclassificationStockAndSalesUtility } from 'app/shared/model/thirdclassification-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('ThirdclassificationStockAndSalesUtility Management Detail Component', () => {
        let comp: ThirdclassificationStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<ThirdclassificationStockAndSalesUtilityDetailComponent>;
        const route = ({ data: of({ thirdclassification: new ThirdclassificationStockAndSalesUtility(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [ThirdclassificationStockAndSalesUtilityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ThirdclassificationStockAndSalesUtilityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ThirdclassificationStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.thirdclassification).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
