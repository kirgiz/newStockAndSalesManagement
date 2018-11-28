import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMaterialclassificationStockAndSalesUtility } from 'app/shared/model/materialclassification-stock-and-sales-utility.model';

type EntityResponseType = HttpResponse<IMaterialclassificationStockAndSalesUtility>;
type EntityArrayResponseType = HttpResponse<IMaterialclassificationStockAndSalesUtility[]>;

@Injectable({ providedIn: 'root' })
export class MaterialclassificationStockAndSalesUtilityService {
    public resourceUrl = SERVER_API_URL + 'api/materialclassifications';

    constructor(private http: HttpClient) {}

    create(materialclassification: IMaterialclassificationStockAndSalesUtility): Observable<EntityResponseType> {
        return this.http.post<IMaterialclassificationStockAndSalesUtility>(this.resourceUrl, materialclassification, {
            observe: 'response'
        });
    }

    update(materialclassification: IMaterialclassificationStockAndSalesUtility): Observable<EntityResponseType> {
        return this.http.put<IMaterialclassificationStockAndSalesUtility>(this.resourceUrl, materialclassification, {
            observe: 'response'
        });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMaterialclassificationStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMaterialclassificationStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
