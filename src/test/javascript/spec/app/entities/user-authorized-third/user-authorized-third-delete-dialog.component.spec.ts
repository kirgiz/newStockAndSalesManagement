/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StockAndSalesManagementTestModule } from '../../../test.module';
import { UserAuthorizedThirdDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/user-authorized-third/user-authorized-third-delete-dialog.component';
import { UserAuthorizedThirdService } from '../../../../../../main/webapp/app/entities/user-authorized-third/user-authorized-third.service';

describe('Component Tests', () => {

    describe('UserAuthorizedThird Management Delete Component', () => {
        let comp: UserAuthorizedThirdDeleteDialogComponent;
        let fixture: ComponentFixture<UserAuthorizedThirdDeleteDialogComponent>;
        let service: UserAuthorizedThirdService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockAndSalesManagementTestModule],
                declarations: [UserAuthorizedThirdDeleteDialogComponent],
                providers: [
                    UserAuthorizedThirdService
                ]
            })
            .overrideTemplate(UserAuthorizedThirdDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserAuthorizedThirdDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAuthorizedThirdService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
