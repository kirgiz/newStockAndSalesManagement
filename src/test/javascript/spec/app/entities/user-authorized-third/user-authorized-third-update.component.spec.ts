/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { UserAuthorizedThirdUpdateComponent } from 'app/entities/user-authorized-third/user-authorized-third-update.component';
import { UserAuthorizedThirdService } from 'app/entities/user-authorized-third/user-authorized-third.service';
import { UserAuthorizedThird } from 'app/shared/model/user-authorized-third.model';

describe('Component Tests', () => {
    describe('UserAuthorizedThird Management Update Component', () => {
        let comp: UserAuthorizedThirdUpdateComponent;
        let fixture: ComponentFixture<UserAuthorizedThirdUpdateComponent>;
        let service: UserAuthorizedThirdService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [UserAuthorizedThirdUpdateComponent]
            })
                .overrideTemplate(UserAuthorizedThirdUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserAuthorizedThirdUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAuthorizedThirdService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserAuthorizedThird(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userAuthorizedThird = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserAuthorizedThird();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userAuthorizedThird = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
