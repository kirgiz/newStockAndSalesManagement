/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { UserAuthorizedThirdDetailComponent } from '../../../../../../main/webapp/app/entities/user-authorized-third/user-authorized-third-detail.component';
import { UserAuthorizedThirdService } from '../../../../../../main/webapp/app/entities/user-authorized-third/user-authorized-third.service';
import { UserAuthorizedThird } from '../../../../../../main/webapp/app/entities/user-authorized-third/user-authorized-third.model';

describe('Component Tests', () => {

    describe('UserAuthorizedThird Management Detail Component', () => {
        let comp: UserAuthorizedThirdDetailComponent;
        let fixture: ComponentFixture<UserAuthorizedThirdDetailComponent>;
        let service: UserAuthorizedThirdService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [UserAuthorizedThirdDetailComponent],
                providers: [
                    UserAuthorizedThirdService
                ]
            })
            .overrideTemplate(UserAuthorizedThirdDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserAuthorizedThirdDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAuthorizedThirdService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UserAuthorizedThird(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.userAuthorizedThird).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
