import MockAdapter from 'axios-mock-adapter';
import { SpreedlyRetain } from '../../../src/lib';
import { accessDeniedErrors, accountInactiveErrors, ISpreedlyError, serviceUnavailableErrors } from '../../errors';

describe('SpreedlyRetain (e2e)', (): void => {
    const baseUrl: string = 'https://core.spreedly.com/v1';
    let spreedlyRetain: SpreedlyRetain;
    let mock: MockAdapter;

    beforeEach(() => {
        spreedlyRetain = new SpreedlyRetain({ username: 'username', password: 'password', baseUrl, maxRetries: 3 });

        mock = new MockAdapter(spreedlyRetain.client);
    });

    describe('#retain', () => {
        it('Should not retry with status 401', async () => {
            //@ts-expect-error
            spreedlyRetain = new SpreedlyRetain();

            mock = new MockAdapter(spreedlyRetain.client);

            mock.onPut('/payment_methods/payment_method_token/retain').reply(401, { errors: accessDeniedErrors });

            await spreedlyRetain.retain('payment_method_token').catch((e) => {
                expect(e.response.status).toBe(401);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accessDeniedErrors);
            });
        }, 20000);

        it('should not retry with status 402', async () => {
            mock.onPut('/payment_methods/payment_method_token/retain').reply(402, { errors: accountInactiveErrors });

            await spreedlyRetain.retain('payment_method_token').catch((e) => {
                expect(e.response.status).toBe(402);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accountInactiveErrors);
            });
        });

        it('should not retry with status 404', async () => {
            const errors: ISpreedlyError[] = [
                {
                    key: 'errors.payment_method_not_found',
                    message: 'Unable to find the specified payment method.',
                },
            ];

            mock.onPut('/payment_methods/invalid_payment_method_token/retain').reply(404, { errors });

            await spreedlyRetain.retain('invalid_payment_method_token').catch((e) => {
                expect(e.response.status).toBe(404);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(errors);
            });
        });

        it('should not retry with status 408', async () => {
            mock.onPut('/payment_methods/payment_method_token/retain').reply(408);

            await spreedlyRetain.retain('payment_method_token').catch((e) => {
                expect(e.response.status).toBe(408);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 429', async () => {
            mock.onPut('/payment_methods/payment_method_token/retain').reply(429);

            await spreedlyRetain.retain('payment_method_token').catch((e) => {
                expect(e.response.status).toBe(429);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should do 3 retries with status 500', async () => {
            mock.onPut('/payment_methods/payment_method_token/retain').reply(500);

            await spreedlyRetain.retain('payment_method_token').catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(3);
            });
        });

        it('should do 6 retries with status 500', async () => {
            const spreedlyRetain = new SpreedlyRetain({
                username: 'username',
                password: 'password',
                maxRetries: undefined,
            });

            mock = new MockAdapter(spreedlyRetain.client);

            mock.onPut('/payment_methods/payment_method_token/retain').reply(500);

            await spreedlyRetain.retain('payment_method_token').catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(6);
            });
        }, 20000);

        it('should do 3 retries with status 503', async () => {
            mock.onPut('/payment_methods/payment_method_token/retain').reply(503, { errors: serviceUnavailableErrors });

            await spreedlyRetain.retain('payment_method_token').catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(3);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        });

        it('should do 6 retries with status 503', async () => {
            const spreedlyVoid = new SpreedlyRetain({
                username: 'username',
                password: 'password',
                baseUrl,
                maxRetries: undefined,
            });

            mock = new MockAdapter(spreedlyVoid.client);

            mock.onPut('/payment_methods/payment_method_token/retain').reply(503, { errors: serviceUnavailableErrors });

            await spreedlyVoid.retain('payment_method_token').catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(6);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        }, 20000);
    });
});
