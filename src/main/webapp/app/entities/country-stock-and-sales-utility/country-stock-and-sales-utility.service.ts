import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CountryStockAndSalesUtility } from './country-stock-and-sales-utility.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CountryStockAndSalesUtility>;

@Injectable()
export class CountryStockAndSalesUtilityService {

    private resourceUrl =  SERVER_API_URL + 'api/countries';

    constructor(private http: HttpClient) { }

    create(country: CountryStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(country);
        return this.http.post<CountryStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(country: CountryStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(country);
        return this.http.put<CountryStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CountryStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CountryStockAndSalesUtility[]>> {
        const options = createRequestOption(req);
        return this.http.get<CountryStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CountryStockAndSalesUtility[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CountryStockAndSalesUtility = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CountryStockAndSalesUtility[]>): HttpResponse<CountryStockAndSalesUtility[]> {
        const jsonResponse: CountryStockAndSalesUtility[] = res.body;
        const body: CountryStockAndSalesUtility[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CountryStockAndSalesUtility.
     */
    private convertItemFromServer(country: CountryStockAndSalesUtility): CountryStockAndSalesUtility {
        const copy: CountryStockAndSalesUtility = Object.assign({}, country);
        return copy;
    }

    /**
     * Convert a CountryStockAndSalesUtility to a JSON which can be sent to the server.
     */
    private convert(country: CountryStockAndSalesUtility): CountryStockAndSalesUtility {
        const copy: CountryStockAndSalesUtility = Object.assign({}, country);
        return copy;
    }
}
