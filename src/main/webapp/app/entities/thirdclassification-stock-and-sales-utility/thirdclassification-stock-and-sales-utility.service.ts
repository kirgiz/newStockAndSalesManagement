import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ThirdclassificationStockAndSalesUtility } from './thirdclassification-stock-and-sales-utility.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ThirdclassificationStockAndSalesUtility>;

@Injectable()
export class ThirdclassificationStockAndSalesUtilityService {

    private resourceUrl =  SERVER_API_URL + 'api/thirdclassifications';

    constructor(private http: HttpClient) { }

    create(thirdclassification: ThirdclassificationStockAndSalesUtility):
        Observable<EntityResponseType> {
        const copy = this.convert(thirdclassification);
        return this.http.post<ThirdclassificationStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(thirdclassification: ThirdclassificationStockAndSalesUtility):
        Observable<EntityResponseType> {
        const copy = this.convert(thirdclassification);
        return this.http.put<ThirdclassificationStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ThirdclassificationStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ThirdclassificationStockAndSalesUtility[]>> {
        const options = createRequestOption(req);
        return this.http.get<ThirdclassificationStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ThirdclassificationStockAndSalesUtility[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ThirdclassificationStockAndSalesUtility = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ThirdclassificationStockAndSalesUtility[]>): HttpResponse<ThirdclassificationStockAndSalesUtility[]> {
        const jsonResponse: ThirdclassificationStockAndSalesUtility[] = res.body;
        const body: ThirdclassificationStockAndSalesUtility[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ThirdclassificationStockAndSalesUtility.
     */
    private convertItemFromServer(thirdclassification: ThirdclassificationStockAndSalesUtility): ThirdclassificationStockAndSalesUtility {
        const copy: ThirdclassificationStockAndSalesUtility = Object.assign({}, thirdclassification);
        return copy;
    }

    /**
     * Convert a ThirdclassificationStockAndSalesUtility to a JSON which can be sent to the server.
     */
    private convert(thirdclassification: ThirdclassificationStockAndSalesUtility): ThirdclassificationStockAndSalesUtility {
        const copy: ThirdclassificationStockAndSalesUtility = Object.assign({}, thirdclassification);
        return copy;
    }
}
