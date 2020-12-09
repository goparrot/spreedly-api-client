import MockAdapter from 'axios-mock-adapter';
import { SpreedlyGateway } from '../../../src';
import { fakeGatewayReq, fakeInvalidGatewayReq } from '../../unit/fixture';
import { accessDeniedErrors, accountInactiveErrors, ISpreedlyError, serviceUnavailableErrors } from '../../errors';

describe('SpreedlyGateway (e2e)', (): void => {
    const baseUrl: string = 'https://core.spreedly.com/v1';
    let gateway: SpreedlyGateway;
    let mock: MockAdapter;

    beforeEach(() => {
        gateway = new SpreedlyGateway({ username: 'username', password: 'password', baseUrl, maxRetries: 3 });
        mock = new MockAdapter(gateway.client);
    });

    describe('#show', () => {
        it('Should not retry with status 401', async () => {
            //@ts-expect-error
            gateway = new SpreedlyGateway();

            mock = new MockAdapter(gateway.client);

            mock.onGet('/gateways/gatewayToken').reply(401, { errors: accessDeniedErrors });

            await gateway.show('gatewayToken').catch((e) => {
                expect(e.response.status).toBe(401);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accessDeniedErrors);
            });
        }, 20000);

        it('should not retry with status 402', async () => {
            mock.onGet('/gateways/gatewayToken').reply(402, { errors: accountInactiveErrors });

            await gateway.show('gatewayToken').catch((e) => {
                expect(e.response.status).toBe(402);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accountInactiveErrors);
            });
        });

        it('should not retry with status 404', async () => {
            const errors: ISpreedlyError[] = [{ key: 'errors.gateway_not_found', message: 'Unable to find the specified gateway.' }];
            mock.onGet('/gateways/invalid_gateway_token').reply(404, { errors });

            await gateway.show('invalid_gateway_token').catch((e) => {
                expect(e.response.status).toBe(404);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(errors);
            });
        });

        it('should not retry with status 408', async () => {
            mock.onGet('/gateways/gatewayToken').reply(408);

            await gateway.show('gatewayToken').catch((e) => {
                expect(e.response.status).toBe(408);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 422', async () => {
            mock.onGet('/gateways/gatewayToken').reply(422);

            await gateway.show('gatewayToken').catch((e) => {
                expect(e.response.status).toBe(422);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 429', async () => {
            mock.onGet('/gateways/gatewayToken').reply(429);

            await gateway.show('gatewayToken').catch((e) => {
                expect(e.response.status).toBe(429);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should do 3 retries with status 500', async () => {
            mock.onGet('/gateways/gatewayToken').reply(500);

            await gateway.show('gatewayToken').catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(3);
            });
        });

        it('should do 6 retries with status 500', async () => {
            const gateway = new SpreedlyGateway({
                username: 'username',
                password: 'password',
                baseUrl,
                maxRetries: undefined,
            });

            mock = new MockAdapter(gateway.client);

            mock.onGet('/gateways/gatewayToken').reply(500);

            await gateway.show('gatewayToken').catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(6);
            });
        }, 20000);

        it('should do 3 retries with status 503', async () => {
            mock.onGet('/gateways/gatewayToken').reply(503, { errors: serviceUnavailableErrors });

            await gateway.show('gatewayToken').catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(3);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        });

        it('should do 6 retries with status 503', async () => {
            const gateway = new SpreedlyGateway({
                username: 'username',
                password: 'password',
                baseUrl,
                maxRetries: undefined,
            });

            mock = new MockAdapter(gateway.client);

            mock.onGet('/gateways/gatewayToken').reply(503, { errors: serviceUnavailableErrors });

            await gateway.show('gatewayToken').catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(6);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        }, 20000);
    });

    describe('#create', () => {
        it('Should not retry with status 401', async () => {
            //@ts-expect-error
            gateway = new SpreedlyGateway();

            mock = new MockAdapter(gateway.client);

            mock.onPost('/gateways').reply(401, { errors: accessDeniedErrors });

            await gateway.create(fakeGatewayReq).catch((e) => {
                expect(e.response.status).toBe(401);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accessDeniedErrors);
            });
        }, 20000);

        it('should not retry with status 402', async () => {
            mock.onPost('/gateways').reply(402, { errors: accountInactiveErrors });

            await gateway.create(fakeGatewayReq).catch((e) => {
                expect(e.response.status).toBe(402);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accountInactiveErrors);
            });
        });

        it('should not retry with status 408', async () => {
            mock.onPost('/gateways').reply(408);

            await gateway.create(fakeGatewayReq).catch((e) => {
                expect(e.response.status).toBe(408);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 422', async () => {
            const errors: ISpreedlyError[] = [
                {
                    key: 'errors.invalid_gateway_type',
                    message: 'The gateway_type parameter is invalid.',
                },
            ];

            mock.onPost('/gateways', fakeInvalidGatewayReq).reply(422, { errors });

            await gateway.create(fakeInvalidGatewayReq).catch((e) => {
                expect(e.response.status).toBe(422);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(errors);
            });
        });

        it('should not retry with status 429', async () => {
            mock.onPost('/gateways', fakeGatewayReq).reply(429);

            await gateway.create(fakeGatewayReq).catch((e) => {
                expect(e.response.status).toBe(429);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 500', async () => {
            mock.onPost('/gateways', fakeGatewayReq).reply(500);

            await gateway.create(fakeGatewayReq).catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 500', async () => {
            const gateway = new SpreedlyGateway({
                username: 'username',
                password: 'password',
                maxRetries: undefined,
            });

            mock = new MockAdapter(gateway.client);

            mock.onPost('/gateways', fakeGatewayReq).reply(500);

            await gateway.create(fakeGatewayReq).catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 503', async () => {
            mock.onPost('/gateways', fakeGatewayReq).reply(503, { errors: serviceUnavailableErrors });

            await gateway.create(fakeGatewayReq).catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        });

        it('should not retry with status 503', async () => {
            const gateway = new SpreedlyGateway({
                username: 'username',
                password: 'password',
                baseUrl,
                maxRetries: undefined,
            });

            mock = new MockAdapter(gateway.client);

            mock.onPost('/gateways', fakeGatewayReq).reply(503, { errors: serviceUnavailableErrors });

            await gateway.create(fakeGatewayReq).catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        }, 20000);
    });
});
