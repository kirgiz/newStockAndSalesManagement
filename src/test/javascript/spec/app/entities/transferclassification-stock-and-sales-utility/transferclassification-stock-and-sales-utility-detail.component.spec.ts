/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { TransferclassificationStockAndSalesUtilityDetailComponent } from 'app/entities/transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility-detail.component';
import { TransferclassificationStockAndSalesUtility } from 'app/shared/model/transferclassification-stock-and-sales-utility.model';

describe('Component Tests', () => {
    describe('TransferclassificationStockAndSalesUtility Management Detail Component', () => {
        let comp: TransferclassificationStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<TransferclassificationStockAndSalesUtilityDetailComponent>;
        const route = ({
            data: of({ transferclassification: new TransferclassificationStockAndSalesUtility(123) })
        } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [TransferclassificationStockAndSalesUtilityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TransferclassificationStockAndSalesUtilityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransferclassificationStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.transferclassification).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
