import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { LotStockAndSalesUtility } from './lot-stock-and-sales-utility.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LotStockAndSalesUtility>;

@Injectable()
export class LotStockAndSalesUtilityService {

    private resourceUrl =  SERVER_API_URL + 'api/lots';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(lot: LotStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(lot);
        return this.http.post<LotStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(lot: LotStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(lot);
        return this.http.put<LotStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LotStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LotStockAndSalesUtility[]>> {
        const options = createRequestOption(req);
        return this.http.get<LotStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LotStockAndSalesUtility[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LotStockAndSalesUtility = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LotStockAndSalesUtility[]>): HttpResponse<LotStockAndSalesUtility[]> {
        const jsonResponse: LotStockAndSalesUtility[] = res.body;
        const body: LotStockAndSalesUtility[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LotStockAndSalesUtility.
     */
    private convertItemFromServer(lot: LotStockAndSalesUtility): LotStockAndSalesUtility {
        const copy: LotStockAndSalesUtility = Object.assign({}, lot);
        copy.creationDate = this.dateUtils
            .convertLocalDateFromServer(lot.creationDate);
        return copy;
    }

    /**
     * Convert a LotStockAndSalesUtility to a JSON which can be sent to the server.
     */
    private convert(lot: LotStockAndSalesUtility): LotStockAndSalesUtility {
        const copy: LotStockAndSalesUtility = Object.assign({}, lot);
        copy.creationDate = this.dateUtils
            .convertLocalDateToServer(lot.creationDate);
        return copy;
    }
}
