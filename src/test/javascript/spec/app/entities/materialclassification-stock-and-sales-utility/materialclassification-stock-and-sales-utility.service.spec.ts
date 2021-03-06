/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { MaterialclassificationStockAndSalesUtilityService } from 'app/entities/materialclassification-stock-and-sales-utility/materialclassification-stock-and-sales-utility.service';
import {
    IMaterialclassificationStockAndSalesUtility,
    MaterialclassificationStockAndSalesUtility
} from 'app/shared/model/materialclassification-stock-and-sales-utility.model';

describe('Service Tests', () => {
    describe('MaterialclassificationStockAndSalesUtility Service', () => {
        let injector: TestBed;
        let service: MaterialclassificationStockAndSalesUtilityService;
        let httpMock: HttpTestingController;
        let elemDefault: IMaterialclassificationStockAndSalesUtility;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(MaterialclassificationStockAndSalesUtilityService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new MaterialclassificationStockAndSalesUtility(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
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

            it('should create a MaterialclassificationStockAndSalesUtility', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new MaterialclassificationStockAndSalesUtility(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a MaterialclassificationStockAndSalesUtility', async () => {
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

            it('should return a list of MaterialclassificationStockAndSalesUtility', async () => {
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

            it('should delete a MaterialclassificationStockAndSalesUtility', async () => {
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
