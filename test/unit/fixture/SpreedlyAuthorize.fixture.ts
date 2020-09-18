import { ISpreedlyAuthTokenizedPaymentMethodReq } from '../../../src/interface';

export const fakeSpreedlyAuthTokenizedPaymentMethodReq: ISpreedlyAuthTokenizedPaymentMethodReq = {
    transaction: {
        payment_method_token: 'payment_method_token',
        amount: 262,
        currency_code: 'USD',
        retain_on_success: true,
    },
};

export const fakeSpreedlyInvalidAuthTokenizedPaymentMethodReq: ISpreedlyAuthTokenizedPaymentMethodReq = {
    transaction: {
        payment_method_token: 'payment_method_token',
        amount: -1,
        currency_code: 'USD',
        retain_on_success: true,
    },
};
