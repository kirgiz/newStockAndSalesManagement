/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { LotStockAndSalesUtilityService } from 'app/entities/lot-stock-and-sales-utility/lot-stock-and-sales-utility.service';
import { ILotStockAndSalesUtility, LotStockAndSalesUtility } from 'app/shared/model/lot-stock-and-sales-utility.model';

describe('Service Tests', () => {
    describe('LotStockAndSalesUtility Service', () => {
        let injector: TestBed;
        let service: LotStockAndSalesUtilityService;
        let httpMock: HttpTestingController;
        let elemDefault: ILotStockAndSalesUtility;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(LotStockAndSalesUtilityService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new LotStockAndSalesUtility(0, 'AAAAAAA', 'AAAAAAA', currentDate, 0, 'AAAAAAA', 0, false);
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

            it('should create a LotStockAndSalesUtility', async () => {
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
                    .create(new LotStockAndSalesUtility(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a LotStockAndSalesUtility', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        description: 'BBBBBB',
                        creationDate: currentDate.format(DATE_FORMAT),
                        numberOfItems: 1,
                        comments: 'BBBBBB',
                        unitBuyPrice: 1,
                        itemsGenerated: true
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

            it('should return a list of LotStockAndSalesUtility', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        description: 'BBBBBB',
                        creationDate: currentDate.format(DATE_FORMAT),
                        numberOfItems: 1,
                        comments: 'BBBBBB',
                        unitBuyPrice: 1,
                        itemsGenerated: true
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

            it('should delete a LotStockAndSalesUtility', async () => {
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
