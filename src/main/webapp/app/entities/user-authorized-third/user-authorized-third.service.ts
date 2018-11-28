import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserAuthorizedThird } from 'app/shared/model/user-authorized-third.model';

type EntityResponseType = HttpResponse<IUserAuthorizedThird>;
type EntityArrayResponseType = HttpResponse<IUserAuthorizedThird[]>;

@Injectable({ providedIn: 'root' })
export class UserAuthorizedThirdService {
    public resourceUrl = SERVER_API_URL + 'api/user-authorized-thirds';

    constructor(private http: HttpClient) {}

    create(userAuthorizedThird: IUserAuthorizedThird): Observable<EntityResponseType> {
        return this.http.post<IUserAuthorizedThird>(this.resourceUrl, userAuthorizedThird, { observe: 'response' });
    }

    update(userAuthorizedThird: IUserAuthorizedThird): Observable<EntityResponseType> {
        return this.http.put<IUserAuthorizedThird>(this.resourceUrl, userAuthorizedThird, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUserAuthorizedThird>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUserAuthorizedThird[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
