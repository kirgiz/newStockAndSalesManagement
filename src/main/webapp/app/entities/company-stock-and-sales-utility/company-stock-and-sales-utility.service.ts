import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CompanyStockAndSalesUtility } from './company-stock-and-sales-utility.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CompanyStockAndSalesUtility>;

@Injectable()
export class CompanyStockAndSalesUtilityService {

    private resourceUrl =  SERVER_API_URL + 'api/companies';

    constructor(private http: HttpClient) { }

    create(company: CompanyStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(company);
        return this.http.post<CompanyStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(company: CompanyStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(company);
        return this.http.put<CompanyStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CompanyStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CompanyStockAndSalesUtility[]>> {
        const options = createRequestOption(req);
        return this.http.get<CompanyStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CompanyStockAndSalesUtility[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CompanyStockAndSalesUtility = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CompanyStockAndSalesUtility[]>): HttpResponse<CompanyStockAndSalesUtility[]> {
        const jsonResponse: CompanyStockAndSalesUtility[] = res.body;
        const body: CompanyStockAndSalesUtility[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CompanyStockAndSalesUtility.
     */
    private convertItemFromServer(company: CompanyStockAndSalesUtility): CompanyStockAndSalesUtility {
        const copy: CompanyStockAndSalesUtility = Object.assign({}, company);
        return copy;
    }

    /**
     * Convert a CompanyStockAndSalesUtility to a JSON which can be sent to the server.
     */
    private convert(company: CompanyStockAndSalesUtility): CompanyStockAndSalesUtility {
        const copy: CompanyStockAndSalesUtility = Object.assign({}, company);
        return copy;
    }
}
