import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UserAuthorizedThird } from './user-authorized-third.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserAuthorizedThird>;

@Injectable()
export class UserAuthorizedThirdService {

    private resourceUrl =  SERVER_API_URL + 'api/user-authorized-thirds';

    constructor(private http: HttpClient) { }

    create(userAuthorizedThird: UserAuthorizedThird): Observable<EntityResponseType> {
        const copy = this.convert(userAuthorizedThird);
        return this.http.post<UserAuthorizedThird>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userAuthorizedThird: UserAuthorizedThird): Observable<EntityResponseType> {
        const copy = this.convert(userAuthorizedThird);
        return this.http.put<UserAuthorizedThird>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserAuthorizedThird>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserAuthorizedThird[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserAuthorizedThird[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserAuthorizedThird[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserAuthorizedThird = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserAuthorizedThird[]>): HttpResponse<UserAuthorizedThird[]> {
        const jsonResponse: UserAuthorizedThird[] = res.body;
        const body: UserAuthorizedThird[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserAuthorizedThird.
     */
    private convertItemFromServer(userAuthorizedThird: UserAuthorizedThird): UserAuthorizedThird {
        const copy: UserAuthorizedThird = Object.assign({}, userAuthorizedThird);
        return copy;
    }

    /**
     * Convert a UserAuthorizedThird to a JSON which can be sent to the server.
     */
    private convert(userAuthorizedThird: UserAuthorizedThird): UserAuthorizedThird {
        const copy: UserAuthorizedThird = Object.assign({}, userAuthorizedThird);
        return copy;
    }
}
