import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AddressStockAndSalesUtility } from './address-stock-and-sales-utility.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AddressStockAndSalesUtility>;

@Injectable()
export class AddressStockAndSalesUtilityService {

    private resourceUrl =  SERVER_API_URL + 'api/addresses';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(address: AddressStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(address);
        return this.http.post<AddressStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(address: AddressStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(address);
        return this.http.put<AddressStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AddressStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AddressStockAndSalesUtility[]>> {
        const options = createRequestOption(req);
        return this.http.get<AddressStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AddressStockAndSalesUtility[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AddressStockAndSalesUtility = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AddressStockAndSalesUtility[]>): HttpResponse<AddressStockAndSalesUtility[]> {
        const jsonResponse: AddressStockAndSalesUtility[] = res.body;
        const body: AddressStockAndSalesUtility[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AddressStockAndSalesUtility.
     */
    private convertItemFromServer(address: AddressStockAndSalesUtility): AddressStockAndSalesUtility {
        const copy: AddressStockAndSalesUtility = Object.assign({}, address);
        copy.validFrom = this.dateUtils
            .convertLocalDateFromServer(address.validFrom);
        copy.validTo = this.dateUtils
            .convertLocalDateFromServer(address.validTo);
        return copy;
    }

    /**
     * Convert a AddressStockAndSalesUtility to a JSON which can be sent to the server.
     */
    private convert(address: AddressStockAndSalesUtility): AddressStockAndSalesUtility {
        const copy: AddressStockAndSalesUtility = Object.assign({}, address);
        copy.validFrom = this.dateUtils
            .convertLocalDateToServer(address.validFrom);
        copy.validTo = this.dateUtils
            .convertLocalDateToServer(address.validTo);
        return copy;
    }
}
