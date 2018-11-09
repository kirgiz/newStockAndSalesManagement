/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { TransferclassificationStockAndSalesUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility-detail.component';
import { TransferclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility.service';
import { TransferclassificationStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('TransferclassificationStockAndSalesUtility Management Detail Component', () => {
        let comp: TransferclassificationStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<TransferclassificationStockAndSalesUtilityDetailComponent>;
        let service: TransferclassificationStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [TransferclassificationStockAndSalesUtilityDetailComponent],
                providers: [
                    TransferclassificationStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(TransferclassificationStockAndSalesUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransferclassificationStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransferclassificationStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TransferclassificationStockAndSalesUtility(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.transferclassification).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
