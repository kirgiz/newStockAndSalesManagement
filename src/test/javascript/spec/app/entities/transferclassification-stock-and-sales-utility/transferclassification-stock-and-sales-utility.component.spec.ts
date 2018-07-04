/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { TransferclassificationStockAndSalesUtilityComponent } from '../../../../../../main/webapp/app/entities/transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility.component';
import { TransferclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility.service';
import { TransferclassificationStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('TransferclassificationStockAndSalesUtility Management Component', () => {
        let comp: TransferclassificationStockAndSalesUtilityComponent;
        let fixture: ComponentFixture<TransferclassificationStockAndSalesUtilityComponent>;
        let service: TransferclassificationStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [TransferclassificationStockAndSalesUtilityComponent],
                providers: [
                    TransferclassificationStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(TransferclassificationStockAndSalesUtilityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransferclassificationStockAndSalesUtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransferclassificationStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TransferclassificationStockAndSalesUtility(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.transferclassifications[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
