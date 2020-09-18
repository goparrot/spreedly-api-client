import { AxiosInstance } from 'axios';
import { ISpreedlyConfiguration } from '../interface';
import { createAxiosInstance } from '../utils';

export class SpreedlyApiConfig {
    readonly client: AxiosInstance;
    private readonly config: ISpreedlyConfiguration;

    constructor(config: ISpreedlyConfiguration) {
        this.config = {
            baseUrl: 'https://core.spreedly.com/v1',
            ...config,
        };

        this.client = createAxiosInstance({
            axiosConfig: {
                baseURL: this.config.baseUrl,
                auth: {
                    username: this.config.username,
                    password: this.config.password,
                },
            },
            format: this.config.format,
            maxRetries: this.config.maxRetries,
        });
    }
}
