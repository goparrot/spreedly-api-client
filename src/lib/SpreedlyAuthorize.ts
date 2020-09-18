import { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { SpreedlyApiConfig } from '../config';
import { ISpreedlyAuthTokenizedPaymentMethodReq, ISpreedlyConfiguration, ISpreedlyTransactionRes } from '../interface';
import { SpreedlyTransactionResModel } from '../model';

export class SpreedlyAuthorize extends SpreedlyApiConfig {
    constructor(config: ISpreedlyConfiguration) {
        super(config);
    }

    async create(gatewayToken: string, payload: ISpreedlyAuthTokenizedPaymentMethodReq): Promise<SpreedlyTransactionResModel> {
        const response: AxiosResponse<ISpreedlyTransactionRes> = await this.client.post<ISpreedlyTransactionRes>(
            `/gateways/${gatewayToken}/authorize`,
            payload,
        );

        return plainToClass(SpreedlyTransactionResModel, response.data);
    }
}
