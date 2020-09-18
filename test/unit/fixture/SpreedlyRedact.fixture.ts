import { ISpreedlyRedactRes } from '../../../src/interface/ISpreedlyRedact';
import { fakeSpreedlyPayment } from '.';

export const fakeSpreedlyRedact: ISpreedlyRedactRes = {
    transaction: {
        on_test_gateway: false,
        succeeded: true,
        token: 'V7WI8pradTFHtrdShy7HKfFpxEj',
        state: 'succeeded',
        gateway_specific_fields: {},
        gateway_specific_response_fields: {},
        transaction_type: 'RedactPaymentMethod',
        order_id: null,
        ip: null,
        gateway_transaction_id: null,
        gateway_latency_ms: null,
        message_key: 'messages.transaction_succeeded',
        message: 'Succeeded!',
        payment_method: fakeSpreedlyPayment,
    },
};

export const fakeSpreedlyRedactTransaction = {
    on_test_gateway: false,
    succeeded: true,
    token: 'V7WI8pradTFHtrdShy7HKfFpxEj',
    state: 'succeeded',
    gateway_specific_fields: {},
    gateway_specific_response_fields: {},
    transaction_type: 'RedactPaymentMethod',
    order_id: null,
    ip: null,
    gateway_transaction_id: null,
    gateway_latency_ms: null,
    message_key: 'messages.transaction_succeeded',
    message: 'Succeeded!',
    payment_method: { ...fakeSpreedlyPayment, storage_state: 'redacted' },
};
