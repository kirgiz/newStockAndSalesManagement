/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { MaterialclassificationStockAndSalesUtilityDetailComponent } from 'app/entities/materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility-detail.component';
import { MaterialclassificationStockAndSalesUtility } from 'app/shared/model/materialclassification-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('MaterialclassificationStockAndSalesUtility Management Detail Component', () => {
        let comp: MaterialclassificationStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<MaterialclassificationStockAndSalesUtilityDetailComponent>;
        const route = ({
            data: of({ materialclassification: new MaterialclassificationStockAndSalesUtility(123) })
        } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [MaterialclassificationStockAndSalesUtilityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MaterialclassificationStockAndSalesUtilityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MaterialclassificationStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.materialclassification).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
