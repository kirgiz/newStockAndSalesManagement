import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MaterialclassificationStockAndSalesUtility } from './materialclassification-stock-and-sales-utility.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MaterialclassificationStockAndSalesUtility>;

@Injectable()
export class MaterialclassificationStockAndSalesUtilityService {

    private resourceUrl =  SERVER_API_URL + 'api/materialclassifications';

    constructor(private http: HttpClient) { }

    create(materialclassification: MaterialclassificationStockAndSalesUtility):
        Observable<EntityResponseType> {
        const copy = this.convert(materialclassification);
        return this.http.post<MaterialclassificationStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(materialclassification: MaterialclassificationStockAndSalesUtility):
        Observable<EntityResponseType> {
        const copy = this.convert(materialclassification);
        return this.http.put<MaterialclassificationStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MaterialclassificationStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MaterialclassificationStockAndSalesUtility[]>> {
        const options = createRequestOption(req);
        return this.http.get<MaterialclassificationStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MaterialclassificationStockAndSalesUtility[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MaterialclassificationStockAndSalesUtility = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MaterialclassificationStockAndSalesUtility[]>): HttpResponse<MaterialclassificationStockAndSalesUtility[]> {
        const jsonResponse: MaterialclassificationStockAndSalesUtility[] = res.body;
        const body: MaterialclassificationStockAndSalesUtility[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MaterialclassificationStockAndSalesUtility.
     */
    private convertItemFromServer(materialclassification: MaterialclassificationStockAndSalesUtility): MaterialclassificationStockAndSalesUtility {
        const copy: MaterialclassificationStockAndSalesUtility = Object.assign({}, materialclassification);
        return copy;
    }

    /**
     * Convert a MaterialclassificationStockAndSalesUtility to a JSON which can be sent to the server.
     */
    private convert(materialclassification: MaterialclassificationStockAndSalesUtility): MaterialclassificationStockAndSalesUtility {
        const copy: MaterialclassificationStockAndSalesUtility = Object.assign({}, materialclassification);
        return copy;
    }
}
