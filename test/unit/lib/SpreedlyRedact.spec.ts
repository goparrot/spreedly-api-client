import MockAdapter from 'axios-mock-adapter';
import { SpreedlyRedactModel } from '../../../src';
import { SpreedlyRedact } from '../../../src/lib/SpreedlyRedact';
import { fakeSpreedlyRedact } from '../fixture';

describe('SpreedlyRedact (unit)', (): void => {
    const baseUrl: string = 'https://core.spreedly.com/v1';
    let spreedlyRedact: SpreedlyRedact;
    let mock: MockAdapter;

    beforeEach(() => {
        spreedlyRedact = new SpreedlyRedact({ username: 'username', password: 'password', baseUrl, maxRetries: 3 });

        mock = new MockAdapter(spreedlyRedact.client);
    });

    describe('#redact', () => {
        it('should return plain to class data', async () => {
            mock.onPut('/payment_methods/payment_method_token/redact').reply(200, fakeSpreedlyRedact);
            const data = await spreedlyRedact.redact('payment_method_token');
            expect(JSON.parse(JSON.stringify(fakeSpreedlyRedact))).toEqual(data);
            expect(data instanceof SpreedlyRedactModel).toBe(true);
        });
    });
});
