/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { MaterialhistoryStockAndSalesUtilityDetailComponent } from 'app/entities/materialhistory-stock-and-sales-utility/materialhistory-stock-and-sales-utility-detail.component';
import { MaterialhistoryStockAndSalesUtility } from 'app/shared/model/materialhistory-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('MaterialhistoryStockAndSalesUtility Management Detail Component', () => {
        let comp: MaterialhistoryStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<MaterialhistoryStockAndSalesUtilityDetailComponent>;
        const route = ({ data: of({ materialhistory: new MaterialhistoryStockAndSalesUtility(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [MaterialhistoryStockAndSalesUtilityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MaterialhistoryStockAndSalesUtilityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MaterialhistoryStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.materialhistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
