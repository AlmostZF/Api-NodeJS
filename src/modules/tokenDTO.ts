export class TokenDTO{
    token!: string;
    auth!: boolean;

    constructor(token:string, auth:boolean){
        this.token = token;
        this.auth = auth;
    }
}
export class RefreshTokenDTO{
    token!: string;
    refreshToken!: string;
    auth!: boolean;

    constructor(refreshToken:string, auth:boolean){
        this.auth = auth;
        this.refreshToken = refreshToken
    }
}
