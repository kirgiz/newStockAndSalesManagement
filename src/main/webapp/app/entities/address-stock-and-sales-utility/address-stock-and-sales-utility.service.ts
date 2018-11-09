import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAddressStockAndSalesUtility } from 'app/shared/model/address-stock-and-sales-utility.model';

type EntityResponseType = HttpResponse<IAddressStockAndSalesUtility>;
type EntityArrayResponseType = HttpResponse<IAddressStockAndSalesUtility[]>;

@Injectable({ providedIn: 'root' })
export class AddressStockAndSalesUtilityService {
    public resourceUrl = SERVER_API_URL + 'api/addresses';

    constructor(private http: HttpClient) {}

    create(address: IAddressStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(address);
        return this.http
            .post<IAddressStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(address: IAddressStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(address);
        return this.http
            .put<IAddressStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAddressStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAddressStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(address: IAddressStockAndSalesUtility): IAddressStockAndSalesUtility {
        const copy: IAddressStockAndSalesUtility = Object.assign({}, address, {
            validFrom: address.validFrom != null && address.validFrom.isValid() ? address.validFrom.format(DATE_FORMAT) : null,
            validTo: address.validTo != null && address.validTo.isValid() ? address.validTo.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.validFrom = res.body.validFrom != null ? moment(res.body.validFrom) : null;
            res.body.validTo = res.body.validTo != null ? moment(res.body.validTo) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((address: IAddressStockAndSalesUtility) => {
                address.validFrom = address.validFrom != null ? moment(address.validFrom) : null;
                address.validTo = address.validTo != null ? moment(address.validTo) : null;
            });
        }
        return res;
    }
}
