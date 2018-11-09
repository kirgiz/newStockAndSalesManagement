import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IForexratesStockAndSalesUtility } from 'app/shared/model/forexrates-stock-and-sales-utility.model';

type EntityResponseType = HttpResponse<IForexratesStockAndSalesUtility>;
type EntityArrayResponseType = HttpResponse<IForexratesStockAndSalesUtility[]>;

@Injectable({ providedIn: 'root' })
export class ForexratesStockAndSalesUtilityService {
    public resourceUrl = SERVER_API_URL + 'api/forexrates';

    constructor(private http: HttpClient) {}

    create(forexrates: IForexratesStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(forexrates);
        return this.http
            .post<IForexratesStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(forexrates: IForexratesStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(forexrates);
        return this.http
            .put<IForexratesStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IForexratesStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IForexratesStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(forexrates: IForexratesStockAndSalesUtility): IForexratesStockAndSalesUtility {
        const copy: IForexratesStockAndSalesUtility = Object.assign({}, forexrates, {
            rateDate: forexrates.rateDate != null && forexrates.rateDate.isValid() ? forexrates.rateDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.rateDate = res.body.rateDate != null ? moment(res.body.rateDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((forexrates: IForexratesStockAndSalesUtility) => {
                forexrates.rateDate = forexrates.rateDate != null ? moment(forexrates.rateDate) : null;
            });
        }
        return res;
    }
}
