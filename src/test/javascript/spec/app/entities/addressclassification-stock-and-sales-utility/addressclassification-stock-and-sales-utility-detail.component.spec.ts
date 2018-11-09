/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { AddressclassificationStockAndSalesUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/addressclassification-stock-and-sales-utility/addressclassification-stock-and-sales-utility-detail.component';
import { AddressclassificationStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/addressclassification-stock-and-sales-utility/addressclassification-stock-and-sales-utility.service';
import { AddressclassificationStockAndSalesUtility } from '../../../../../../main/webapp/app/entities/addressclassification-stock-and-sales-utility/addressclassification-stock-and-sales-utility.model';

describe('Component Tests', () => {

    describe('AddressclassificationStockAndSalesUtility Management Detail Component', () => {
        let comp: AddressclassificationStockAndSalesUtilityDetailComponent;
        let fixture: ComponentFixture<AddressclassificationStockAndSalesUtilityDetailComponent>;
        let service: AddressclassificationStockAndSalesUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [AddressclassificationStockAndSalesUtilityDetailComponent],
                providers: [
                    AddressclassificationStockAndSalesUtilityService
                ]
            })
            .overrideTemplate(AddressclassificationStockAndSalesUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressclassificationStockAndSalesUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressclassificationStockAndSalesUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AddressclassificationStockAndSalesUtility(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.addressclassification).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
