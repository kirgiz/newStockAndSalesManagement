import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DashboardStockAndSalesUtility } from './dashboard-stock-and-sales-utility.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DashboardStockAndSalesUtility>;

@Injectable()
export class DashboardStockAndSalesUtilityService {

    private resourceUrl =  SERVER_API_URL + 'api/dashboards';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(dashboard: DashboardStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(dashboard);
        return this.http.post<DashboardStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(dashboard: DashboardStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convert(dashboard);
        return this.http.put<DashboardStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DashboardStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DashboardStockAndSalesUtility[]>> {
        const options = createRequestOption(req);
        return this.http.get<DashboardStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DashboardStockAndSalesUtility[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DashboardStockAndSalesUtility = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DashboardStockAndSalesUtility[]>): HttpResponse<DashboardStockAndSalesUtility[]> {
        const jsonResponse: DashboardStockAndSalesUtility[] = res.body;
        const body: DashboardStockAndSalesUtility[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DashboardStockAndSalesUtility.
     */
    private convertItemFromServer(dashboard: DashboardStockAndSalesUtility): DashboardStockAndSalesUtility {
        const copy: DashboardStockAndSalesUtility = Object.assign({}, dashboard);
        copy.transferDate = this.dateUtils
            .convertLocalDateFromServer(dashboard.transferDate);
        return copy;
    }

    /**
     * Convert a DashboardStockAndSalesUtility to a JSON which can be sent to the server.
     */
    private convert(dashboard: DashboardStockAndSalesUtility): DashboardStockAndSalesUtility {
        const copy: DashboardStockAndSalesUtility = Object.assign({}, dashboard);
        copy.transferDate = this.dateUtils
            .convertLocalDateToServer(dashboard.transferDate);
        return copy;
    }
}
