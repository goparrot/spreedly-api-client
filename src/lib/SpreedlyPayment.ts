import { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { SpreedlyApiConfig } from '../config';
import { ISpreedlyConfiguration, ISpreedlyPaymentListParams, ISpreedlyPaymentMethod, ISpreedlyPaymentMethodUpdateReq } from '../interface';
import { SpreedlyPaymentResModel } from '../model';

export class SpreedlyPayment extends SpreedlyApiConfig {
    constructor(config: ISpreedlyConfiguration) {
        super(config);
    }

    async list(params?: Partial<ISpreedlyPaymentListParams>): Promise<SpreedlyPaymentResModel> {
        const response: AxiosResponse<ISpreedlyPaymentMethod> = await this.client.get<ISpreedlyPaymentMethod>('/payment_methods', {
            params,
        });

        return plainToClass(SpreedlyPaymentResModel, response.data);
    }

    async update(payload: ISpreedlyPaymentMethodUpdateReq, payment_method_token: string): Promise<SpreedlyPaymentResModel> {
        const response: AxiosResponse<ISpreedlyPaymentMethod> = await this.client.put<ISpreedlyPaymentMethod>(
            `/payment_methods/${payment_method_token}`,
            payload,
        );

        return plainToClass(SpreedlyPaymentResModel, response.data);
    }
}
