import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompanyStockAndSalesUtility } from 'app/shared/model/company-stock-and-sales-utility.model';

type EntityResponseType = HttpResponse<ICompanyStockAndSalesUtility>;
type EntityArrayResponseType = HttpResponse<ICompanyStockAndSalesUtility[]>;

@Injectable({ providedIn: 'root' })
export class CompanyStockAndSalesUtilityService {
    public resourceUrl = SERVER_API_URL + 'api/companies';

    constructor(private http: HttpClient) {}

    create(company: ICompanyStockAndSalesUtility): Observable<EntityResponseType> {
        return this.http.post<ICompanyStockAndSalesUtility>(this.resourceUrl, company, { observe: 'response' });
    }

    update(company: ICompanyStockAndSalesUtility): Observable<EntityResponseType> {
        return this.http.put<ICompanyStockAndSalesUtility>(this.resourceUrl, company, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICompanyStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICompanyStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
