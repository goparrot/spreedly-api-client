import MockAdapter from 'axios-mock-adapter';
import { SpreedlyPayment } from '../../../src/lib';
import { accessDeniedErrors, accountInactiveErrors, ISpreedlyError, paymentMethodNotFoundErrors, serviceUnavailableErrors } from '../../errors';
import { fakeSpreedlyInvalidPaymentListParams, fakeSpreedlyPaymentMethodUpdateReq } from '../../unit/fixture';

describe('SpreedlyPayment (e2e)', (): void => {
    const baseUrl: string = 'https://core.spreedly.com/v1';
    let payment: SpreedlyPayment;
    let mock: MockAdapter;

    beforeEach(() => {
        payment = new SpreedlyPayment({ username: 'username', password: 'password', baseUrl, maxRetries: 3 });

        mock = new MockAdapter(payment.client);
    });

    describe('#list', () => {
        it('Should not retry with status 401', async () => {
            //@ts-expect-error
            payment = new SpreedlyPayment();

            mock = new MockAdapter(payment.client);

            mock.onGet('/payment_methods').reply(401, { errors: accessDeniedErrors });

            await payment.list().catch((e) => {
                expect(e.response.status).toBe(401);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accessDeniedErrors);
            });
        }, 20000);

        it('should not retry with status 402', async () => {
            mock.onGet('/payment_methods').reply(402, { errors: accountInactiveErrors });

            await payment.list().catch((e) => {
                expect(e.response.status).toBe(402);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accountInactiveErrors);
            });
        });

        it('should not retry with status 408', async () => {
            mock.onGet('/payment_methods').reply(408);

            await payment.list().catch((e) => {
                expect(e.response.status).toBe(408);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 422', async () => {
            mock.onGet('/payment_methods').reply(422);

            await payment.list().catch((e) => {
                expect(e.response.status).toBe(422);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 429', async () => {
            mock.onGet('payment_methods').reply(429);

            await payment.list().catch((e) => {
                expect(e.response.status).toBe(429);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should do 3 retries with status 500', async () => {
            mock.onGet('payment_methods').reply(500);

            await payment.list().catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(3);
            });
        });

        it('should do 6 retries with status 500', async () => {
            const payment = new SpreedlyPayment({
                username: 'username',
                password: 'password',
                baseUrl,
                maxRetries: undefined,
            });

            mock = new MockAdapter(payment.client);

            mock.onGet('payment_methods').reply(500);

            await payment.list().catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(6);
            });
        }, 20000);

        it('should do 3 retries with status 503', async () => {
            mock.onGet('payment_methods').reply(503, { errors: serviceUnavailableErrors });

            await payment.list().catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(3);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        });

        it('should do 6 retries with status 503', async () => {
            const payment = new SpreedlyPayment({
                username: 'username',
                password: 'password',
                baseUrl,
                maxRetries: undefined,
            });

            mock = new MockAdapter(payment.client);

            mock.onGet('payment_methods').reply(503, { errors: serviceUnavailableErrors });

            await payment.list().catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(6);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        }, 20000);
    });

    describe('#update', () => {
        it('Should not retry with status 401', async () => {
            //@ts-expect-error
            payment = new SpreedlyPayment();

            mock = new MockAdapter(payment.client);

            mock.onPut('payment_methods/paymentMethodToken').reply(401, { errors: accessDeniedErrors });

            await payment.update(fakeSpreedlyPaymentMethodUpdateReq, 'paymentMethodToken').catch((e) => {
                expect(e.response.status).toBe(401);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accessDeniedErrors);
            });
        }, 20000);

        it('should not retry with status 402', async () => {
            mock.onPut('payment_methods/paymentMethodToken').reply(402, { errors: accountInactiveErrors });

            await payment.update(fakeSpreedlyPaymentMethodUpdateReq, 'paymentMethodToken').catch((e) => {
                expect(e.response.status).toBe(402);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accountInactiveErrors);
            });
        });

        it('should not retry with status 404', async () => {
            mock.onPut('payment_methods/invalid_payment_method_token').reply(404, { errors: paymentMethodNotFoundErrors });

            await payment.update(fakeSpreedlyPaymentMethodUpdateReq, 'invalid_payment_method_token').catch((e) => {
                expect(e.response.status).toBe(404);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(paymentMethodNotFoundErrors);
            });
        });

        it('should not retry with status 408', async () => {
            mock.onPut('payment_methods/paymentMethodToken').reply(408);

            await payment.update(fakeSpreedlyPaymentMethodUpdateReq, 'paymentMethodToken').catch((e) => {
                expect(e.response.status).toBe(408);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 422', async () => {
            const errors: ISpreedlyError[] = [
                {
                    message:
                        "Metadata Metadata '%{key}' has invalid values. Metadata values can not exceed 500 characters in length, include sensitive data or contain compounding data types such as arrays and hashes.",
                    attribute: 'metadata',
                    key: 'errors.metadata.invalid_value',
                },
            ];

            mock.onPut('payment_methods/paymentMethodToken').reply(422, { errors });

            await payment.update(fakeSpreedlyInvalidPaymentListParams, 'paymentMethodToken').catch((e) => {
                expect(e.response.status).toBe(422);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(errors);
            });
        });

        it('should not retry with status 429', async () => {
            mock.onPut('payment_methods/paymentMethodToken').reply(429);

            await payment.update(fakeSpreedlyPaymentMethodUpdateReq, 'paymentMethodToken').catch((e) => {
                expect(e.response.status).toBe(429);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should do 3 retries with status 500', async () => {
            mock.onPut('payment_methods/paymentMethodToken').reply(500);

            await payment.update(fakeSpreedlyPaymentMethodUpdateReq, 'paymentMethodToken').catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(3);
            });
        });

        it('should do 6 retries with status 500', async () => {
            const payment = new SpreedlyPayment({
                username: 'username',
                password: 'password',
                baseUrl,
                maxRetries: undefined,
            });

            mock = new MockAdapter(payment.client);

            mock.onPut('payment_methods/paymentMethodToken').reply(500);

            await payment.update(fakeSpreedlyPaymentMethodUpdateReq, 'paymentMethodToken').catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(6);
            });
        }, 20000);

        it('should do 3 retries with status 503', async () => {
            mock.onPut('payment_methods/paymentMethodToken').reply(503, { errors: serviceUnavailableErrors });

            await payment.update(fakeSpreedlyPaymentMethodUpdateReq, 'paymentMethodToken').catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(3);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        });

        it('should do 6 retries with status 503', async () => {
            const payment = new SpreedlyPayment({
                username: 'username',
                password: 'password',
                baseUrl,
                maxRetries: undefined,
            });

            mock = new MockAdapter(payment.client);

            mock.onPut('payment_methods/paymentMethodToken').reply(503, { errors: serviceUnavailableErrors });

            await payment.update(fakeSpreedlyPaymentMethodUpdateReq, 'paymentMethodToken').catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(6);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        }, 20000);
    });
});
