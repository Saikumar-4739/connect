import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosInstance } from '../axios-instance'; // Adjust path as needed
import { configVariables } from '../config'; // Adjust path as needed

export class DMSCommonAxiosService {
    URL = configVariables.APP_MAS_SERVICE_URL;

    axiosPostCall = async (urlEndPoint: string, data?: any, config?: AxiosRequestConfig): Promise<any> => {
        return await AxiosInstance.post(this.URL + urlEndPoint, data, config)
            .then((response: AxiosResponse) => {
                if (response && (response.status >= 200 && response.status < 300)) {
                    return response.data;
                } else {
                    throw response;
                }
            }).catch((err: any) => {
                throw new Error(err.message);
            });
    }
}
