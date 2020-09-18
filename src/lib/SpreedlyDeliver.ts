import { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { SpreedlyApiConfig } from '../config';
import { ISpreedlyConfiguration, ISpreedlyDeliverReq, ISpreedlyDeliverRes } from '../interface';
import { SpreedlyDeliverModel } from '../model/SpreedlyDeliverModel';

export class SpreedlyDeliver extends SpreedlyApiConfig {
    constructor(config: ISpreedlyConfiguration) {
        super(config);
    }

    async create(receiverToken: string, payload: ISpreedlyDeliverReq): Promise<SpreedlyDeliverModel> {
        const response: AxiosResponse<ISpreedlyDeliverRes> = await this.client.post<ISpreedlyDeliverRes>(`/receivers/${receiverToken}/deliver`, payload);

        return plainToClass(SpreedlyDeliverModel, response.data);
    }
}
