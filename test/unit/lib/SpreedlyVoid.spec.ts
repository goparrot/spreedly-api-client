import MockAdapter from 'axios-mock-adapter';
import { SpreedlyVoid } from '../../../src/lib';
import { SpreedlyVoidModel } from '../../../src/model/SpreedlyVoidModel';
import { fakeSpreedlyVoidTransactionRes } from '../fixture';

describe('SpreedlyVoid (unit)', (): void => {
    const baseUrl: string = 'https://core.spreedly.com/v1';
    let spreedlyVoid: SpreedlyVoid;
    let mock: MockAdapter;

    beforeEach(() => {
        spreedlyVoid = new SpreedlyVoid({ username: 'username', password: 'password', baseUrl, maxRetries: 3 });

        mock = new MockAdapter(spreedlyVoid.client);
    });

    describe('#void', () => {
        it('should return plain to class data', async () => {
            mock.onPost('/transactions/transaction_token/void').reply(200, fakeSpreedlyVoidTransactionRes);
            const data = await spreedlyVoid.void('transaction_token');
            expect(JSON.parse(JSON.stringify(fakeSpreedlyVoidTransactionRes))).toEqual(data);
            expect(data instanceof SpreedlyVoidModel).toBe(true);
        });
    });
});
