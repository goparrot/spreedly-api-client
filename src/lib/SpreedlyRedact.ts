import { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { SpreedlyApiConfig } from '../config';
import { ISpreedlyConfiguration } from '../interface';
import { ISpreedlyRedactRes } from '../interface/ISpreedlyRedact';
import { SpreedlyRedactModel } from '../model';

export class SpreedlyRedact extends SpreedlyApiConfig {
    constructor(config: ISpreedlyConfiguration) {
        super(config);
    }

    async redact(paymentMethodToken: string): Promise<SpreedlyRedactModel> {
        const response: AxiosResponse<ISpreedlyRedactRes> = await this.client.put<ISpreedlyRedactRes>(`/payment_methods/${paymentMethodToken}/redact`);

        return plainToClass(SpreedlyRedactModel, response.data);
    }
}
