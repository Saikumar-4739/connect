import { AxiosRequestConfig } from "axios";
import { GlobalResponseObject, ValidateUserReq } from "../../../../shared-models/src";
import { DMSCommonAxiosService } from "../common-axios";



export class AuthenticationService extends DMSCommonAxiosService {
    
    private getURLwithMainEndPoint(childUrl: string) {
        return '/auth/' + childUrl;
    }

    async login(reqModel: ValidateUserReq, config?: AxiosRequestConfig): Promise<GlobalResponseObject> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('login'), reqModel, config);
      }
    
    async logout(token: string, config?: AxiosRequestConfig): Promise<GlobalResponseObject> {
        return await this.axiosPostCall(this.getURLwithMainEndPoint('logout'), { token }, config);
    }
    
}