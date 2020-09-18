import { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { SpreedlyApiConfig } from '../config';
import { ISpreedlyConfiguration, ISpreedlyVoidInterface } from '../interface';
import { SpreedlyVoidModel } from '../model/SpreedlyVoidModel';

export class SpreedlyVoid extends SpreedlyApiConfig {
    constructor(config: ISpreedlyConfiguration) {
        super(config);
    }

    async void(transactionToken: string): Promise<SpreedlyVoidModel> {
        const response: AxiosResponse<ISpreedlyVoidInterface> = await this.client.post<ISpreedlyVoidInterface>(`/transactions/${transactionToken}/void`);

        return plainToClass(SpreedlyVoidModel, response.data);
    }
}
