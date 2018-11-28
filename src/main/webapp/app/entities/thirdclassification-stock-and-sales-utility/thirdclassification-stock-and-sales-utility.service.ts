import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IThirdclassificationStockAndSalesUtility } from 'app/shared/model/thirdclassification-stock-and-sales-utility.model';

type EntityResponseType = HttpResponse<IThirdclassificationStockAndSalesUtility>;
type EntityArrayResponseType = HttpResponse<IThirdclassificationStockAndSalesUtility[]>;

@Injectable({ providedIn: 'root' })
export class ThirdclassificationStockAndSalesUtilityService {
    public resourceUrl = SERVER_API_URL + 'api/thirdclassifications';

    constructor(private http: HttpClient) {}

    create(thirdclassification: IThirdclassificationStockAndSalesUtility): Observable<EntityResponseType> {
        return this.http.post<IThirdclassificationStockAndSalesUtility>(this.resourceUrl, thirdclassification, { observe: 'response' });
    }

    update(thirdclassification: IThirdclassificationStockAndSalesUtility): Observable<EntityResponseType> {
        return this.http.put<IThirdclassificationStockAndSalesUtility>(this.resourceUrl, thirdclassification, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IThirdclassificationStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IThirdclassificationStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
