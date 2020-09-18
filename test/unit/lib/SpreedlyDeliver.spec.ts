import MockAdapter from 'axios-mock-adapter';
import { SpreedlyDeliver } from '../../../src/lib';
import { SpreedlyDeliverModel } from '../../../src/model';
import { fakeSpreedlyDeliverReq, fakeSpreedlyDeliverRes } from '../fixture';

describe('SpreedlyDeliver (unit)', (): void => {
    const baseUrl: string = 'https://core.spreedly.com/v1';
    let deliver: SpreedlyDeliver;
    let mock: MockAdapter;

    beforeEach(() => {
        deliver = new SpreedlyDeliver({ username: 'username', password: 'password', baseUrl, maxRetries: 3 });

        mock = new MockAdapter(deliver.client);
    });

    describe('#create', () => {
        it('should return plain to class data', async () => {
            mock.onPost('/receivers/receiver_token/deliver', fakeSpreedlyDeliverReq).reply(200, fakeSpreedlyDeliverRes);
            const data = await deliver.create('receiver_token', fakeSpreedlyDeliverReq);
            expect(JSON.parse(JSON.stringify(fakeSpreedlyDeliverRes))).toEqual(data);
            expect(data instanceof SpreedlyDeliverModel).toBe(true);
        });
    });
});
