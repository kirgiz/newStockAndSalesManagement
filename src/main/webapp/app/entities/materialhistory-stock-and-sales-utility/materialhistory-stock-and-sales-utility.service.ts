import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMaterialhistoryStockAndSalesUtility } from 'app/shared/model/materialhistory-stock-and-sales-utility.model';

type EntityResponseType = HttpResponse<IMaterialhistoryStockAndSalesUtility>;
type EntityArrayResponseType = HttpResponse<IMaterialhistoryStockAndSalesUtility[]>;

@Injectable({ providedIn: 'root' })
export class MaterialhistoryStockAndSalesUtilityService {
    public resourceUrl = SERVER_API_URL + 'api/materialhistories';

    constructor(private http: HttpClient) {}

    create(materialhistory: IMaterialhistoryStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(materialhistory);
        return this.http
            .post<IMaterialhistoryStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(materialhistory: IMaterialhistoryStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(materialhistory);
        return this.http
            .put<IMaterialhistoryStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMaterialhistoryStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMaterialhistoryStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(materialhistory: IMaterialhistoryStockAndSalesUtility): IMaterialhistoryStockAndSalesUtility {
        const copy: IMaterialhistoryStockAndSalesUtility = Object.assign({}, materialhistory, {
            creationDate:
                materialhistory.creationDate != null && materialhistory.creationDate.isValid()
                    ? materialhistory.creationDate.format(DATE_FORMAT)
                    : null
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
            res.body.forEach((materialhistory: IMaterialhistoryStockAndSalesUtility) => {
                materialhistory.creationDate = materialhistory.creationDate != null ? moment(materialhistory.creationDate) : null;
            });
        }
        return res;
    }
}
