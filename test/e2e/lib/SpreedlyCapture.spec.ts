import MockAdapter from 'axios-mock-adapter';
import { SpreedlyCapture } from '../../../src/lib';
import { accessDeniedErrors, accountInactiveErrors, ISpreedlyError, serviceUnavailableErrors } from '../../errors';

describe('SpreedlyCapture (e2e)', (): void => {
    const baseUrl: string = 'https://core.spreedly.com/v1';
    let capture: SpreedlyCapture;
    let mock: MockAdapter;

    beforeEach(() => {
        capture = new SpreedlyCapture({ username: 'username', password: 'password', baseUrl, maxRetries: 3 });

        mock = new MockAdapter(capture.client);
    });

    describe('#create', () => {
        it('Should not retry with status 401', async () => {
            //@ts-expect-error
            capture = new SpreedlyCapture();

            mock = new MockAdapter(capture.client);

            mock.onPost('transactions/transaction_token/capture').reply(401, { errors: accessDeniedErrors });

            await capture.create('transaction_token').catch((e) => {
                expect(e.response.status).toBe(401);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accessDeniedErrors);
            });
        }, 20000);

        it('should not retry with status 402', async () => {
            mock.onPost('transactions/transaction_token/capture').reply(402, { errors: accountInactiveErrors });

            await capture.create('transaction_token').catch((e) => {
                expect(e.response.status).toBe(402);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accountInactiveErrors);
            });
        });

        it('should not retry with status 404', async () => {
            const errors: ISpreedlyError[] = [
                {
                    key: 'errors.reference_transaction_not_found',
                    message: 'Unable to find the specified reference transaction.',
                },
            ];

            mock.onPost('transactions/invalid_transaction_token/capture').reply(404, { errors });

            await capture.create('invalid_transaction_token').catch((e) => {
                expect(e.response.status).toBe(404);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(errors);
            });
        });

        it('should not retry with status 408', async () => {
            mock.onPost('transactions/transaction_token/capture').reply(408);

            await capture.create('transaction_token').catch((e) => {
                expect(e.response.status).toBe(408);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 429', async () => {
            mock.onPost('transactions/transaction_token/capture').reply(429);

            await capture.create('transaction_token').catch((e) => {
                expect(e.response.status).toBe(429);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 500', async () => {
            mock.onPost('transactions/transaction_token/capture').reply(500);

            await capture.create('transaction_token').catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 500', async () => {
            const capture = new SpreedlyCapture({
                username: 'username',
                password: 'password',
                maxRetries: undefined,
            });

            mock = new MockAdapter(capture.client);

            mock.onPost('transactions/transaction_token/capture').reply(500);

            await capture.create('transaction_token').catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 503', async () => {
            mock.onPost('transactions/transaction_token/capture').reply(503, { errors: serviceUnavailableErrors });

            await capture.create('transaction_token').catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        });

        it('should not retry with status 503', async () => {
            const authorize = new SpreedlyCapture({
                username: 'username',
                password: 'password',
                baseUrl,
                maxRetries: undefined,
            });

            mock = new MockAdapter(authorize.client);

            mock.onPost('transactions/transaction_token/capture').reply(503, { errors: serviceUnavailableErrors });

            await authorize.create('transaction_token').catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        }, 20000);
    });
});
