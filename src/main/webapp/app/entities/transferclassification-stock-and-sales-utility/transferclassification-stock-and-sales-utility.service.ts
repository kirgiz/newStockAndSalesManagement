import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransferclassificationStockAndSalesUtility } from 'app/shared/model/transferclassification-stock-and-sales-utility.model';

type EntityResponseType = HttpResponse<ITransferclassificationStockAndSalesUtility>;
type EntityArrayResponseType = HttpResponse<ITransferclassificationStockAndSalesUtility[]>;

@Injectable({ providedIn: 'root' })
export class TransferclassificationStockAndSalesUtilityService {
    public resourceUrl = SERVER_API_URL + 'api/transferclassifications';

    constructor(private http: HttpClient) {}

    create(transferclassification: ITransferclassificationStockAndSalesUtility): Observable<EntityResponseType> {
        return this.http.post<ITransferclassificationStockAndSalesUtility>(this.resourceUrl, transferclassification, {
            observe: 'response'
        });
    }

    update(transferclassification: ITransferclassificationStockAndSalesUtility): Observable<EntityResponseType> {
        return this.http.put<ITransferclassificationStockAndSalesUtility>(this.resourceUrl, transferclassification, {
            observe: 'response'
        });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITransferclassificationStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITransferclassificationStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
