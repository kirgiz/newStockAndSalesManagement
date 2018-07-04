import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ForexratesStockAndSalesUtility } from './forexrates-stock-and-sales-utility.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ForexratesStockAndSalesUtility>;

@Injectable()
export class ForexratesStockAndSalesUtilityService {

    private resourceUrl =  SERVER_API_URL + 'api/forexrates';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(forexrates: ForexratesStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(forexrates);
        return this.http.post<ForexratesStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(forexrates: ForexratesStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(forexrates);
        return this.http.put<ForexratesStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ForexratesStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ForexratesStockAndSalesUtility[]>> {
        const options = createRequestOption(req);
        return this.http.get<ForexratesStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ForexratesStockAndSalesUtility[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ForexratesStockAndSalesUtility = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ForexratesStockAndSalesUtility[]>): HttpResponse<ForexratesStockAndSalesUtility[]> {
        const jsonResponse: ForexratesStockAndSalesUtility[] = res.body;
        const body: ForexratesStockAndSalesUtility[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ForexratesStockAndSalesUtility.
     */
    private convertItemFromServer(forexrates: ForexratesStockAndSalesUtility): ForexratesStockAndSalesUtility {
        const copy: ForexratesStockAndSalesUtility = Object.assign({}, forexrates);
        copy.rateDate = this.dateUtils
            .convertLocalDateFromServer(forexrates.rateDate);
        return copy;
    }

    /**
     * Convert a ForexratesStockAndSalesUtility to a JSON which can be sent to the server.
     */
    private convert(forexrates: ForexratesStockAndSalesUtility): ForexratesStockAndSalesUtility {
        const copy: ForexratesStockAndSalesUtility = Object.assign({}, forexrates);
        copy.rateDate = this.dateUtils
            .convertLocalDateToServer(forexrates.rateDate);
        return copy;
    }
}
