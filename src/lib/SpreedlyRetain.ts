import { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { SpreedlyApiConfig } from '../config';
import { ISpreedlyConfiguration, ISpreedlyRetainRes } from '../interface';
import { SpreedlyRetainModel } from '../model';

export class SpreedlyRetain extends SpreedlyApiConfig {
    constructor(config: ISpreedlyConfiguration) {
        super(config);
    }

    async retain(paymentMethodToken: string): Promise<SpreedlyRetainModel> {
        const response: AxiosResponse<ISpreedlyRetainRes> = await this.client.put<ISpreedlyRetainRes>(`/payment_methods/${paymentMethodToken}/retain`);

        return plainToClass(SpreedlyRetainModel, response.data);
    }
}
