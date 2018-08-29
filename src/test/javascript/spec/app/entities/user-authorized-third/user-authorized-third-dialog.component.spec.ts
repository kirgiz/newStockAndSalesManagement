/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { UserAuthorizedThirdDialogComponent } from '../../../../../../main/webapp/app/entities/user-authorized-third/user-authorized-third-dialog.component';
import { UserAuthorizedThirdService } from '../../../../../../main/webapp/app/entities/user-authorized-third/user-authorized-third.service';
import { UserAuthorizedThird } from '../../../../../../main/webapp/app/entities/user-authorized-third/user-authorized-third.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { ThirdStockAndSalesUtilityService } from '../../../../../../main/webapp/app/entities/third-stock-and-sales-utility';

describe('Component Tests', () => {

    describe('UserAuthorizedThird Management Dialog Component', () => {
        let comp: UserAuthorizedThirdDialogComponent;
        let fixture: ComponentFixture<UserAuthorizedThirdDialogComponent>;
        let service: UserAuthorizedThirdService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [UserAuthorizedThirdDialogComponent],
                providers: [
                    UserService,
                    ThirdStockAndSalesUtilityService,
                    UserAuthorizedThirdService
                ]
            })
            .overrideTemplate(UserAuthorizedThirdDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserAuthorizedThirdDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAuthorizedThirdService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserAuthorizedThird(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.userAuthorizedThird = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userAuthorizedThirdListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserAuthorizedThird();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.userAuthorizedThird = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userAuthorizedThirdListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
