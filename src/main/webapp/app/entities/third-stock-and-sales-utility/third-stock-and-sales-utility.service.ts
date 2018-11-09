import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ThirdStockAndSalesUtility } from './third-stock-and-sales-utility.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ThirdStockAndSalesUtility>;

@Injectable()
export class ThirdStockAndSalesUtilityService {

    private resourceUrl =  SERVER_API_URL + 'api/thirds';

    constructor(private http: HttpClient) { }

    create(third: ThirdStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(third);
        return this.http.post<ThirdStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(third: ThirdStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(third);
        return this.http.put<ThirdStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ThirdStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ThirdStockAndSalesUtility[]>> {
        const options = createRequestOption(req);
        return this.http.get<ThirdStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ThirdStockAndSalesUtility[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ThirdStockAndSalesUtility = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ThirdStockAndSalesUtility[]>): HttpResponse<ThirdStockAndSalesUtility[]> {
        const jsonResponse: ThirdStockAndSalesUtility[] = res.body;
        const body: ThirdStockAndSalesUtility[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ThirdStockAndSalesUtility.
     */
    private convertItemFromServer(third: ThirdStockAndSalesUtility): ThirdStockAndSalesUtility {
        const copy: ThirdStockAndSalesUtility = Object.assign({}, third);
        return copy;
    }

    /**
     * Convert a ThirdStockAndSalesUtility to a JSON which can be sent to the server.
     */
    private convert(third: ThirdStockAndSalesUtility): ThirdStockAndSalesUtility {
        const copy: ThirdStockAndSalesUtility = Object.assign({}, third);
        return copy;
    }
}
