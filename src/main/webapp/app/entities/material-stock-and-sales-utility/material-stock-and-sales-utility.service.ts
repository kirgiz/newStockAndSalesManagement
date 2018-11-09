import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMaterialStockAndSalesUtility } from 'app/shared/model/material-stock-and-sales-utility.model';

type EntityResponseType = HttpResponse<IMaterialStockAndSalesUtility>;
type EntityArrayResponseType = HttpResponse<IMaterialStockAndSalesUtility[]>;

@Injectable({ providedIn: 'root' })
export class MaterialStockAndSalesUtilityService {
    public resourceUrl = SERVER_API_URL + 'api/materials';

    constructor(private http: HttpClient) {}

    create(material: IMaterialStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(material);
        return this.http
            .post<IMaterialStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(material: IMaterialStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(material);
        return this.http
            .put<IMaterialStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMaterialStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMaterialStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(material: IMaterialStockAndSalesUtility): IMaterialStockAndSalesUtility {
        const copy: IMaterialStockAndSalesUtility = Object.assign({}, material, {
            creationDate:
                material.creationDate != null && material.creationDate.isValid() ? material.creationDate.format(DATE_FORMAT) : null
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
            res.body.forEach((material: IMaterialStockAndSalesUtility) => {
                material.creationDate = material.creationDate != null ? moment(material.creationDate) : null;
            });
        }
        return res;
    }
}
