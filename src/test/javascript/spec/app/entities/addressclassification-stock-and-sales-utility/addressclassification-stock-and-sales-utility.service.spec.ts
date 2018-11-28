/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AddressclassificationStockAndSalesUtilityService } from 'app/entities/addressclassification-stock-and-sales-utility/addressclassification-stock-and-sales-utility.service';
import {
    IAddressclassificationStockAndSalesUtility,
    AddressclassificationStockAndSalesUtility
} from 'app/shared/model/addressclassification-stock-and-sales-utility.model';

describe('Service Tests', () => {
    describe('AddressclassificationStockAndSalesUtility Service', () => {
        let injector: TestBed;
        let service: AddressclassificationStockAndSalesUtilityService;
        let httpMock: HttpTestingController;
        let elemDefault: IAddressclassificationStockAndSalesUtility;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(AddressclassificationStockAndSalesUtilityService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new AddressclassificationStockAndSalesUtility(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a AddressclassificationStockAndSalesUtility', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new AddressclassificationStockAndSalesUtility(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a AddressclassificationStockAndSalesUtility', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        name: 'BBBBBB',
                        comments: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of AddressclassificationStockAndSalesUtility', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        name: 'BBBBBB',
                        comments: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a AddressclassificationStockAndSalesUtility', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
