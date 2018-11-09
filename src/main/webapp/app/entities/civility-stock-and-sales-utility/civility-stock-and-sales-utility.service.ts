import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICivilityStockAndSalesUtility } from 'app/shared/model/civility-stock-and-sales-utility.model';

type EntityResponseType = HttpResponse<ICivilityStockAndSalesUtility>;
type EntityArrayResponseType = HttpResponse<ICivilityStockAndSalesUtility[]>;

@Injectable({ providedIn: 'root' })
export class CivilityStockAndSalesUtilityService {
    public resourceUrl = SERVER_API_URL + 'api/civilities';

    constructor(private http: HttpClient) {}

    create(civility: ICivilityStockAndSalesUtility): Observable<EntityResponseType> {
        return this.http.post<ICivilityStockAndSalesUtility>(this.resourceUrl, civility, { observe: 'response' });
    }

    update(civility: ICivilityStockAndSalesUtility): Observable<EntityResponseType> {
        return this.http.put<ICivilityStockAndSalesUtility>(this.resourceUrl, civility, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICivilityStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICivilityStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
