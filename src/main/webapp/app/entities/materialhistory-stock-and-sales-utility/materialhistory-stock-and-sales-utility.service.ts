
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils, JhiDataUtils } from 'ng-jhipster';

import { MaterialhistoryStockAndSalesUtility } from './materialhistory-stock-and-sales-utility.model';
import { createRequestOption } from '../../shared';
import { MaterialStockAndSalesUtility } from '../material-stock-and-sales-utility/material-stock-and-sales-utility.model';
import { Subject } from 'rxjs/Subject';
import { MaterialStockAndSalesUtilityService } from '../material-stock-and-sales-utility/material-stock-and-sales-utility.service';
import { Subscription } from 'rxjs/Subscription';
import { TransferclassificationStockAndSalesUtility } from '../transferclassification-stock-and-sales-utility/transferclassification-stock-and-sales-utility.model';
import { ThirdStockAndSalesUtility } from '../third-stock-and-sales-utility/third-stock-and-sales-utility.model';

export type EntityResponseType = HttpResponse<MaterialhistoryStockAndSalesUtility>;

@Injectable()
export class MaterialhistoryStockAndSalesUtilityService {
    defaultThirdDestination: ThirdStockAndSalesUtility;
    private subsmat: Subscription;
    transTypeEvent: TransferclassificationStockAndSalesUtility;
    defaultThird: ThirdStockAndSalesUtility;

    @Output() selectedMaterial: EventEmitter<MaterialStockAndSalesUtility[]> = new EventEmitter();

    private resourceUrl =  SERVER_API_URL + 'api/materialhistories';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils, private materialService: MaterialStockAndSalesUtilityService) { }

    create(materialhistory: MaterialhistoryStockAndSalesUtility):
        Observable<EntityResponseType> {
        const copy = this.convert(materialhistory);
        console.log('haaaaaaaaaaa');
        console.log(copy);
        materialhistory.itemTransfereds.forEach( (element) => {
            this.materialService.find(element.id).subscribe(
                   (resmaterial: HttpResponse<MaterialStockAndSalesUtility>) => {
                      const material: MaterialStockAndSalesUtility = resmaterial.body;
                       material.currentLocation = materialhistory.warehousetoId;
                       const dd: { year: any; month: any; day: any } = {
                         year: materialhistory.creationDate.year,
                         month: materialhistory.creationDate.month,
                         day: materialhistory.creationDate.day
                       };
                       material.creationDate = dd;
                    this.subsmat = this.materialService.update(material).subscribe((res: HttpResponse<MaterialStockAndSalesUtility>) => {
                       });
                   }
               );
           });
        return this.http.post<MaterialhistoryStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(materialhistory: MaterialhistoryStockAndSalesUtility):
        Observable<EntityResponseType> {
        const copy = this.convert(materialhistory);
        materialhistory.itemTransfereds.forEach( (element) => {
         this.materialService.find(element.id).subscribe(
                (resmaterial: HttpResponse<MaterialStockAndSalesUtility>) => {
                   const material: MaterialStockAndSalesUtility = resmaterial.body;
                    material.currentLocation = materialhistory.warehousetoId;
                    this.materialService.update(material).subscribe((res: HttpResponse<MaterialStockAndSalesUtility>) => {
                    });
                }
            );
        });
        return this.http.put<MaterialhistoryStockAndSalesUtility>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MaterialhistoryStockAndSalesUtility>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MaterialhistoryStockAndSalesUtility[]>> {
        const options = createRequestOption(req);
        return this.http.get<MaterialhistoryStockAndSalesUtility[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MaterialhistoryStockAndSalesUtility[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MaterialhistoryStockAndSalesUtility = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MaterialhistoryStockAndSalesUtility[]>): HttpResponse<MaterialhistoryStockAndSalesUtility[]> {
        const jsonResponse: MaterialhistoryStockAndSalesUtility[] = res.body;
        const body: MaterialhistoryStockAndSalesUtility[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MaterialhistoryStockAndSalesUtility.
     */
    private convertItemFromServer(materialhistory: MaterialhistoryStockAndSalesUtility): MaterialhistoryStockAndSalesUtility {
        const copy: MaterialhistoryStockAndSalesUtility = Object.assign({}, materialhistory);
        copy.creationDate = this.dateUtils
            .convertLocalDateFromServer(materialhistory.creationDate);
        return copy;
    }

    /**
     * Convert a MaterialhistoryStockAndSalesUtility to a JSON which can be sent to the server.
     */
    private convert(materialhistory: MaterialhistoryStockAndSalesUtility): MaterialhistoryStockAndSalesUtility {
        const copy: MaterialhistoryStockAndSalesUtility = Object.assign({}, materialhistory);
        copy.creationDate = this.dateUtils
            .convertLocalDateToServer(materialhistory.creationDate);
        return copy;
    }

    selectMaterial(materials: MaterialStockAndSalesUtility[]) {
        this.selectedMaterial.emit(materials );
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

getDefaultThird(): ThirdStockAndSalesUtility{
    return this.defaultThird;
}

setDefaultDestination(third: ThirdStockAndSalesUtility) {
    this.defaultThirdDestination = third;
}

getDefaultDestination(): ThirdStockAndSalesUtility {
    return this.defaultThirdDestination ;
}
}
