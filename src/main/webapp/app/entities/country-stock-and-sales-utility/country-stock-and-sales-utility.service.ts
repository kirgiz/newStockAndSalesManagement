import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICountryStockAndSalesUtility } from 'app/shared/model/country-stock-and-sales-utility.model';

type EntityResponseType = HttpResponse<ICountryStockAndSalesUtility>;
type EntityArrayResponseType = HttpResponse<ICountryStockAndSalesUtility[]>;

@Injectable({ providedIn: 'root' })
export class CountryStockAndSalesUtilityService {
    public resourceUrl = SERVER_API_URL + 'api/countries';

    constructor(private http: HttpClient) {}

    create(country: ICountryStockAndSalesUtility): Observable<EntityResponseType> {
        return this.http.post<ICountryStockAndSalesUtility>(this.resourceUrl, country, { observe: 'response' });
    }

    update(country: ICountryStockAndSalesUtility): Observable<EntityResponseType> {
        return this.http.put<ICountryStockAndSalesUtility>(this.resourceUrl, country, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICountryStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICountryStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
