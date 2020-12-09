import MockAdapter from 'axios-mock-adapter';
import { SpreedlyDeliver } from '../../../src';
import { accessDeniedErrors, accountInactiveErrors, ISpreedlyError, serviceUnavailableErrors } from '../../errors';
import { fakeInvalidSpreedlyDeliverReq, fakeSpreedlyDeliverError, fakeSpreedlyDeliverReq } from '../../unit/fixture';

describe('SpreedlyDeliver (e2e)', (): void => {
    const baseUrl: string = 'https://core.spreedly.com/v1';
    let deliver: SpreedlyDeliver;
    let mock: MockAdapter;

    beforeEach(() => {
        deliver = new SpreedlyDeliver({ username: 'username', password: 'password', baseUrl, maxRetries: 3 });

        mock = new MockAdapter(deliver.client);
    });

    describe('#create', () => {
        it('Should not retry with status 401', async () => {
            //@ts-expect-error
            deliver = new SpreedlyDeliver();

            mock = new MockAdapter(deliver.client);

            mock.onPost('receivers/receiverToken/deliver').reply(401, { errors: accessDeniedErrors });

            await deliver.create('receiverToken', fakeSpreedlyDeliverReq).catch((e) => {
                expect(e.response.status).toBe(401);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accessDeniedErrors);
            });
        }, 20000);

        it('should not retry with status 402', async () => {
            mock.onPost('receivers/receiverToken/deliver').reply(402, { errors: accountInactiveErrors });

            await deliver.create('receiverToken', fakeSpreedlyDeliverReq).catch((e) => {
                expect(e.response.status).toBe(402);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accountInactiveErrors);
            });
        });

        it('should not retry with status 404', async () => {
            const errors: ISpreedlyError[] = [
                {
                    key: 'errors.receiver_not_found',
                    message: 'Unable to find the specified receiver.',
                },
            ];

            mock.onPost('receivers/invalid_receiver_token/deliver').reply(404, { errors });

            await deliver.create('invalid_receiver_token', fakeSpreedlyDeliverReq).catch((e) => {
                expect(e.response.status).toBe(404);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(errors);
            });
        });

        it('should not retry with status 408', async () => {
            mock.onPost('receivers/receiverToken/deliver').reply(408);

            await deliver.create('receiverToken', fakeSpreedlyDeliverReq).catch((e) => {
                expect(e.response.status).toBe(408);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 422', async () => {
            mock.onPost('receivers/receiverToken/deliver').reply(422, { errors: fakeSpreedlyDeliverError });

            await deliver.create('receiverToken', fakeInvalidSpreedlyDeliverReq).catch((e) => {
                expect(e.response.status).toBe(422);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(fakeSpreedlyDeliverError);
            });
        });

        it('should not retry with status 429', async () => {
            mock.onPost('receivers/receiverToken/deliver').reply(429);

            await deliver.create('receiverToken', fakeSpreedlyDeliverReq).catch((e) => {
                expect(e.response.status).toBe(429);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 500', async () => {
            mock.onPost('receivers/receiverToken/deliver').reply(500);

            await deliver.create('receiverToken', fakeSpreedlyDeliverReq).catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 500', async () => {
            const deliver = new SpreedlyDeliver({
                username: 'username',
                password: 'password',
                maxRetries: undefined,
            });

            mock = new MockAdapter(deliver.client);

            mock.onPost('receivers/receiverToken/deliver').reply(500);

            await deliver.create('receiverToken', fakeSpreedlyDeliverReq).catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 503', async () => {
            mock.onPost('receivers/receiverToken/deliver').reply(503, { errors: serviceUnavailableErrors });

            await deliver.create('receiverToken', fakeSpreedlyDeliverReq).catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        });

        it('should not retry with status 503', async () => {
            const deliver = new SpreedlyDeliver({
                username: 'username',
                password: 'password',
                baseUrl,
                maxRetries: undefined,
            });

            mock = new MockAdapter(deliver.client);

            mock.onPost('receivers/receiverToken/deliver').reply(503, { errors: serviceUnavailableErrors });

            await deliver.create('receiverToken', fakeSpreedlyDeliverReq).catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        }, 20000);
    });
});
