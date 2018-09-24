import { BaseEntity } from './../../shared';

export class UserAuthorizedThird implements BaseEntity {
    constructor(
        public id?: number,
        public defaultThird?: boolean,
        public defaultDestination?: boolean,
        public userAuthId?: number,
        public thirdAuthId?: number,
    ) {
        this.defaultThird = false;
        this.defaultDestination = false;
    }
}
