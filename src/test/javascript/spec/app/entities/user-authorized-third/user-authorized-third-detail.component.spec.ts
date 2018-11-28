/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { UserAuthorizedThirdDetailComponent } from 'app/entities/user-authorized-third/user-authorized-third-detail.component';
import { UserAuthorizedThird } from 'app/shared/model/user-authorized-third.model';

describe('Component Tests', () => {
    describe('UserAuthorizedThird Management Detail Component', () => {
        let comp: UserAuthorizedThirdDetailComponent;
        let fixture: ComponentFixture<UserAuthorizedThirdDetailComponent>;
        const route = ({ data: of({ userAuthorizedThird: new UserAuthorizedThird(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [UserAuthorizedThirdDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UserAuthorizedThirdDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserAuthorizedThirdDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.userAuthorizedThird).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
