import { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { SpreedlyApiConfig } from '../config';
import { ISpreedlyConfiguration, ISpreedlyGatewayReq, ISpreedlyGatewayRes } from '../interface';
import { SpreedlyGatewayResModel } from '../model';

export class SpreedlyGateway extends SpreedlyApiConfig {
    constructor(config: ISpreedlyConfiguration) {
        super(config);
    }

    async create(payload: ISpreedlyGatewayReq): Promise<SpreedlyGatewayResModel> {
        const response: AxiosResponse<ISpreedlyGatewayRes> = await this.client.post<ISpreedlyGatewayRes>('/gateways', payload);

        return plainToClass(SpreedlyGatewayResModel, response.data);
    }

    async show(gatewayToken: string): Promise<SpreedlyGatewayResModel> {
        const response: AxiosResponse<ISpreedlyGatewayRes> = await this.client.get<ISpreedlyGatewayRes>(`/gateways/${gatewayToken}`);

        return plainToClass(SpreedlyGatewayResModel, response.data);
    }
}
