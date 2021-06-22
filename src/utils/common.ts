import { AxiosError, AxiosInstance, AxiosRequestConfig, default as Axios } from 'axios';
import { default as axiosRetry, IAxiosRetryConfig } from 'axios-retry';
import deepmerge from 'deepmerge';
import { SpreedlyPayloadResFormatEnum } from '../enum';

export interface IFacadeConfig {
    axiosConfig?: AxiosRequestConfig;
    axiosRetryConfig?: IAxiosRetryConfig;
    maxRetries?: number;
    format?: SpreedlyPayloadResFormatEnum;
}

/**
 * @throws {AxiosException}
 */
export function createAxiosInstance(config: IFacadeConfig): AxiosInstance {
    Axios.defaults.timeout = 15000;
    const axios: AxiosInstance = Axios.create(config.axiosConfig);

    axiosRetry(
        axios,
        deepmerge<IAxiosRetryConfig>(
            {
                retries: config.maxRetries || 6, // ~ 15s
                shouldResetTimeout: true,
                retryDelay: axiosRetry.exponentialDelay,
                /**
                 * We are using custom logic, because, default function doesn't retry POST methods
                 * @param {AxiosError} error
                 * @return {boolean}
                 */
                retryCondition: (error: AxiosError): boolean => {
                    const canRetryPostRequest: () => boolean = (): boolean => {
                        return (
                            error.config &&
                            'post' === error.config.method && // Only post method
                            Boolean(error.code) && // Prevents retrying cancelled requests
                            error.code !== 'ECONNABORTED' && // Prevents retrying timed out requests
                            (!error.response || (error.response.status >= 500 && error.response.status <= 599))
                        ); // Prevents retrying unsafe errors
                    };

                    return (
                        // @ts-ignore
                        axiosRetry.isNetworkError(error) ||
                        // @ts-ignore
                        axiosRetry.isIdempotentRequestError(error) ||
                        canRetryPostRequest()
                    );
                },
            },
            config.axiosRetryConfig || {},
        ),
    );

    axios.interceptors.request.use(async (axiosConfig: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        axiosConfig.params = {
            format: config.format ?? SpreedlyPayloadResFormatEnum.JSON,
        };

        return axiosConfig;
    });

    return axios;
}
