export class CartCreateDTO{
    name: string;
    email: string;
    userID: number | null = null;

    constructor(name: string, email: string){
        this.name = name;
        this.email = email;
    }

    setUserId(userID: number | null ){
        this.userID = userID
    }
}