import MockAdapter from 'axios-mock-adapter';
import { SpreedlyReceiver } from '../../../src/lib';
import { SpreedlyReceiverResModel } from '../../../src/model';
import { fakeReceiverReq, fakeSpreedlyReceiverRes } from '../fixture';

describe('SpreedlyReceiver (unit)', (): void => {
    const baseUrl: string = 'https://core.spreedly.com/v1';
    let receiver: SpreedlyReceiver;
    let mock: MockAdapter;

    beforeEach(() => {
        receiver = new SpreedlyReceiver({ username: 'username', password: 'password', baseUrl, maxRetries: 3 });

        mock = new MockAdapter(receiver.client);
    });

    describe('#show', () => {
        it('should return plain to class data', async () => {
            mock.onGet('/receivers/receiver_token').reply(200, fakeSpreedlyReceiverRes);
            const data = await receiver.show('receiver_token');
            expect(JSON.parse(JSON.stringify(fakeSpreedlyReceiverRes))).toEqual(data);
            expect(data instanceof SpreedlyReceiverResModel).toBe(true);
        });
    });

    describe('#create', () => {
        it('should return plain to class data', async () => {
            mock.onPost('/receivers', fakeReceiverReq).reply(200, fakeSpreedlyReceiverRes);
            const data = await receiver.create(fakeReceiverReq);
            expect(JSON.parse(JSON.stringify(fakeSpreedlyReceiverRes))).toEqual(data);
            expect(data instanceof SpreedlyReceiverResModel).toBe(true);
        });
    });
});
