/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { UserAuthorizedThirdComponent } from '../../../../../../main/webapp/app/entities/user-authorized-third/user-authorized-third.component';
import { UserAuthorizedThirdService } from '../../../../../../main/webapp/app/entities/user-authorized-third/user-authorized-third.service';
import { UserAuthorizedThird } from '../../../../../../main/webapp/app/entities/user-authorized-third/user-authorized-third.model';

describe('Component Tests', () => {

    describe('UserAuthorizedThird Management Component', () => {
        let comp: UserAuthorizedThirdComponent;
        let fixture: ComponentFixture<UserAuthorizedThirdComponent>;
        let service: UserAuthorizedThirdService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [UserAuthorizedThirdComponent],
                providers: [
                    UserAuthorizedThirdService
                ]
            })
            .overrideTemplate(UserAuthorizedThirdComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserAuthorizedThirdComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAuthorizedThirdService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UserAuthorizedThird(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userAuthorizedThirds[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
