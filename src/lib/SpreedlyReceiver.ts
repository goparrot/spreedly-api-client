import { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { SpreedlyApiConfig } from '../config';
import { ISpreedlyConfiguration, ISpreedlyReceiverReq, ISpreedlyReceiverResponse } from '../interface';
import { SpreedlyReceiverResModel } from '../model';

export class SpreedlyReceiver extends SpreedlyApiConfig {
    constructor(config: ISpreedlyConfiguration) {
        super(config);
    }

    async create(payload: ISpreedlyReceiverReq): Promise<SpreedlyReceiverResModel> {
        const response: AxiosResponse<ISpreedlyReceiverResponse> = await this.client.post<ISpreedlyReceiverResponse>('/receivers', payload);

        return plainToClass(SpreedlyReceiverResModel, response.data);
    }

    async show(receiverToken: string): Promise<SpreedlyReceiverResModel> {
        const response: AxiosResponse<ISpreedlyReceiverResponse> = await this.client.get<ISpreedlyReceiverResponse>(`/receivers/${receiverToken}`);

        return plainToClass(SpreedlyReceiverResModel, response.data);
    }
}
