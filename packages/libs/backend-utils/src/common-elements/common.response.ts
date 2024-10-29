export class GlobalResponseObject {
    status: boolean;
    errorCode: number;
    internalMessage: string;
    data?: any[]; 

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: any[]) {
        this.status = status;
        this.errorCode = errorCode;
        this.internalMessage = internalMessage;
        this.data = data || []; 
    }

    static createResponse(status: boolean, errorCode: number, internalMessage: string, data?: any[]): GlobalResponseObject {
        return new GlobalResponseObject(status, errorCode, internalMessage, data);
    }
}
