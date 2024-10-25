

export class Result{
    message: string;
    data: any;

    constructor(message:string, data: any){
        this.message = message;
        this.data = data;
    }

    public static createResult(message: string, data?: any): Result {
        return new Result(message, data);
    }
}

