import { ISpreedlyRetainRes } from '../../../src';
import { fakeSpreedlyPayment } from '.';

export const fakeSpreedlyRetain: ISpreedlyRetainRes = {
    token: 'Lld3Hau3lMmJI07aDYDfdoY6Bmh',
    succeeded: true,
    transaction_type: 'RetainPaymentMethod',
    state: 'succeeded',
    message_key: 'messages.transaction_succeeded',
    message: 'Succeeded!',
    transaction: {
        payment_method: fakeSpreedlyPayment,
    },
};
