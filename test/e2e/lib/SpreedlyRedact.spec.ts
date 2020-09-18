import MockAdapter from 'axios-mock-adapter';
import { SpreedlyRedact } from '../../../src/lib/SpreedlyRedact';
import { accessDeniedErrors, accountInactiveErrors, ISpreedlyError, serviceUnavailableErrors } from '../../errors';

describe('SpreedlyRedact (e2e)', (): void => {
    const baseUrl: string = 'https://core.spreedly.com/v1';
    let spreedlyRedact: SpreedlyRedact;
    let mock: MockAdapter;

    beforeEach(() => {
        spreedlyRedact = new SpreedlyRedact({ username: 'username', password: 'password', baseUrl, maxRetries: 3 });

        mock = new MockAdapter(spreedlyRedact.client);
    });

    describe('#redact', () => {
        it('Should not retry with status 401', async () => {
            //@ts-expect-error
            spreedlyRedact = new SpreedlyRedact();

            mock = new MockAdapter(spreedlyRedact.client);

            mock.onPut('/payment_methods/payment_method_token/redact').reply(401, { errors: accessDeniedErrors });

            await spreedlyRedact.redact('payment_method_token').catch((e) => {
                expect(e.response.status).toBe(401);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accessDeniedErrors);
            });
        }, 20000);

        it('should not retry with status 402', async () => {
            mock.onPut('/payment_methods/payment_method_token/redact').reply(402, { errors: accountInactiveErrors });

            await spreedlyRedact.redact('payment_method_token').catch((e) => {
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

            mock.onPut('/payment_methods/invalid_payment_method_token/redact').reply(404, { errors });

            await spreedlyRedact.redact('invalid_payment_method_token').catch((e) => {
                expect(e.response.status).toBe(404);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(errors);
            });
        });

        it('should not retry with status 408', async () => {
            mock.onPut('/payment_methods/payment_method_token/redact').reply(408);

            await spreedlyRedact.redact('payment_method_token').catch((e) => {
                expect(e.response.status).toBe(408);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 429', async () => {
            mock.onPut('/payment_methods/payment_method_token/redact').reply(429);

            await spreedlyRedact.redact('payment_method_token').catch((e) => {
                expect(e.response.status).toBe(429);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should do 3 retries with status 500', async () => {
            mock.onPut('/payment_methods/payment_method_token/redact').reply(500);

            await spreedlyRedact.redact('payment_method_token').catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(3);
            });
        });

        it('should do 6 retries with status 500', async () => {
            const spreedlyRedact = new SpreedlyRedact({
                username: 'username',
                password: 'password',
                maxRetries: undefined,
            });

            mock = new MockAdapter(spreedlyRedact.client);

            mock.onPut('/payment_methods/payment_method_token/redact').reply(500);

            await spreedlyRedact.redact('payment_method_token').catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(6);
            });
        }, 20000);

        it('should do 3 retries with status 503', async () => {
            mock.onPut('/payment_methods/payment_method_token/redact').reply(503, { errors: serviceUnavailableErrors });

            await spreedlyRedact.redact('payment_method_token').catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(3);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        });

        it('should do 6 retries with status 503', async () => {
            const spreedlyRedact = new SpreedlyRedact({
                username: 'username',
                password: 'password',
                baseUrl,
                maxRetries: undefined,
            });

            mock = new MockAdapter(spreedlyRedact.client);

            mock.onPut('/payment_methods/payment_method_token/redact').reply(503, { errors: serviceUnavailableErrors });

            await spreedlyRedact.redact('payment_method_token').catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(6);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        }, 20000);
    });
});
