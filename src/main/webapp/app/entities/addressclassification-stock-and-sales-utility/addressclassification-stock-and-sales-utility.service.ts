import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AddressclassificationStockAndSalesUtility } from './addressclassification-stock-and-sales-utility.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AddressclassificationStockAndSalesUtility>;

@Injectable()
export class AddressclassificationStockAndSalesUtilityService {

    private resourceUrl =  SERVER_API_URL + 'api/addressclassifications';

    constructor(private http: HttpClient) { }

    create(addressclassification: AddressclassificationStockAndSalesUtility):
        Observable<EntityResponseType> {
        const copy = this.convert(addressclassification);
        return this.http.post<AddressclassificationStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(addressclassification: AddressclassificationStockAndSalesUtility):
        Observable<EntityResponseType> {
        const copy = this.convert(addressclassification);
        return this.http.put<AddressclassificationStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AddressclassificationStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AddressclassificationStockAndSalesUtility[]>> {
        const options = createRequestOption(req);
        return this.http.get<AddressclassificationStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AddressclassificationStockAndSalesUtility[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AddressclassificationStockAndSalesUtility = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AddressclassificationStockAndSalesUtility[]>): HttpResponse<AddressclassificationStockAndSalesUtility[]> {
        const jsonResponse: AddressclassificationStockAndSalesUtility[] = res.body;
        const body: AddressclassificationStockAndSalesUtility[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AddressclassificationStockAndSalesUtility.
     */
    private convertItemFromServer(addressclassification: AddressclassificationStockAndSalesUtility): AddressclassificationStockAndSalesUtility {
        const copy: AddressclassificationStockAndSalesUtility = Object.assign({}, addressclassification);
        return copy;
    }

    /**
     * Convert a AddressclassificationStockAndSalesUtility to a JSON which can be sent to the server.
     */
    private convert(addressclassification: AddressclassificationStockAndSalesUtility): AddressclassificationStockAndSalesUtility {
        const copy: AddressclassificationStockAndSalesUtility = Object.assign({}, addressclassification);
        return copy;
    }
}
