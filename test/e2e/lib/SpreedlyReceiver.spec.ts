import MockAdapter from 'axios-mock-adapter';
import { SpreedlyReceiver } from '../../../src';
import { accessDeniedErrors, accountInactiveErrors, ISpreedlyError, serviceUnavailableErrors } from '../../errors';
import { fakeReceiverReq, fakeInvalidReceiverReq } from '../../unit/fixture';

describe('SpreedlyReceiver (e2e)', (): void => {
    const baseUrl: string = 'https://core.spreedly.com/v1';
    let receiver: SpreedlyReceiver;
    let mock: MockAdapter;

    beforeEach(() => {
        receiver = new SpreedlyReceiver({ username: 'username', password: 'password', baseUrl, maxRetries: 3 });

        mock = new MockAdapter(receiver.client);
    });

    describe('#show', () => {
        it('Should not retry with status 401', async () => {
            //@ts-expect-error
            receiver = new SpreedlyReceiver();

            mock = new MockAdapter(receiver.client);

            mock.onGet('/receivers/receiverToken').reply(401, { errors: accessDeniedErrors });

            await receiver.show('receiverToken').catch((e) => {
                expect(e.response.status).toBe(401);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accessDeniedErrors);
            });
        }, 20000);

        it('should not retry with status 402', async () => {
            mock.onGet('/receivers/receiverToken').reply(402, { errors: accountInactiveErrors });

            await receiver.show('receiverToken').catch((e) => {
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

            mock.onGet('/receivers/invalid_receiver_token').reply(404, { errors });

            await receiver.show('invalid_receiver_token').catch((e) => {
                expect(e.response.status).toBe(404);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(errors);
            });
        });

        it('should not retry with status 408', async () => {
            mock.onGet('/receivers/receiverToken').reply(408);

            await receiver.show('receiverToken').catch((e) => {
                expect(e.response.status).toBe(408);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 422', async () => {
            mock.onGet('/receivers/receiverToken').reply(422);

            await receiver.show('receiverToken').catch((e) => {
                expect(e.response.status).toBe(422);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 429', async () => {
            mock.onGet('/receivers/receiverToken').reply(429);

            await receiver.show('receiverToken').catch((e) => {
                expect(e.response.status).toBe(429);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should do 3 retries with status 500', async () => {
            mock.onGet('/receivers/receiverToken').reply(500);

            await receiver.show('receiverToken').catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(3);
            });
        });

        it('should do 6 retries with status 500', async () => {
            const receiver = new SpreedlyReceiver({
                username: 'username',
                password: 'password',
                baseUrl,
                maxRetries: undefined,
            });

            mock = new MockAdapter(receiver.client);

            mock.onGet('/receivers/receiverToken').reply(500);

            await receiver.show('receiverToken').catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(6);
            });
        }, 20000);

        it('should do 3 retries with status 503', async () => {
            mock.onGet('/receivers/receiverToken').reply(503, { errors: serviceUnavailableErrors });

            await receiver.show('receiverToken').catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(3);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        });

        it('should do 6 retries with status 503', async () => {
            const receiver = new SpreedlyReceiver({
                username: 'username',
                password: 'password',
                baseUrl,
                maxRetries: undefined,
            });

            mock = new MockAdapter(receiver.client);

            mock.onGet('/receivers/receiverToken').reply(503, { errors: serviceUnavailableErrors });

            await receiver.show('receiverToken').catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(6);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        }, 20000);
    });

    describe('#create', () => {
        it('Should not retry with status 401', async () => {
            //@ts-expect-error
            receiver = new SpreedlyReceiver();
            mock = new MockAdapter(receiver.client);

            mock.onPost('/receivers').reply(401, { errors: accessDeniedErrors });
            await receiver.create(fakeReceiverReq).catch((e) => {
                expect(e.response.status).toBe(401);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accessDeniedErrors);
            });
        }, 20000);

        it('should not retry with status 402', async () => {
            mock.onPost('/receivers').reply(402, { errors: accountInactiveErrors });

            await receiver.create(fakeReceiverReq).catch((e) => {
                expect(e.response.status).toBe(402);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(accountInactiveErrors);
            });
        });

        it('should not retry with status 408', async () => {
            mock.onPost('/receivers').reply(408);

            await receiver.create(fakeReceiverReq).catch((e) => {
                expect(e.response.status).toBe(408);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 422', async () => {
            const errors: ISpreedlyError[] = [
                {
                    key: 'errors.unknown_receiver_type',
                    message: 'The specified receiver_type is not supported',
                },
            ];

            mock.onPost('/receivers', fakeInvalidReceiverReq).reply(422, { errors });

            await receiver.create(fakeInvalidReceiverReq).catch((e) => {
                expect(e.response.status).toBe(422);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(errors);
            });
        });

        it('should not retry with status 429', async () => {
            mock.onPost('/receivers', fakeReceiverReq).reply(429);

            await receiver.create(fakeReceiverReq).catch((e) => {
                expect(e.response.status).toBe(429);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 500', async () => {
            mock.onPost('/receivers', fakeReceiverReq).reply(500);

            await receiver.create(fakeReceiverReq).catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 500', async () => {
            const receiver = new SpreedlyReceiver({
                username: 'username',
                password: 'password',
                maxRetries: undefined,
            });

            mock = new MockAdapter(receiver.client);

            mock.onPost('/receivers', fakeReceiverReq).reply(500);

            await receiver.create(fakeReceiverReq).catch((e) => {
                expect(e.response.status).toBe(500);
                expect(e.config['axios-retry'].retryCount).toBe(0);
            });
        });

        it('should not retry with status 503', async () => {
            mock.onPost('/receivers', fakeReceiverReq).reply(503, { errors: serviceUnavailableErrors });

            await receiver.create(fakeReceiverReq).catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        });
        it('should not retry with status 503', async () => {
            const gateway = new SpreedlyReceiver({
                username: 'string',
                password: 'string',
                baseUrl,
                maxRetries: undefined,
            });

            mock = new MockAdapter(gateway.client);

            mock.onPost('/receivers', fakeReceiverReq).reply(503, { errors: serviceUnavailableErrors });

            await gateway.create(fakeReceiverReq).catch((e) => {
                expect(e.response.status).toBe(503);
                expect(e.config['axios-retry'].retryCount).toBe(0);
                expect(e.response.data.errors).toEqual(serviceUnavailableErrors);
            });
        }, 20000);
    });
});
