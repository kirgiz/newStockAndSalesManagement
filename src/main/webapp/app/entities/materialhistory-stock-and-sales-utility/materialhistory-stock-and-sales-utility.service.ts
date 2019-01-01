import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { JhiDateUtils, JhiDataUtils } from 'ng-jhipster';

import { MaterialhistoryStockAndSalesUtility } from './materialhistory-stock-and-sales-utility.model';
import { createRequestOption } from '../../shared';
import { MaterialStockAndSalesUtility, IMaterialStockAndSalesUtility } from '../../shared/model/material-stock-and-sales-utility.model';
import { Subject } from 'rxjs';
import { MaterialStockAndSalesUtilityService } from '../material-stock-and-sales-utility/material-stock-and-sales-utility.service';
import { Subscription } from 'rxjs';
import { TransferclassificationStockAndSalesUtility } from '../../shared/model/transferclassification-stock-and-sales-utility.model';
import { ThirdStockAndSalesUtility } from '../../shared/model/third-stock-and-sales-utility.model';
import { SERVER_API_URL } from 'app/app.constants';
// import { createRequestOption } from 'app/shared';
import { IMaterialhistoryStockAndSalesUtility } from 'app/shared/model/materialhistory-stock-and-sales-utility.model';

type EntityResponseType = HttpResponse<IMaterialhistoryStockAndSalesUtility>;
type EntityArrayResponseType = HttpResponse<IMaterialhistoryStockAndSalesUtility[]>;

@Injectable({ providedIn: 'root' })
export class MaterialhistoryStockAndSalesUtilityService {
    defaultThirdDestination: ThirdStockAndSalesUtility;
    private subsmat: Subscription;
    transTypeEvent: TransferclassificationStockAndSalesUtility;
    defaultThird: ThirdStockAndSalesUtility;

    @Output()
    selectedMaterial: EventEmitter<MaterialStockAndSalesUtility[]> = new EventEmitter();

    private resourceUrl = SERVER_API_URL + 'api/materialhistories';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils, private materialService: MaterialStockAndSalesUtilityService) {}

    create(materialhistory: IMaterialhistoryStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(materialhistory);
        console.log('haaaaaaaaaaa');
        console.log(copy);
        materialhistory.itemTransfereds.forEach(element => {
            this.materialService.find(element.id).subscribe((resmaterial: HttpResponse<IMaterialStockAndSalesUtility>) => {
                const material: IMaterialStockAndSalesUtility = resmaterial.body;
                material.currentLocation = materialhistory.warehousetoId;
                this.subsmat = this.materialService.update(material).subscribe((res: HttpResponse<IMaterialStockAndSalesUtility>) => {});
            });
        });
        return this.http.post<IMaterialhistoryStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' });
    }

    update(materialhistory: IMaterialhistoryStockAndSalesUtility): Observable<EntityResponseType> {
        // const copy = this.convert(materialhistory);
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        // console.log(copy);
        materialhistory.itemTransfereds.forEach(element => {
            this.materialService.find(element.id).subscribe((resmaterial: HttpResponse<IMaterialStockAndSalesUtility>) => {
                const material: IMaterialStockAndSalesUtility = resmaterial.body;
                material.currentLocation = materialhistory.warehousetoId;
                this.materialService.update(material).subscribe((res: HttpResponse<IMaterialStockAndSalesUtility>) => {});
            });
        });
        // return this.http.put<IMaterialhistoryStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' });
        //    .map((res: EntityResponseType) => this.convertResponse(res));
        const copy = this.convertDateFromClient(materialhistory);
        return this.http
            .put<IMaterialhistoryStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }
    //  public resourceUrl = SERVER_API_URL + 'api/materialhistories';

    // constructor(private http: HttpClient) {}

    /*   create(materialhistory: IMaterialhistoryStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(materialhistory);
        return this.http
            .post<IMaterialhistoryStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(materialhistory: IMaterialhistoryStockAndSalesUtility): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(materialhistory);
        return this.http
            .put<IMaterialhistoryStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }*/

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMaterialhistoryStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMaterialhistoryStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(materialhistory: IMaterialhistoryStockAndSalesUtility): IMaterialhistoryStockAndSalesUtility {
        const copy: IMaterialhistoryStockAndSalesUtility = Object.assign({}, materialhistory, {
            creationDate:
                materialhistory.creationDate != null && materialhistory.creationDate.isValid()
                    ? materialhistory.creationDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((materialhistory: IMaterialhistoryStockAndSalesUtility) => {
                materialhistory.creationDate = materialhistory.creationDate != null ? moment(materialhistory.creationDate) : null;
            });
        }
        return res;
    }

    private convert(materialhistory: MaterialhistoryStockAndSalesUtility): MaterialhistoryStockAndSalesUtility {
        const copy: MaterialhistoryStockAndSalesUtility = Object.assign({}, materialhistory);
        copy.creationDate = this.dateUtils.convertLocalDateToServer(materialhistory.creationDate);
        return copy;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MaterialhistoryStockAndSalesUtility = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to MaterialhistoryStockAndSalesUtility.
     */
    private convertItemFromServer(materialhistory: MaterialhistoryStockAndSalesUtility): MaterialhistoryStockAndSalesUtility {
        const copy: MaterialhistoryStockAndSalesUtility = Object.assign({}, materialhistory);
        copy.creationDate = this.dateUtils.convertLocalDateFromServer(materialhistory.creationDate);
        return copy;
    }

    selectMaterial(materials: MaterialStockAndSalesUtility[]) {
        this.selectedMaterial.emit(materials);
    }

    emitTransTypeEvent(transType: TransferclassificationStockAndSalesUtility) {
        this.transTypeEvent = transType;
    }
    getTransTypeEvent(): TransferclassificationStockAndSalesUtility {
        return this.transTypeEvent;
    }

    setDefaultThird(third: ThirdStockAndSalesUtility) {
        this.defaultThird = third;
    }

    getDefaultThird(): ThirdStockAndSalesUtility {
        return this.defaultThird;
    }

    setDefaultDestination(third: ThirdStockAndSalesUtility) {
        this.defaultThirdDestination = third;
    }

    getDefaultDestination(): ThirdStockAndSalesUtility {
        return this.defaultThirdDestination;
    }
}
