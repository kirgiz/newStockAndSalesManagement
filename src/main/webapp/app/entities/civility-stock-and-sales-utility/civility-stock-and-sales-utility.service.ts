import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CivilityStockAndSalesUtility } from './civility-stock-and-sales-utility.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CivilityStockAndSalesUtility>;

@Injectable()
export class CivilityStockAndSalesUtilityService {

    private resourceUrl =  SERVER_API_URL + 'api/civilities';

    constructor(private http: HttpClient) { }

    create(civility: CivilityStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(civility);
        return this.http.post<CivilityStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(civility: CivilityStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(civility);
        return this.http.put<CivilityStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CivilityStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CivilityStockAndSalesUtility[]>> {
        const options = createRequestOption(req);
        return this.http.get<CivilityStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CivilityStockAndSalesUtility[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CivilityStockAndSalesUtility = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CivilityStockAndSalesUtility[]>): HttpResponse<CivilityStockAndSalesUtility[]> {
        const jsonResponse: CivilityStockAndSalesUtility[] = res.body;
        const body: CivilityStockAndSalesUtility[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CivilityStockAndSalesUtility.
     */
    private convertItemFromServer(civility: CivilityStockAndSalesUtility): CivilityStockAndSalesUtility {
        const copy: CivilityStockAndSalesUtility = Object.assign({}, civility);
        return copy;
    }

    /**
     * Convert a CivilityStockAndSalesUtility to a JSON which can be sent to the server.
     */
    private convert(civility: CivilityStockAndSalesUtility): CivilityStockAndSalesUtility {
        const copy: CivilityStockAndSalesUtility = Object.assign({}, civility);
        return copy;
    }
}
