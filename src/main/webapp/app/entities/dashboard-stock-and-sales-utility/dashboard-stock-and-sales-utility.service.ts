import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDashboardStockAndSalesUtility } from 'app/shared/model/dashboard-stock-and-sales-utility.model';

import { DashboardStockAndSalesUtility } from '../../shared/model/dashboard-stock-and-sales-utility.model';
// import { createRequestOption } from '../../shared';
import { MaterialhistoryStockAndSalesUtilityService } from '../materialhistory-stock-and-sales-utility';
import { LotStockAndSalesUtilityService } from '../lot-stock-and-sales-utility';
import { ForexratesStockAndSalesUtilityService } from '../forexrates-stock-and-sales-utility';
import { ThirdStockAndSalesUtilityService } from '../third-stock-and-sales-utility';
import { MaterialStockAndSalesUtilityService } from '../material-stock-and-sales-utility';
import { CompanyStockAndSalesUtilityService } from '../company-stock-and-sales-utility';
import { JhiDateUtils } from 'ng-jhipster';
type EntityResponseType = HttpResponse<IDashboardStockAndSalesUtility>;
type EntityArrayResponseType = HttpResponse<IDashboardStockAndSalesUtility[]>;

@Injectable({ providedIn: 'root' })
export class DashboardStockAndSalesUtilityService {
    public resourceUrl = SERVER_API_URL + 'api/dashboards';

    constructor(
        private http: HttpClient,
        private dateUtils: JhiDateUtils,
        private matHistoryService: MaterialhistoryStockAndSalesUtilityService,
        private lotService: LotStockAndSalesUtilityService,
        private fxRatesService: ForexratesStockAndSalesUtilityService,
        private thirdService: ThirdStockAndSalesUtilityService,
        private materialService: MaterialStockAndSalesUtilityService,
        private companyService: CompanyStockAndSalesUtilityService
    ) {}

    create(dashboard: IDashboardStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(dashboard);
        return this.http.post<IDashboardStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' });
        //   .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(dashboard: IDashboardStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(dashboard);
        return this.http.put<IDashboardStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' });
        //  .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDashboardStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDashboardStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(dashboard: IDashboardStockAndSalesUtility): IDashboardStockAndSalesUtility {
        const copy: IDashboardStockAndSalesUtility = Object.assign({}, dashboard, {
            transferDate:
                dashboard.transferDate != null && dashboard.transferDate.isValid() ? dashboard.transferDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.transferDate = res.body.transferDate != null ? moment(res.body.transferDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((dashboard: IDashboardStockAndSalesUtility) => {
                dashboard.transferDate = dashboard.transferDate != null ? moment(dashboard.transferDate) : null;
            });
        }
        return res;
    }
}
