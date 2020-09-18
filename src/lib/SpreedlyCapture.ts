import { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { SpreedlyApiConfig } from '../config';
import { ISpreedlyConfiguration, ISpreedlyTransactionRes } from '../interface';
import { SpreedlyTransactionResModel } from '../model';

export class SpreedlyCapture extends SpreedlyApiConfig {
    constructor(config: ISpreedlyConfiguration) {
        super(config);
    }

    async create(transactionToken: string): Promise<SpreedlyTransactionResModel> {
        const response: AxiosResponse<ISpreedlyTransactionRes> = await this.client.post<ISpreedlyTransactionRes>(`/transactions/${transactionToken}/capture`);

        return plainToClass(SpreedlyTransactionResModel, response.data);
    }
}
