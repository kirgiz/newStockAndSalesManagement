import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILotStockAndSalesUtility } from 'app/shared/model/lot-stock-and-sales-utility.model';

type EntityResponseType = HttpResponse<ILotStockAndSalesUtility>;
type EntityArrayResponseType = HttpResponse<ILotStockAndSalesUtility[]>;

@Injectable({ providedIn: 'root' })
export class LotStockAndSalesUtilityService {
    public resourceUrl = SERVER_API_URL + 'api/lots';

    constructor(private http: HttpClient) {}

    create(lot: ILotStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(lot);
        return this.http
            .post<ILotStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(lot: ILotStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(lot);
        return this.http
            .put<ILotStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ILotStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ILotStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(lot: ILotStockAndSalesUtility): ILotStockAndSalesUtility {
        const copy: ILotStockAndSalesUtility = Object.assign({}, lot, {
            creationDate: lot.creationDate != null && lot.creationDate.isValid() ? lot.creationDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((lot: ILotStockAndSalesUtility) => {
                lot.creationDate = lot.creationDate != null ? moment(lot.creationDate) : null;
            });
        }
        return res;
    }
}
