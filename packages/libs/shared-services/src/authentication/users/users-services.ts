import { AxiosRequestConfig } from "axios";
import { CreateUser, GlobalResponseObject } from "../../../../shared-models/src";
import { DMSCommonAxiosService } from "../common-axios";



export class AuthUserService extends DMSCommonAxiosService {

  private getURLwithMainEndPoint(childUrl: string) {
    return '/users/' + childUrl;
}

async createUser(reqModel: CreateUser, config?: AxiosRequestConfig): Promise<GlobalResponseObject> {
  return await this.axiosPostCall(this.getURLwithMainEndPoint('register'), reqModel, config);
}

async getUserByEmailid(email: string, config?: AxiosRequestConfig): Promise<GlobalResponseObject> {
  const reqModel = {}; 
  return await this.axiosPostCall(this.getURLwithMainEndPoint(`user/${email}`), reqModel, config);
}


}