import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAddressclassificationStockAndSalesUtility } from 'app/shared/model/addressclassification-stock-and-sales-utility.model';

type EntityResponseType = HttpResponse<IAddressclassificationStockAndSalesUtility>;
type EntityArrayResponseType = HttpResponse<IAddressclassificationStockAndSalesUtility[]>;

@Injectable({ providedIn: 'root' })
export class AddressclassificationStockAndSalesUtilityService {
    public resourceUrl = SERVER_API_URL + 'api/addressclassifications';

    constructor(private http: HttpClient) {}

    create(addressclassification: IAddressclassificationStockAndSalesUtility): Observable<EntityResponseType> {
        return this.http.post<IAddressclassificationStockAndSalesUtility>(this.resourceUrl, addressclassification, { observe: 'response' });
    }

    update(addressclassification: IAddressclassificationStockAndSalesUtility): Observable<EntityResponseType> {
        return this.http.put<IAddressclassificationStockAndSalesUtility>(this.resourceUrl, addressclassification, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAddressclassificationStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAddressclassificationStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
