import MockAdapter from 'axios-mock-adapter';
import { ISpreedlyTransactionRes } from '../../../src/interface';
import { SpreedlyAuthorize } from '../../../src/lib';
import { SpreedlyTransactionResModel } from '../../../src/model';
import { fakeSpreedlyAuthTokenizedPaymentMethodReq, fakeSpreedlyTransaction } from '../fixture';

describe('SpreedlyAuthorize (unit)', (): void => {
    const baseUrl: string = 'https://core.spreedly.com/v1';
    let authorize: SpreedlyAuthorize;
    let mock: MockAdapter;

    beforeEach(() => {
        authorize = new SpreedlyAuthorize({ username: 'username', password: 'password', baseUrl, maxRetries: 3 });

        mock = new MockAdapter(authorize.client);
    });

    describe('#create', () => {
        it('should return plain to class data', async () => {
            const fakeSpreedlyAuthorizeTransaction: ISpreedlyTransactionRes = {
                transaction: {
                    ...fakeSpreedlyTransaction,
                    transaction_type: 'Authorization',
                    response: { ...fakeSpreedlyTransaction.response, message: 'Successful authorize' },
                },
            };
            mock.onPost('/gateways/gateway_token/authorize', fakeSpreedlyAuthTokenizedPaymentMethodReq).reply(200, fakeSpreedlyAuthorizeTransaction);
            const data = await authorize.create('gateway_token', fakeSpreedlyAuthTokenizedPaymentMethodReq);
            expect(JSON.parse(JSON.stringify(fakeSpreedlyAuthorizeTransaction))).toEqual(data);
            expect(data instanceof SpreedlyTransactionResModel).toBe(true);
        });
    });
});
