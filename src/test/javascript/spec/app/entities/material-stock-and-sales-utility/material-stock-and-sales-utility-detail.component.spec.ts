/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { MaterialStockAndSalesUtilityDetailComponent } from 'app/entities/material-stock-and-sales-utility/material-stock-and-sales-utility-detail.component';
import { MaterialStockAndSalesUtility } from 'app/shared/model/material-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('MaterialStockAndSalesUtility Management Detail Component', () => {
        let comp: MaterialStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<MaterialStockAndSalesUtilityDetailComponent>;
        const route = ({ data: of({ material: new MaterialStockAndSalesUtility(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [MaterialStockAndSalesUtilityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MaterialStockAndSalesUtilityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MaterialStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.material).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
