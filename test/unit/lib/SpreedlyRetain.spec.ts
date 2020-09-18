import MockAdapter from 'axios-mock-adapter';
import { SpreedlyRetain } from '../../../src/lib';
import { SpreedlyRetainModel } from '../../../src/model';
import { fakeSpreedlyRetain } from '../fixture';

describe('SpreedlyRetain (unit)', (): void => {
    const baseUrl: string = 'https://core.spreedly.com/v1';
    let spreedlyRetain: SpreedlyRetain;
    let mock: MockAdapter;

    beforeEach(() => {
        spreedlyRetain = new SpreedlyRetain({ username: 'username', password: 'password', baseUrl, maxRetries: 3 });

        mock = new MockAdapter(spreedlyRetain.client);
    });

    describe('#retain', () => {
        it('should return plain to class data', async () => {
            mock.onPut('/payment_methods/payment_method_token/retain').reply(200, fakeSpreedlyRetain);
            const data = await spreedlyRetain.retain('payment_method_token');
            expect(JSON.parse(JSON.stringify(fakeSpreedlyRetain))).toEqual(data);
            expect(data instanceof SpreedlyRetainModel).toBe(true);
        });
    });
});
