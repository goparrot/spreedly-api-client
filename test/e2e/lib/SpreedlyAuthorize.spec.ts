import MockAdapter from 'axios-mock-adapter';
import { SpreedlyAuthorize } from '../../../src/lib';
import { accessDeniedErrors, accountInactiveErrors, ISpreedlyError, serviceUnavailableErrors } from '../../errors';
import { fakeSpreedlyAuthTokenizedPaymentMethodReq, fakeSpreedlyInvalidAuthTokenizedPaymentMethodReq } from '../../unit/fixture';

describe('SpreedlyAuthorize (e2e)', (): void => {
    const baseUrl: string = 'https://core.spreedly.com/v1';
    let authorize: SpreedlyAuthorize;
    let mock: MockAdapter;

    beforeEach(() => {
        authorize = new SpreedlyAuthorize({ username: 'username', password: 'password', baseUrl, maxRetries: 3 });

        mock = new MockAdapter(authorize.client);
    });
    describe('#create', () => {
        it('Should not retry with status 401', async () => {
            //@ts-expect-error
            authorize = new SpreedlyAuthorize();

            mock = new MockAdapter(authorize.client);

            mock.onPost('gateways/gatewayToken/authorize').reply(401, { errors: accessDeniedErrors });

            await authorize.create('gatewayToken', fakeSpreedlyAuthTokenizedPaymentMethodReq).catch((e) => {
                expect(e.response.status).toBe(401);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accessDeniedErrors);
            });
        }, 20000);

        it('should not retry with status 402', async () => {
            mock.onPost('gateways/gatewayToken/authorize').reply(402, { errors: accountInactiveErrors });

            await authorize.create('gatewayToken', fakeSpreedlyAuthTokenizedPaymentMethodReq).catch((e) => {
                expect(e.response.status).toBe(402);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accountInactiveErrors);
            });
        });

        it('should not retry with status 404', async () => {
            const errors: ISpreedlyError[] = [
                {
                    key: 'errors.gateway_not_found',
                    message: 'Unable to find the specified gateway.',
                },
            ];

            mock.onPost('/gateways/invalid_gateway_token/authorize').reply(404, { errors });

            await authorize.create('invalid_gateway_token', fakeSpreedlyAuthTokenizedPaymentMethodReq).catch((e) => {
                expect(e.response.status).toBe(404);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(errors);
            });
        });

        it('should not retry with status 408', async () => {
            mock.onPost('gateways/gatewayToken/authorize').reply(408);

            await authorize.create('gatewayToken', fakeSpreedlyAuthTokenizedPaymentMethodReq).catch((e) => {
                expect(e.response.status).toBe(408);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 422', async () => {
            const errors: ISpreedlyError[] = [
                {
                    attribute: 'amount',
                    key: 'errors.greater_than_or_equal_to',
                    message: 'Amount must be greater than or equal to 0',
                    count: '0',
                },
            ];

            mock.onPost('gateways/gatewayToken/authorize').reply(422, { errors });

            await authorize.create('gatewayToken', fakeSpreedlyInvalidAuthTokenizedPaymentMethodReq).catch((e) => {
                expect(e.response.status).toBe(422);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(errors);
            });
        });

        it('should not retry with status 429', async () => {
            mock.onPost('gateways/gatewayToken/authorize').reply(429);

            await authorize.create('gatewayToken', fakeSpreedlyAuthTokenizedPaymentMethodReq).catch((e) => {
                expect(e.response.status).toBe(429);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 500', async () => {
            mock.onPost('gateways/gatewayToken/authorize').reply(500);

            await authorize.create('gatewayToken', fakeSpreedlyAuthTokenizedPaymentMethodReq).catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 500', async () => {
            const authorize = new SpreedlyAuthorize({
                username: 'username',
                password: 'password',
                maxRetries: undefined,
            });

            mock = new MockAdapter(authorize.client);

            mock.onPost('gateways/gatewayToken/authorize').reply(500);

            await authorize.create('gatewayToken', fakeSpreedlyAuthTokenizedPaymentMethodReq).catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 503', async () => {
            mock.onPost('gateways/gatewayToken/authorize').reply(503, { errors: serviceUnavailableErrors });

            await authorize.create('gatewayToken', fakeSpreedlyAuthTokenizedPaymentMethodReq).catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        });

        it('should not retry with status 503', async () => {
            const authorize = new SpreedlyAuthorize({
                username: 'username',
                password: 'password',
                baseUrl,
                maxRetries: undefined,
            });

            mock = new MockAdapter(authorize.client);

            mock.onPost('gateways/gatewayToken/authorize').reply(503, { errors: serviceUnavailableErrors });

            await authorize.create('gatewayToken', fakeSpreedlyAuthTokenizedPaymentMethodReq).catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        }, 20000);
    });
});
