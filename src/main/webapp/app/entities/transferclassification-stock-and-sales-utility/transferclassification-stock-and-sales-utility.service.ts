import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TransferclassificationStockAndSalesUtility } from './transferclassification-stock-and-sales-utility.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TransferclassificationStockAndSalesUtility>;

@Injectable()
export class TransferclassificationStockAndSalesUtilityService {

    private resourceUrl =  SERVER_API_URL + 'api/transferclassifications';

    constructor(private http: HttpClient) { }

    create(transferclassification: TransferclassificationStockAndSalesUtility):
        Observable<EntityResponseType> {
        const copy = this.convert(transferclassification);
        return this.http.post<TransferclassificationStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(transferclassification: TransferclassificationStockAndSalesUtility):
        Observable<EntityResponseType> {
        const copy = this.convert(transferclassification);
        return this.http.put<TransferclassificationStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TransferclassificationStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TransferclassificationStockAndSalesUtility[]>> {
        const options = createRequestOption(req);
        return this.http.get<TransferclassificationStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TransferclassificationStockAndSalesUtility[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TransferclassificationStockAndSalesUtility = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TransferclassificationStockAndSalesUtility[]>): HttpResponse<TransferclassificationStockAndSalesUtility[]> {
        const jsonResponse: TransferclassificationStockAndSalesUtility[] = res.body;
        const body: TransferclassificationStockAndSalesUtility[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TransferclassificationStockAndSalesUtility.
     */
    private convertItemFromServer(transferclassification: TransferclassificationStockAndSalesUtility): TransferclassificationStockAndSalesUtility {
        const copy: TransferclassificationStockAndSalesUtility = Object.assign({}, transferclassification);
        return copy;
    }

    /**
     * Convert a TransferclassificationStockAndSalesUtility to a JSON which can be sent to the server.
     */
    private convert(transferclassification: TransferclassificationStockAndSalesUtility): TransferclassificationStockAndSalesUtility {
        const copy: TransferclassificationStockAndSalesUtility = Object.assign({}, transferclassification);
        return copy;
    }
}
