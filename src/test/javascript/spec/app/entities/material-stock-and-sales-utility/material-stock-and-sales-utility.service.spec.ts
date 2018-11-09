/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { MaterialStockAndSalesUtilityService } from 'app/entities/material-stock-and-sales-utility/material-stock-and-sales-utility.service';
import { IMaterialStockAndSalesUtility, MaterialStockAndSalesUtility } from 'app/shared/model/material-stock-and-sales-utility.model';

describe('Service Tests', () => {
    describe('MaterialStockAndSalesUtility Service', () => {
        let injector: TestBed;
        let service: MaterialStockAndSalesUtilityService;
        let httpMock: HttpTestingController;
        let elemDefault: IMaterialStockAndSalesUtility;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(MaterialStockAndSalesUtilityService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new MaterialStockAndSalesUtility(0, 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA', 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        creationDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a MaterialStockAndSalesUtility', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        creationDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        creationDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new MaterialStockAndSalesUtility(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a MaterialStockAndSalesUtility', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        description: 'BBBBBB',
                        creationDate: currentDate.format(DATE_FORMAT),
                        comments: 'BBBBBB',
                        currentLocation: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        creationDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of MaterialStockAndSalesUtility', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        description: 'BBBBBB',
                        creationDate: currentDate.format(DATE_FORMAT),
                        comments: 'BBBBBB',
                        currentLocation: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        creationDate: currentDate
                    },
                    returnedFromService
                );
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

            it('should delete a MaterialStockAndSalesUtility', async () => {
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
