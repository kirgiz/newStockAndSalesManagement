import { BaseEntity } from './../../shared';

export class UserAuthorizedThird implements BaseEntity {
    constructor(
        public id?: number,
        public userAuthId?: number,
        public thirdAuthId?: number,
    ) {
    }
}
