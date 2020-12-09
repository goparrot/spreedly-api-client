import MockAdapter from 'axios-mock-adapter';
import { SpreedlyPayment, SpreedlyPaymentResModel } from '../../../src';
import { fakeSpreedlyPaymentRes, fakeSpreedlyPayment, fakeSpreedlyValidPaymentListParams } from '../fixture';

describe('SpreedlyPayment (unit)', (): void => {
    const baseUrl: string = 'https://core.spreedly.com/v1';
    let payment: SpreedlyPayment;
    let mock: MockAdapter;

    beforeEach(() => {
        payment = new SpreedlyPayment({ username: 'username', password: 'password', baseUrl, maxRetries: 3 });

        mock = new MockAdapter(payment.client);
    });

    describe('#list', () => {
        it('should return plain to class data', async () => {
            mock.onGet('/payment_methods').reply(200, fakeSpreedlyPaymentRes);
            const data = await payment.list();
            expect(JSON.parse(JSON.stringify(fakeSpreedlyPaymentRes))).toEqual(data);
            expect(data instanceof SpreedlyPaymentResModel).toBe(true);
        });
    });

    describe('#update', () => {
        it('should return plain to class data', async () => {
            const fakeSpreedlyPay = { payment_methods: [{ ...fakeSpreedlyPayment, metadata: { ...fakeSpreedlyPayment.metadata, userId: 'valid_user_id' } }] };
            mock.onPut('/payment_methods/paymentMethodToken').reply(200, fakeSpreedlyPay);
            const data = await payment.update(fakeSpreedlyValidPaymentListParams, 'paymentMethodToken');
            expect(JSON.parse(JSON.stringify(fakeSpreedlyPay))).toEqual(data);
            expect(data instanceof SpreedlyPaymentResModel).toBe(true);
        });
    });
});
