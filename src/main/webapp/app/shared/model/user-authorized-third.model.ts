export interface IUserAuthorizedThird {
    id?: number;
    defaultThird?: boolean;
    defaultDestination?: boolean;
    userAuthLogin?: string;
    userAuthId?: number;
    thirdAuthName?: string;
    thirdAuthId?: number;
}

export class UserAuthorizedThird implements IUserAuthorizedThird {
    constructor(
        public id?: number,
        public defaultThird?: boolean,
        public defaultDestination?: boolean,
        public userAuthLogin?: string,
        public userAuthId?: number,
        public thirdAuthName?: string,
        public thirdAuthId?: number
    ) {
        this.defaultThird = this.defaultThird || false;
        this.defaultDestination = this.defaultDestination || false;
    }
}
