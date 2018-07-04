import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CurrencyStockAndSalesUtility } from './currency-stock-and-sales-utility.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CurrencyStockAndSalesUtility>;

@Injectable()
export class CurrencyStockAndSalesUtilityService {

    private resourceUrl =  SERVER_API_URL + 'api/currencies';

    constructor(private http: HttpClient) { }

    create(currency: CurrencyStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(currency);
        return this.http.post<CurrencyStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(currency: CurrencyStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(currency);
        return this.http.put<CurrencyStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CurrencyStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CurrencyStockAndSalesUtility[]>> {
        const options = createRequestOption(req);
        return this.http.get<CurrencyStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CurrencyStockAndSalesUtility[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CurrencyStockAndSalesUtility = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CurrencyStockAndSalesUtility[]>): HttpResponse<CurrencyStockAndSalesUtility[]> {
        const jsonResponse: CurrencyStockAndSalesUtility[] = res.body;
        const body: CurrencyStockAndSalesUtility[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CurrencyStockAndSalesUtility.
     */
    private convertItemFromServer(currency: CurrencyStockAndSalesUtility): CurrencyStockAndSalesUtility {
        const copy: CurrencyStockAndSalesUtility = Object.assign({}, currency);
        return copy;
    }

    /**
     * Convert a CurrencyStockAndSalesUtility to a JSON which can be sent to the server.
     */
    private convert(currency: CurrencyStockAndSalesUtility): CurrencyStockAndSalesUtility {
        const copy: CurrencyStockAndSalesUtility = Object.assign({}, currency);
        return copy;
    }
}
