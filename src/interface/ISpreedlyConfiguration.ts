import { SpreedlyPayloadResFormatEnum } from '../enum';

export interface ISpreedlyConfiguration {
    baseUrl?: string;
    maxRetries?: number;
    format?: SpreedlyPayloadResFormatEnum;
    username: string;
    password: string;
}
