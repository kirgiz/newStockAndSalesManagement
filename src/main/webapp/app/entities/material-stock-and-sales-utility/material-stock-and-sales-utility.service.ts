import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MaterialStockAndSalesUtility } from './material-stock-and-sales-utility.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MaterialStockAndSalesUtility>;

@Injectable()
export class MaterialStockAndSalesUtilityService {

    private resourceUrl =  SERVER_API_URL + 'api/materials';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(material: MaterialStockAndSalesUtility): Observable<EntityResponseType> {
        console.log(material.creationDate);
        const copy = this.convert(material);
        return this.http.post<MaterialStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(material: MaterialStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(material);
        return this.http.put<MaterialStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MaterialStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MaterialStockAndSalesUtility[]>> {
        const options = createRequestOption(req);
        return this.http.get<MaterialStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MaterialStockAndSalesUtility[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MaterialStockAndSalesUtility = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MaterialStockAndSalesUtility[]>): HttpResponse<MaterialStockAndSalesUtility[]> {
        const jsonResponse: MaterialStockAndSalesUtility[] = res.body;
        const body: MaterialStockAndSalesUtility[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MaterialStockAndSalesUtility.
     */
    private convertItemFromServer(material: MaterialStockAndSalesUtility): MaterialStockAndSalesUtility {
        const copy: MaterialStockAndSalesUtility = Object.assign({}, material);
        copy.creationDate = this.dateUtils
            .convertLocalDateFromServer(material.creationDate);
        return copy;
    }

    /**
     * Convert a MaterialStockAndSalesUtility to a JSON which can be sent to the server.
     */
    private convert(material: MaterialStockAndSalesUtility): MaterialStockAndSalesUtility {
        const copy: MaterialStockAndSalesUtility = Object.assign({}, material);
        copy.creationDate = this.dateUtils
            .convertLocalDateToServer(material.creationDate);
        return copy;
    }
}
